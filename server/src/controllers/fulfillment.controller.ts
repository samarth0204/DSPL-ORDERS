import { Request, Response } from "express";
import prisma from "../config/prisma";
import {
  checkAndUpdateOrderStatus,
  checkValidProductQuantity,
} from "../utils/orderUtils";

enum FulfillmentStatus {
  PAID = "PAID",
  PENDING = "PENDING",
}

// GET / - Retrieve all fulfillments, grouped by date and orderId, sorted by amount, date, and status
export const getAllFulfillments = async (req: Request, res: Response) => {
  const { groupBy, sortBy, sortOrder, search } = req.query;
  const orderDirection = sortOrder === "desc" ? "desc" : "asc";
  try {
    // Fetch all fulfillments with related data
    const fulfillments = await prisma.fulfillment.findMany({
      include: {
        order: true,
        fulfilledProducts: {
          include: {
            product: true,
          },
        },
      },
      orderBy: sortBy
        ? { [sortBy as string]: orderDirection }
        : { date: "desc" },
    });

    if (groupBy && groupBy !== "none") {
      const groups: { [key: string]: typeof fulfillments } = {};
      fulfillments.forEach((fulfillment) => {
        let key: string;
        if (groupBy === "order") {
          key = fulfillment.orderId || "Unassigned";
        } else if (groupBy === "date") {
          const dateObj = new Date(fulfillment.date);
          const dd = String(dateObj.getDate()).padStart(2, "0");
          const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
          const yyyy = dateObj.getFullYear();
          key = `${dd}-${mm}-${yyyy}`;
        } else {
          key = "Other"; // Default or handle other cases
        }

        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(fulfillment);
      });

      const sortedGroupKeys = Object.keys(groups).sort((a, b) => {
        if (groupBy === "orderDate") {
          return new Date(a).getTime() - new Date(b).getTime();
        }
        return a.localeCompare(b);
      });

      const groupedResult = sortedGroupKeys.map((key) => ({
        groupKey: key,
        fulfillments: groups[key],
      }));

      return res.status(200).json(groupedResult);
    }

    const singleGroup = {
      groupKey: "All fulfillments",
      fulfillments: fulfillments,
    };
    return res.status(200).json([singleGroup]);
  } catch (error) {
    console.error("Error fetching fulfillments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addFulfillment = async (req: Request, res: Response) => {
  try {
    const {
      billNumber,
      date,
      orderId,
      amount,
      status,
      description,
      fulfilledProducts,
    } = req.body;

    // Validate required fields
    if (
      !billNumber ||
      !date ||
      !orderId ||
      amount == null ||
      !fulfilledProducts ||
      !Array.isArray(fulfilledProducts) ||
      fulfilledProducts.length === 0
    ) {
      return res.status(400).json({
        error:
          "Missing required fields: billNumber, date, orderId, amount, or fulfilledProducts",
      });
    }

    // Validate status
    if (status && !Object.values(FulfillmentStatus).includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    // Check order exists with products & fulfilledProducts
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        products: {
          include: {
            fulfilledProducts: true,
          },
        },
      },
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Check product quantities
    if (fulfilledProducts) {
      try {
        await checkValidProductQuantity(orderId, fulfilledProducts);
      } catch (err: any) {
        return res.status(400).json({ error: err.message });
      }
    }

    // Create the fulfillment
    const fulfillment = await prisma.fulfillment.create({
      data: {
        billNumber,
        description,
        date: new Date(date),
        orderId,
        amount: Number(amount),
        status: status || FulfillmentStatus.PENDING,
        fulfilledProducts: {
          create: fulfilledProducts.map((fp: any) => ({
            productId: fp.productId,
            quantity: fp.quantity,
          })),
        },
      },
      include: { fulfilledProducts: true },
    });

    await checkAndUpdateOrderStatus(orderId);

    res.status(201).json(fulfillment);
  } catch (error) {
    console.error("Error creating fulfillment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PUT /:id - Update an existing fulfillment
export const editFulfillment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      billNumber,
      date,
      orderId,
      amount,
      status,
      description,
      fulfilledProducts,
    } = req.body;

    // Check if fulfillment exists
    const existingFulfillment = await prisma.fulfillment.findUnique({
      where: { id },
    });
    if (!existingFulfillment) {
      return res.status(404).json({ error: "Fulfillment not found" });
    }

    // Validate orderId
    if (!orderId) {
      return res.status(400).json({ error: "Order ID not provided" });
    }

    // Validate status
    if (status && !Object.values(FulfillmentStatus).includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    // Validate fulfilledProducts
    if (fulfilledProducts && !Array.isArray(fulfilledProducts)) {
      return res
        .status(400)
        .json({ error: "fulfilledProducts must be an array" });
    }
    if (
      fulfilledProducts &&
      fulfilledProducts.some((fp: any) => !fp.productId || fp.quantity == null)
    ) {
      return res.status(400).json({ error: "Invalid fulfilledProducts data" });
    }

    // Validate order exists
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { products: { include: { fulfilledProducts: true } } },
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Check product quantities
    if (fulfilledProducts) {
      try {
        await checkValidProductQuantity(orderId, fulfilledProducts, id);
      } catch (err: any) {
        return res.status(400).json({ error: err.message });
      }
    }

    // Update fulfillment
    const fulfillment = await prisma.fulfillment.update({
      where: { id },
      data: {
        billNumber: billNumber ?? undefined,
        description: description ?? undefined,
        date: date ? new Date(date) : undefined,
        orderId: orderId ?? undefined,
        amount: amount != null ? Number(amount) : undefined,
        status: status ?? undefined, // only update if provided
        fulfilledProducts: fulfilledProducts
          ? {
              deleteMany: {}, // wipe and recreate
              create: fulfilledProducts.map((fp: any) => ({
                productId: fp.productId,
                quantity: fp.quantity,
              })),
            }
          : undefined,
      },
      include: { fulfilledProducts: true },
    });

    // Recalculate order status
    await checkAndUpdateOrderStatus(orderId);

    return res.status(200).json(fulfillment);
  } catch (error) {
    console.error("Error updating fulfillment:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteFulfillment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const fulfillment = await prisma.fulfillment.findUnique({ where: { id } });
    if (!fulfillment) {
      return res.status(404).json({ error: "Fulfillment not found" });
    }

    const orderId = fulfillment.orderId;

    await prisma.fulfillment.delete({ where: { id } });

    await checkAndUpdateOrderStatus(orderId);

    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting fulfillment:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

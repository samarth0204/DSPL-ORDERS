import { Request, Response } from "express";
import prisma from "../config/prisma";

enum FulfillmentStatus {
  PAID = "PAID",
  PENDING = "PENDING",
}

// GET / - Retrieve all fulfillments, grouped by date and orderId, sorted by amount, date, and status
export const getAllFulfillments = async (req: Request, res: Response) => {
  try {
    // Fetch all fulfillments with related data
    const fulfillments = await prisma.fulfillment.findMany({
      include: {
        order: true,
        fulfilledProducts: true,
      },
      orderBy: [
        { amount: "desc" }, // Primary sort: amount (descending)
        { date: "desc" }, // Secondary sort: date (descending)
        { status: "asc" }, // Tertiary sort: status (PAID before PENDING)
      ],
    });

    // Group fulfillments by date and orderId
    const groupedFulfillments = fulfillments.reduce((acc, fulfillment) => {
      const dateStr = fulfillment.date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
      const key = `${dateStr}_${fulfillment.orderId}`;
      if (!acc[key]) {
        acc[key] = {
          date: dateStr,
          orderId: fulfillment.orderId,
          fulfillments: [],
        };
      }
      acc[key].fulfillments.push({
        id: fulfillment.id,
        amount: fulfillment.amount,
        status: fulfillment.status,
        fulfilledProducts: fulfillment.fulfilledProducts.map((fp) => ({
          id: fp.id,
          name: fp.name,
          size: fp.size,
          orderBy: fp.orderBy,
          quantity: fp.quantity,
        })),
      });
      return acc;
    }, {} as Record<string, { date: string; orderId: string; fulfillments: any[] }>);

    // Convert grouped object to array for response
    const result = Object.values(groupedFulfillments);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching fulfillments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST / - Create a new fulfillment
export const addFulfillment = async (req: Request, res: Response) => {
  try {
    const { date, orderId, amount, status, fulfilledProducts } = req.body;

    // Validate required fields
    if (
      !date ||
      !orderId ||
      amount == null ||
      !fulfilledProducts ||
      !Array.isArray(fulfilledProducts)
    ) {
      return res.status(400).json({
        error:
          "Missing required fields: date, orderId, amount, or fulfilledProducts",
      });
    }

    // Validate status if provided
    if (status && !Object.values(FulfillmentStatus).includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    // Validate fulfilledProducts
    if (
      fulfilledProducts.some(
        (fp: any) => !fp.name || !fp.size || !fp.orderBy || fp.quantity == null
      )
    ) {
      return res.status(400).json({ error: "Invalid fulfilledProducts data" });
    }

    // Check if order exists
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Create fulfillment
    const fulfillment = await prisma.fulfillment.create({
      data: {
        date: new Date(date),
        orderId,
        amount,
        status: status || FulfillmentStatus.PENDING,
        fulfilledProducts: {
          create: fulfilledProducts.map((fp: any) => ({
            name: fp.name,
            size: fp.size,
            orderBy: fp.orderBy,
            quantity: fp.quantity,
          })),
        },
      },
      include: { fulfilledProducts: true },
    });

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
    const { date, orderId, amount, status, fulfilledProducts } = req.body;

    // Check if fulfillment exists
    const existingFulfillment = await prisma.fulfillment.findUnique({
      where: { id },
    });
    if (!existingFulfillment) {
      return res.status(404).json({ error: "Fulfillment not found" });
    }

    // Validate inputs
    if (orderId) {
      const order = await prisma.order.findUnique({ where: { id: orderId } });
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
    }
    if (status && !Object.values(FulfillmentStatus).includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }
    if (fulfilledProducts && !Array.isArray(fulfilledProducts)) {
      return res
        .status(400)
        .json({ error: "fulfilledProducts must be an array" });
    }
    if (
      fulfilledProducts &&
      fulfilledProducts.some(
        (fp: any) => !fp.name || !fp.size || !fp.orderBy || fp.quantity == null
      )
    ) {
      return res.status(400).json({ error: "Invalid fulfilledProducts data" });
    }

    // Update fulfillment
    const fulfillment = await prisma.fulfillment.update({
      where: { id },
      data: {
        date: date ? new Date(date) : undefined,
        orderId: orderId || undefined,
        amount: amount != null ? amount : undefined,
        status: status || undefined,
        fulfilledProducts: fulfilledProducts
          ? {
              deleteMany: {}, // Delete existing fulfilled products
              create: fulfilledProducts.map((fp: any) => ({
                name: fp.name,
                size: fp.size,
                orderBy: fp.orderBy,
                quantity: fp.quantity,
              })),
            }
          : undefined,
      },
      include: { fulfilledProducts: true },
    });

    res.status(200).json(fulfillment);
  } catch (error) {
    console.error("Error updating fulfillment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE /:id - Delete a fulfillment
export const deleteFulfillment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if fulfillment exists
    const fulfillment = await prisma.fulfillment.findUnique({ where: { id } });
    if (!fulfillment) {
      return res.status(404).json({ error: "Fulfillment not found" });
    }

    // Delete fulfillment (cascades to fulfilledProducts due to Prisma schema)
    await prisma.fulfillment.delete({ where: { id } });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting fulfillment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

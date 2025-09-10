import { Request, Response } from "express";
import prisma from "../config/prisma";

//only admin can access this route
export const getAllOrders = async (req: Request, res: Response) => {
  const { groupBy, sortBy, sortOrder, search } = req.query;
  const orderDirection = sortOrder === "desc" ? "desc" : "asc";

  try {
    const orders = await prisma.order.findMany({
      where: {
        OR: search
          ? [
              {
                clientName: { contains: search as string, mode: "insensitive" },
              },
              {
                salesman: {
                  username: { contains: search as string, mode: "insensitive" },
                },
              },
            ]
          : undefined,
      },
      include: {
        salesman: {
          select: {
            id: true,
            username: true,
          },
        },
        products: true,
        fulfillments: {
          include: {
            fulfilledProducts: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      orderBy: sortBy
        ? { [sortBy as string]: orderDirection }
        : { orderDate: "desc" },
    });

    if (groupBy && groupBy !== "none") {
      const groups: { [key: string]: typeof orders } = {};
      orders.forEach((order) => {
        let key: string;
        if (groupBy === "salesman") {
          key = order.salesman?.username || "Unassigned";
        } else if (groupBy === "orderDate") {
          const dateObj = new Date(order.orderDate);
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
        groups[key].push(order);
      });

      const sortedGroupKeys = Object.keys(groups).sort((a, b) => {
        if (groupBy === "orderDate") {
          return new Date(a).getTime() - new Date(b).getTime();
        }
        return a.localeCompare(b);
      });

      const groupedResult = sortedGroupKeys.map((key) => ({
        groupKey: key,
        orders: groups[key],
      }));

      return res.status(200).json(groupedResult);
    }

    // Return a single group containing all orders if groupBy is 'none' or not specified
    const singleGroup = { groupKey: "All Orders", orders: orders };
    return res.status(200).json([singleGroup]);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// route for salesman and admin
export const getAllOrdersBySalesman = async (req: Request, res: Response) => {
  const { salesmanId } = req.query;
  try {
    const orders = await prisma.order.findMany({
      where: {
        salesmanId: salesmanId as string,
      },
      include: {
        products: true,
        fulfillments: {
          include: {
            fulfilledProducts: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      orderBy: { orderDate: "desc" },
    });
    return res.status(200).json(orders);
  } catch (error) {
    console.log("Error while fetching orders", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Create Order
export const addOrder = async (req: Request, res: Response) => {
  const {
    clientName,
    salesmanId,
    deliveryDetails,
    status,
    orderDate,
    description,
    products,
  } = req.body;

  // Validation
  if (
    !clientName ||
    !salesmanId ||
    !status ||
    !orderDate ||
    !products ||
    products.length === 0
  ) {
    return res.status(400).json({ message: "Missing required order data." });
  }

  try {
    const newOrder = await prisma.order.create({
      data: {
        clientName,
        salesmanId,
        deliveryDetails,
        status,
        description,
        orderDate: new Date(orderDate),
        products: {
          createMany: {
            data: products.map((product: any) => ({
              name: product.name,
              size: product.size,
              quantity: product.quantity,
              orderBy: product.orderBy,
              rate: product.rate ?? null,
            })),
          },
        },
      },
      include: {
        products: true,
      },
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Order ID is required." });
  }

  try {
    // Delete related fulfillments and products first due to FK constraints
    await prisma.fulfilledProduct.deleteMany({
      where: {
        fulfillment: {
          orderId: id,
        },
      },
    });

    await prisma.fulfillment.deleteMany({
      where: {
        orderId: id,
      },
    });

    await prisma.product.deleteMany({
      where: {
        orderId: id,
      },
    });

    const deletedOrder = await prisma.order.delete({
      where: { id },
    });

    res
      .status(200)
      .json({ message: "Order deleted successfully", deletedOrder });
  } catch (error) {
    console.error("Error while deleting order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const editOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    clientName,
    salesmanId,
    deliveryDetails,
    status,
    orderDate,
    products,
    description,
  } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Order ID is required." });
  }

  try {
    // Update main order fields
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        clientName,
        salesmanId,
        deliveryDetails,
        status,
        description,
        orderDate: new Date(orderDate),
      },
    });

    // Remove existing products
    await prisma.product.deleteMany({
      where: { orderId: id },
    });

    // Add new/updated products
    if (products && products.length > 0) {
      await prisma.product.createMany({
        data: products.map((product: any) => ({
          name: product.name,
          size: product.size,
          quantity: product.quantity,
          orderBy: product.orderBy,
          orderId: id,
          rate: product.rate ?? null,
        })),
      });
    }

    // Return the updated order including the new products
    const finalOrder = await prisma.order.findUnique({
      where: { id },
      include: {
        products: true,
        salesman: true,
        fulfillments: {
          include: { fulfilledProducts: true },
        },
      },
    });

    res.status(200).json(finalOrder);
  } catch (error) {
    console.error("Error while editing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

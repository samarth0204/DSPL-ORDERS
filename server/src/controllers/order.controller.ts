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
        salesman: true,
        products: true,
        fulfillments: {
          include: {
            fulfilledProducts: true,
          },
        },
      },
      orderBy: sortBy ? { [sortBy as string]: orderDirection } : undefined,
    });

    if (groupBy && groupBy !== "none") {
      const groups: { [key: string]: typeof orders } = {};
      orders.forEach((order) => {
        let key: string;
        if (groupBy === "salesman") {
          key = order.salesman?.username || "Unassigned";
        } else if (groupBy === "orderDate") {
          key = order.orderDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
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
        salesman: true,
        products: true,
        fulfillments: {
          include: {
            fulfilledProducts: true,
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

export const addOrder = async (req: Request, res: Response) => {
  const {
    clientName,
    salesmanId,
    deliveryDetails,
    status,
    orderDate,
    products,
  } = req.body;

  if (
    !clientName ||
    !salesmanId ||
    !deliveryDetails ||
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
        orderDate: new Date(orderDate),
        products: {
          createMany: {
            data: products.map((product: any) => ({
              name: product.name,
              size: product.size,
              quantity: product.quantity,
              orderBy: product.orderBy,
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
    console.error("Error creating new order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

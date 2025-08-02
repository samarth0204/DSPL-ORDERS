import { Request, Response } from "express";
import prisma from "../config/prisma"; // adjust the path if needed

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        salesman: true,
        products: true,
        fulfillments: {
          include: {
            fulfilledProducts: true,
          },
        },
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

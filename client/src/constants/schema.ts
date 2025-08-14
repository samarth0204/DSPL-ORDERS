import { z } from "zod";

export const orderSchema = z.object({
  clientName: z
    .string({ required_error: "Client name is required" })
    .min(1, "Client name is required"),
  deliveryDetails: z
    .string({ required_error: "Delivery details are required" })
    .min(1, "Delivery details are required"),
  description: z.string().optional(),
  products: z
    .array(
      z.object({
        name: z
          .string({ required_error: "Product name is required" })
          .min(1, "Product name is required"),
        size: z
          .string({ required_error: "Size is required" })
          .min(1, "Size is required"),
        orderBy: z
          .string({ required_error: "Order By is required" })
          .min(1, "Order By is required"),
        quantity: z.coerce
          .number({ invalid_type_error: "Quantity is required" })
          .int({ message: "Quantity must be a whole number" })
          .min(1, { message: "Quantity must be at least 1" }),
        rate: z.string().optional(),
      })
    )
    .min(1, "Add at least one product"),
});

export const loginSchema = z.object({
  username: z.string({ required_error: "Username is required" }),
  password: z.string({ required_error: "Password is required" }),
});

export const fulfillmentSchema = z.object({
  billNumber: z.string().min(1, "Bill number is required"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .regex(/^[0-9]+$/, { message: "Amount must contain only digits" }),
  billDate: z.date().optional(),
  description: z.string().optional(),
  fulfillmentProducts: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z
          .number({ invalid_type_error: "Quantity must be a number" })
          .min(1, "Quantity must be a non-negative number"),
      })
    )
    .min(1, "At least one product is required"),
});

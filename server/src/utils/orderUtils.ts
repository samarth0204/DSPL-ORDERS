import prisma from "../config/prisma";

/**
 * Validate fulfilled products against the order’s product quantities.
 *
 * @param orderId string
 * @param newFulfilledProducts array of {productId, quantity} (the new entries you’re adding or editing)
 * @throws Error if any fulfilled quantity would exceed the product quantity
 */
export async function checkValidProductQuantity(
  orderId: string,
  newFulfilledProducts: { productId: string; quantity: number }[],
  fulfillmentId?: string // optional: pass when editing
) {
  // Fetch order with products and their fulfilledProducts
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      products: { include: { fulfilledProducts: true } },
    },
  });

  if (!order) throw new Error("Order not found");

  for (const fp of newFulfilledProducts) {
    const product = order.products.find((p) => p.id === fp.productId);
    if (!product) throw new Error(`Product ${fp.productId} not found in order`);

    // Calculate total fulfilled quantity **excluding the current fulfillment if editing**
    const fulfilledQuantity = product.fulfilledProducts
      .filter((f) => f.fulfillmentId !== fulfillmentId) // exclude current
      .reduce((acc, curr) => acc + curr.quantity, 0);

    if (fp.quantity + fulfilledQuantity > product.quantity) {
      throw new Error(
        `Fulfilled quantity exceeds available quantity for product ${fp.productId}`
      );
    }
  }

  return true;
}

/**
 * Recalculate an order’s status after any fulfillment/product change.
 *
 * @param orderId string
 * @returns the updated order
 */
export async function checkAndUpdateOrderStatus(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      products: { include: { fulfilledProducts: true } },
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  // Check if all products fulfilled
  const allProductsFulfilled = order.products.every((p) => {
    const fulfilledQuantity = p.fulfilledProducts.reduce(
      (acc, curr) => acc + curr.quantity,
      0
    );
    return fulfilledQuantity >= p.quantity;
  });

  const newStatus = allProductsFulfilled ? "Completed" : "In progress";

  // Only update if status changed
  if (order.status !== newStatus) {
    return prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus },
      include: {
        products: { include: { fulfilledProducts: true } },
      },
    });
  }

  return order;
}

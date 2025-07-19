import type { Order } from "@/types/order";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFulfillmentProgress = (order: Order): number => {
  if (!order.products || order.products.length === 0) {
    return 0;
  }

  let totalOrderedQuantity = 0;
  let totalFulfilledQuantity = 0;

  // Calculate total ordered quantity
  order.products.forEach((product) => {
    totalOrderedQuantity += parseInt(product.quantity, 10) || 0;
  });

  // Calculate total fulfilled quantity
  order.fulfillments?.forEach((fulfillment) => {
    fulfillment.fulfilledProducts.forEach((fulfilledProduct) => {
      totalFulfilledQuantity += fulfilledProduct.quantity || 0;
    });
  });

  if (totalOrderedQuantity === 0) {
    return 0;
  }

  return Math.round((totalFulfilledQuantity / totalOrderedQuantity) * 100);
};

export const getFulfilledQuantities = (order: Order): Map<string, number> => {
  const fulfilledMap = new Map<string, number>();

  order.fulfillments?.forEach((fulfillment) => {
    fulfillment.fulfilledProducts.forEach((p) => {
      const key = `${p.name}-${p.size}`; // Unique key for product
      const currentFulfilled = fulfilledMap.get(key) || 0;
      fulfilledMap.set(key, currentFulfilled + p.quantity);
    });
  });
  return fulfilledMap;
};

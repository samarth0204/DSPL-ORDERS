import type { Order } from "@/types/order";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFulfillmentProgress(order: Order) {
  const total = order.products.reduce(
    (acc, p) => acc + parseInt(p.quantity),
    0
  );
  const fulfilled = order.products.reduce((acc, p) => {
    const fulfilledQuantity = order.fulfillments
      .flatMap((f) => f.fulfilledProducts)
      .filter((fp) => fp.productId === p.id)
      .reduce((sum, fp) => sum + fp.quantity, 0);
    return acc + fulfilledQuantity;
  }, 0);
  return total > 0 ? Math.round((fulfilled / total) * 100) : 0;
}

export function getFulfilledQuantities(order: Order) {
  const map = new Map<string, number>();

  order.products.forEach((product) => {
    const fulfilledQuantity = order.fulfillments
      .flatMap((f) => f.fulfilledProducts)
      .filter((fp) => fp.productId === product.id)
      .reduce((acc, fp) => acc + fp.quantity, 0);

    const key = `${product.name}-${product.size}`;
    map.set(key, fulfilledQuantity);
  });

  return map;
}

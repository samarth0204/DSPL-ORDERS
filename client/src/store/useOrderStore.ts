import { create } from "zustand";
import type { Order } from "@/types/order";

type OrderStore = {
  orders: Order[];
  addOrder: (order: Order) => void;
  //   clearOrders: () => void;
};
const dummyOrders = [
  {
    clientName: "Akash",
    deliveryDetails: "Truck 1234",
    products: [
      {
        name: "Mirchi Gold",
        size: "500gm",
        order_by: "Bag",
        quantity: "aa",
      },
    ],
  },
  {
    clientName: "Samarth",
    deliveryDetails: "Truck 234",
    products: [
      {
        name: "Haldi Gold",
        size: "500gm",
        order_by: "Kg",
        quantity: "aaa",
      },
    ],
  },
  {
    clientName: "Samarth Saini",
    deliveryDetails: "Truck 234",
    products: [
      {
        name: "Haldi Gold",
        size: "1 kg",
        order_by: "Bag",
        quantity: "dd",
      },
      {
        name: "Mirchi Royal",
        size: "500gm",
        order_by: "Bag",
        quantity: "sdas",
      },
    ],
  },
  {
    clientName: "Vikash",
    deliveryDetails: "Truck 234",
    products: [
      {
        name: "Mirchi Royal",
        size: "200gm",
        order_by: "Bag",
        quantity: "sdfdsf",
      },
      {
        name: "Mirchi VAP",
        size: "10 Rs",
        order_by: "PKT",
        quantity: "sdfsd",
      },
    ],
  },
];

export const useOrderStore = create<OrderStore>((set) => ({
  orders: dummyOrders,
  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, order],
    })),
  //   clearOrders: () => set({ orders: [] }),
}));

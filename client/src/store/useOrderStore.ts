import { create } from "zustand";
import type { Order } from "@/types/order";
import { dummyOrders } from "@/constants/data";

type OrderStore = {
  orders: Order[];
  addOrder: (order: Order) => void;
  //   clearOrders: () => void;
};

export const useOrderStore = create<OrderStore>((set) => ({
  orders: dummyOrders,
  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, order],
    })),
  //   clearOrders: () => set({ orders: [] }),
}));

import { create } from "zustand";

type Product = {
  name: string;
  mrp: string;
  quantity: string;
  weight: string;
};

type Order = {
  clientName: string;
  deliveryDetails: string;
  products: Product[];
};

type OrderStore = {
  orders: Order[];
  addOrder: (order: Order) => void;
  //   clearOrders: () => void;
};

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, order],
    })),
  //   clearOrders: () => set({ orders: [] }),
}));

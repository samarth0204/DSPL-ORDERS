import { create } from "zustand";
import currentProducts from "../constants/products.json";

type Product = {
  name: string;
  sizes: { size: string; order_by: string[] }[];
};

type ProductStore = {
  availableProducts: Product[];
};

export const useProductStore = create<ProductStore>(() => ({
  availableProducts: currentProducts,
}));

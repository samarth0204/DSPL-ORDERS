import { create } from "zustand";
import type { Bill } from "@/types/bill";
type BillStore = {
  bills: Bill[];
};
export const useBillStore = create<BillStore>(() => {
  return {
    bills: [],
  };
});

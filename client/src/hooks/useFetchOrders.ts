import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { UseFetchOrdersParams } from "@/types/order";

const useFetchOrders = ({
  groupBy,
  sortBy,
  sortOrder,
  search,
}: UseFetchOrdersParams) => {
  return useQuery({
    queryKey: ["orders", { groupBy, sortBy, sortOrder, search }],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3001/api/orders/all", {
        params: { groupBy, sortBy, sortOrder, search },
      });
      return res.data;
    },
  });
};

export default useFetchOrders;

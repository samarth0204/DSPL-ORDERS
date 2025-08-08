import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { UseFetchOrdersParams } from "@/types/order";

const useFetchOrders = ({
  groupBy,
  sortBy,
  sortOrder,
  search,
  salesmanId,
}: UseFetchOrdersParams) => {
  let url;
  if (salesmanId) {
    url = "http://localhost:3001/api/orders";
  } else url = "http://localhost:3001/api/orders/all";
  return useQuery({
    queryKey: ["orders", { groupBy, sortBy, sortOrder, search }],
    queryFn: async () => {
      const res = await axios.get(url, {
        params: { groupBy, sortBy, sortOrder, search, salesmanId },
      });
      return res.data;
    },
  });
};

export default useFetchOrders;

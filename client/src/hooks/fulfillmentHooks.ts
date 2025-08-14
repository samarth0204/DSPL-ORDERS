import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type UseFetchFulfillmentsParams = {
  groupBy?: string;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
  orderId?: string;
};

export const useFetchFulfillments = ({
  groupBy,
  sortBy,
  sortOrder,
  search,
  orderId,
}: UseFetchFulfillmentsParams) => {
  return useQuery({
    queryKey: ["fulfillment", { groupBy, sortBy, sortOrder, search, orderId }],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3001/api/fulfillment/all", {
        params: { groupBy, sortBy, sortOrder, search, orderId },
      });
      return res.data;
    },
  });
};

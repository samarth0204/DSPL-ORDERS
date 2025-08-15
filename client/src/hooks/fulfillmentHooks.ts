import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

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

export const useAddFulfillment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newFulfillment) => {
      const res = await axios.post(
        "http://localhost:3001/api/fulfillment",
        newFulfillment
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fulfillment"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Bill added!", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "colored",
      });
    },
    onError: (error) => {
      console.log("Error adding order:", error);
      toast.error("Something went wrong!", {
        hideProgressBar: true,
        closeOnClick: true,
      });
    },
  });
};
export const useEditFulfillment = () => {};
export const useDeleteFulfillment = () => {};

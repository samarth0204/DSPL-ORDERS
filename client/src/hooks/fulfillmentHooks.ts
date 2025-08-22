import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showToast } from "@/components/common/showToast";

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
      showToast.success("Bill added!");
    },
    onError: (error) => {
      console.log("Error adding order:", error);
      showToast.error("Something went wrong!");
    },
  });
};
type Fulfillment = {
  id: string;
  billNumber?: string;
  description?: string;
  date?: string;
  orderId?: string;
  amount?: number;
  status?: string;
};
export const useEditFulfillment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedFulfillment: Fulfillment) => {
      const res = await axios.put(
        `http://localhost:3001/api/fulfillment/${updatedFulfillment.id}`,
        updatedFulfillment
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fulfillment"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      showToast.success("Bill updated!");
    },
    onError: (error) => {
      console.log("Error updating fulfillment:", error);
      showToast.error("Something went wrong!");
    },
  });
};

export const useDeleteFulfillment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete(
        `http://localhost:3001/api/fulfillment/${id}`
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fulfillment"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      showToast.success("Bill deleted!");
    },
    onError: (error) => {
      console.error("Error deleting fulfillment:", error);
      showToast.error("Something went wrong!");
    },
  });
};

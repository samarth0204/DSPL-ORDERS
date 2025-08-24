import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { showToast } from "@/components/common/showToast";
import type { UseFetchOrdersParams } from "@/types/order";
import api from "@/utils/api"; // ✅ use your api instance

type Order = {
  id: string;
  [key: string]: any;
};

export const useEditOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedOrder: Order) => {
      const res = await api.put(`/orders/${updatedOrder.id}`, updatedOrder);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      showToast.success("Order updated!");
    },
    onError: (error) => {
      console.error("Error updating order:", error);
      showToast.error("Something went wrong!");
    },
  });
};

export const useFetchOrders = ({
  groupBy,
  sortBy,
  sortOrder,
  search,
  salesmanId,
}: UseFetchOrdersParams) => {
  const url = salesmanId ? "/orders" : "/orders/all";

  return useQuery({
    queryKey: ["orders", { groupBy, sortBy, sortOrder, search, salesmanId }],
    queryFn: async () => {
      const res = await api.get(url, {
        params: { groupBy, sortBy, sortOrder, search, salesmanId },
      });
      return res.data;
    },
  });
};

export const useAddOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newOrder: any) => {
      const res = await api.post("/orders", newOrder);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      showToast.success("Order added!");
    },
    onError: (error) => {
      console.error("Error adding order:", error);
      showToast.error("Something went wrong!");
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/orders/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      showToast.success("Order deleted!");
    },
    onError: (error) => {
      console.error("Error deleting order:", error);
      showToast.error("Something went wrong!");
    },
  });
};

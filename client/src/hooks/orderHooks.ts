import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import type { UseFetchOrdersParams } from "@/types/order";

type Order = {
  id: string;
  [key: string]: any;
};

export const useEditOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedOrder: Order) => {
      const res = await axios.put(
        `http://localhost:3001/api/orders/${updatedOrder.id}`,
        updatedOrder
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order updated!", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "colored",
      });
    },
    onError: (error) => {
      console.log("Error updating order:", error);
      toast.error("Something went wrong!", {
        hideProgressBar: true,
        closeOnClick: true,
      });
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

export const useAddOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newOrder) => {
      const res = await axios.post(
        "http://localhost:3001/api/orders",
        newOrder
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order added!", {
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

export const useDeleteOrder = () => {
  const queryClinet = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete(`http://localhost:3001/api/orders/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClinet.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order deleted!", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "colored",
      });
    },
    onError: (error) => {
      console.error("Error deleting order:", error);
      toast.error("Something went wrong!", {
        hideProgressBar: true,
        closeOnClick: true,
      });
    },
  });
};

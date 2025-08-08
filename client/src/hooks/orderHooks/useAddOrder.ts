import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const useAddOrder = () => {
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

export default useAddOrder;

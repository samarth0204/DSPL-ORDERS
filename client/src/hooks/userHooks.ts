import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/utils/api"; // ✅ centralized axios instance

// Login hook
export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const res = await api.post("/users/login", data); // ✅ baseURL handled in api
      return res.data;
    },
  });
};

// Fetch users hook
export const useFetchUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/users"); // ✅ fixed URL
      return res.data;
    },
  });
};

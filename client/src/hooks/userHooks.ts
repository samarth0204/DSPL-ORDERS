import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/utils/api";
import { showToast } from "@/components/common/showToast";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const res = await api.post("/users/login", data);
      return res.data;
    },
  });
};

export const useFetchUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/users");
      return res.data;
    },
  });
};

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/users", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      showToast.success("User added");
    },
    onError: (error) => {
      console.log("Error adding user", error);
      showToast.error("Something went wrong");
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/users/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      showToast.success("User deleted");
    },
    onError: (error) => {
      console.log("Error deleting user", error);
      showToast.error("Something went wrong");
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const clearRoles = useUserStore((s) => s.clearRoles);

  return useMutation({
    mutationFn: async () => await api.post("/users/logout"),
    onSuccess: () => {
      queryClient.clear();
      localStorage.removeItem("id");
      localStorage.removeItem("roles");
      localStorage.removeItem("username");
      clearRoles();
      navigate("/login");
    },
    onError: (error) => {
      console.log("Error deleting user", error);
      showToast.error("Something went wrong");
    },
  });
};

export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await api.put(`/users/${id}`, data);
      return res.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["profile", id] });
      showToast.success("User updated");
    },
    onError: (error) => {
      console.error("Error updating user", error);
      showToast.error("Something went wrong");
    },
  });
};

export const useGetProfile = (id: any) => {
  return useQuery({
    queryKey: ["profile", id],
    queryFn: async () => {
      const res = await api.get(`/users/me/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

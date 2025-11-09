import { showToast } from "@/components/common/showToast";
import api from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useFetchReports = ({ salesmanId }: { salesmanId: string }) => {
  {
    let url = "/reports";
    if (salesmanId) url += `/user/${salesmanId}`;

    return useQuery({
      queryKey: ["reports", { salesmanId }],
      queryFn: async () => {
        const res = await api.get(url);
        return res.data;
      },
    });
  }
};

const useAddReport = () => {
  {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (newReport: any) => {
        const res = await api.post("/reports", newReport);
        return res.data;
      },
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["reports"] });
        showToast.success("Report added!");
      },
      onError: (error) => {
        console.error("Error adding report:", error);
        showToast.error("Something went wrong!");
      },
    });
  }
};

const useApplyLeave = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (leaveData: any) => {
      const res = await api.post("/reports/apply-leave", leaveData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
      showToast.success("Leave applied!");
    },
    onError: (error) => {
      console.error("Error applying leave:", error);
      showToast.error("Something went wrong!");
    },
  });
};

export { useFetchReports, useAddReport, useApplyLeave };

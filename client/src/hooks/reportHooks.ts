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
      onError: (error: any) => {
        const message =
          error.response?.data?.error ||
          "Something went wrong while applying leave!";
        showToast.error(message);
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
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      showToast.success("Leave applied!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.error ||
        "Something went wrong while applying leave!";
      showToast.error(message);
    },
  });
};

export { useFetchReports, useAddReport, useApplyLeave };

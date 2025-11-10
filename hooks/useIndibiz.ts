import { fetchIndibiz, syncIndibiz } from "@/providers/apis/indibiz.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/utils/toast";

export const useIndibizQuery = (
  page: number = 1,
  itemsPerPage: number = 5,
  searchQuery: string = "",
  filterStatus:
    | "PS"
    | "CANCEL"
    | "KENDALA"
    | "REVOKE"
    | "QC1"
    | "PI"
    | "FALLOUT"
    | "WFM_UNSC"
    | "QC2_FCC"
    | "PAPERLESS"
    | "SURVER"
    | "DECLINE_FCC"
    | "PT3_WAITING_AKTIVASI"
    | "FOLLOWUP_TO_COMPLETE"
    | "" = ""
) => {
  const query = useQuery({
    queryKey: ["indibiz", searchQuery, filterStatus, page, itemsPerPage],
    queryFn: () => fetchIndibiz(page, searchQuery, itemsPerPage, filterStatus),
    placeholderData: (previousData) => previousData,
    staleTime: 30000,
  });

  return {
    data: query.data?.data ?? [],
    totalPages: query.data?.totalPages ?? 0,
    totalItems: query.data?.totalItems ?? 0,
    currentPage: query.data?.currentPage ?? page,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refresh: () => query.refetch(),
    isRefreshing: query.isRefetching,
  };
};

export const useSyncIndibiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: syncIndibiz,
    onSuccess: (res: any) => {
      showToast.success(res.message || "Indibiz synced successfully");
      queryClient.invalidateQueries({ queryKey: ["indibiz"] });
    },
    onError: (error: any) => {
      showToast.error(error.message || "Failed to sync indibiz");
    },
  });
};

import {
  fetchInformation,
  fetchInformationDelete,
  fetchInformationList,
  fetchInformationPost,
  fetchInformationPut,
} from "@/providers/apis/information.api";
import { showToast } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useInformationQuery = (
  page: number = 1,
  itemsPerPage: number = 5,
  searchQuery: string = "",
  filterCategory: "PROMO" | "PAKET" | "INFO" | "" = ""
) => {
  const query = useQuery({
    queryKey: ["informations", searchQuery, filterCategory, page, itemsPerPage],
    queryFn: () =>
      fetchInformation(page, searchQuery, itemsPerPage, filterCategory),
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

export const useInformationList = () => {
  return useQuery({
    queryKey: ["informationList"],
    queryFn: fetchInformationList,
  });
};

export const useInformationPostQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => fetchInformationPost(data),
    onSuccess(data: any) {
      queryClient.invalidateQueries({ queryKey: ["informations"] });
      showToast.success(data.message || "Information added successfully.");
    },
  });
};

export const useInformationPutQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      fetchInformationPut(id, data),
    onSuccess(data: any) {
      queryClient.invalidateQueries({ queryKey: ["informations"] });
      showToast.success(data.message || "Information updated successfully.");
    },
  });
};

export const useInformationDeleteQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => fetchInformationDelete(id),
    onSuccess(data: any) {
      queryClient.invalidateQueries({ queryKey: ["informations"] });
      showToast.success(data.message || "Information deleted successfully.");
    },
  });
};

import {
  fetchKeyword,
  fetchKeywordDelete,
  fetchKeywordPost,
  fetchKeywordPut,
} from "@/providers/apis/keyword.api";
import { useKeywordStore } from "@/stores/keywordStore";
import { showToast } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useKeywordQuery = (page: number = 1, itemsPerPage: number = 5) => {
  const searchQuery = useKeywordStore((state) => state.searchQuery);

  const query = useQuery({
    queryKey: ["keywords", searchQuery, page, itemsPerPage],
    queryFn: () => fetchKeyword(page, searchQuery, itemsPerPage),
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

export const useKeywordPostQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["postKeyword"],
    mutationFn: fetchKeywordPost,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["keywords"] });
      showToast.success(data.message || "Keyword has been created successfully.");
    },
    onError: (err) => {
      showToast.error(err.message || "Failed to create keyword. Please try again.");
    },
  });
};

export const useKeywordPutQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["putKeyword"],
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      fetchKeywordPut(id, data),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["keywords"] });
      showToast.success(data.message || "Keyword has been updated successfully.");
    },
    onError: (err) => {
      showToast.error(err.message || "Failed to update keyword. Please try again.");
    },
  });
};

export const useKeywordDeleteQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteKeyword"],
    mutationFn: ({ id }: { id: string }) => fetchKeywordDelete(id),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["keywords"] });
      showToast.success(data.message || "Keyword has been deleted successfully.");
    },
    onError: (err) => {
      showToast.error(err.message || "Failed to delete keyword. Please try again.");
    },
  });
};

import {
  fetchKeyword,
  fetchKeywordDelete,
  fetchKeywordPost,
  fetchKeywordPut,
} from "@/providers/apis/keyword.api";
import { useKeywordStore } from "@/stores/keywordStore";
import { showToast } from "@/utils/toast";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useKeywordQuery = () => {
  const searchQuery = useKeywordStore((state) => state.searchQuery);

  const query = useInfiniteQuery({
    queryKey: ["keywords", searchQuery],
    queryFn: ({ pageParam = 1 }) => {
      return fetchKeyword(pageParam, searchQuery);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
    refetchOnWindowFocus: false,
  });

  const allData = query.data?.pages.flatMap((page) => page.data || []) || [];

  return {
    data: allData,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    loadMore: () => {
      if (query.hasNextPage && !query.isFetchingNextPage) {
        query.fetchNextPage();
      }
    },
    refresh: () => query.refetch(),
    isFetchingMore: query.isFetchingNextPage,
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
      showToast.success(data.message || "Keyword created successfully.");
    },
    onError: (err) => {
      showToast.error(err.message || "Failed to create keyword.");
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
      showToast.success(data.message || "Keyword updated successfully.");
    },
    onError: (err) => {
      showToast.error(err.message || "Failed to update keyword.");
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
      showToast.success(data.message || "Keyword deleted successfully.");
    },
    onError: (err) => {
      showToast.error(err.message || "Failed to delete keyword.");
    },
  });
};

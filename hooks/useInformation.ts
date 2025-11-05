import {
  fetchInformation,
  fetchInformationList,
  fetchInformationPost,
} from "@/providers/apis/information.api";
import { useInformationStore } from "@/stores/informationStore";
import { showToast } from "@/utils/toast";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

export const useInformationQuery = () => {
  const searchQuery = useInformationStore((state) => state.searchQuery);

  const query = useInfiniteQuery({
    queryKey: ["informations", searchQuery],
    queryFn: ({ pageParam = 1 }) => fetchInformation(pageParam, searchQuery),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
  });

  const allData = query.data?.pages.flatMap((page) => page.data) ?? [];

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

export const useInformationList = () => {
  return useQuery({
    queryKey: ["informationList"],
    queryFn: fetchInformationList,
  });
};

export const useInformationPostQuery = () => {
  return useMutation({
    mutationFn: (data: FormData) => fetchInformationPost(data),
    onSuccess(data: any) {
      showToast.success(data.message || "Information added successfully.");
    },
  });
};

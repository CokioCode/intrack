import { fetchIndibiz } from "@/providers/apis/indibiz.api";
import { useInformationStore } from "@/stores/informationStore";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useIndibizQuery = () => {
  const searchQuery = useInformationStore((state) => state.searchQuery);

  const query = useInfiniteQuery({
    queryKey: ["indibiz", searchQuery],
    queryFn: ({ pageParam = 1 }) => fetchIndibiz(pageParam, searchQuery),
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

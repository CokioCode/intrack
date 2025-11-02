import { fetchOrders } from "@/providers/apis/orders.api";
import { useOrdersStore } from "@/stores/ordersStore";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useOrdersQuery = () => {
  const searchQuery = useOrdersStore((state) => state.searchQuery);

  const query = useInfiniteQuery({
    queryKey: ["orders", searchQuery],
    queryFn: ({ pageParam = 1 }) => fetchOrders(pageParam, searchQuery),
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

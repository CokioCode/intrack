import {
  fetchInformation,
  fetchInformationDelete,
  fetchInformationList,
  fetchInformationPost,
  fetchInformationPut,
} from "@/providers/apis/information.api";
import { useInformationStore } from "@/stores/informationStore";
import { showToast } from "@/utils/toast";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

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

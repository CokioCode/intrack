import { fetchOrders, updateOrderStatus } from "@/providers/apis/orders.api";
import { showToast } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useOrdersQuery = (
  page: number = 1,
  itemsPerPage: number = 5,
  searchQuery: string = "",
  filterStatus: "RNA" | "QC" | "FCC" | "PI" | "PS" | "" = "",
  filterMonth:
    | "january"
    | "february"
    | "march"
    | "april"
    | "may"
    | "june"
    | "july"
    | "august"
    | "september"
    | "october"
    | "november"
    | "december"
    | "" = ""
) => {
  const query = useQuery({
    queryKey: [
      "orders",
      searchQuery,
      page,
      itemsPerPage,
      filterStatus,
      filterMonth,
    ],
    queryFn: () =>
      fetchOrders(page, searchQuery, itemsPerPage, filterStatus, filterMonth),
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

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, data }: { orderId: string; data: any }) =>
      updateOrderStatus(orderId, data),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      showToast.success(res.message || "Order status updated successfully");
    },
    onError: (error: any) => {
      showToast.error(error.message || "Failed to update order status");
    },
  });
};

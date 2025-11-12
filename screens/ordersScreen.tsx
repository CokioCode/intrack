import { memo, useCallback, useMemo, useState } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { Button, Text, XStack, YStack } from "tamagui";
import { Filter } from "@tamagui/lucide-icons";

import { SearchInput } from "@/components/common/SearchInput";
import { OrdersCard } from "@/components/features/orders/ordersCard";
import { AdminLayouts } from "@/components/layouts/adminLayouts";
import { useOrdersQuery, useUpdateOrderStatus } from "@/hooks/useOrders";
import Pagination from "@/components/common/Pagination";
import { FilterOrdersDialog } from "@/components/features/orders/dialogs/FilterOrdersDialog";
import { EditOrderDialog } from "@/components/features/orders/dialogs/EditOrderDialog";

type OrderItem = {
  id: string;
  indibiz: {
    name: string;
    ao_number: string;
    sales: {
      name: string;
    };
  };
  steps: Array<{
    is_current: boolean;
    title: string;
  }>;
  current_status: string;
};

const LoadingState = memo(() => {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const minHeight = SCREEN_HEIGHT * 0.55;

  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      minHeight={minHeight}
    >
      <ActivityIndicator size="large" color="#3B82F6" />
      <Text marginTop="$4" color="$gray10" fontSize={14}>
        Loading orders...
      </Text>
    </YStack>
  );
});

LoadingState.displayName = "LoadingState";

const ErrorState = memo(({ onRetry }: { onRetry: () => void }) => {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const minHeight = SCREEN_HEIGHT * 0.55;

  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      minHeight={minHeight}
      gap={8}
    >
      <Text color="$red10" fontSize={16} fontWeight="600">
        Error loading orders
      </Text>
      <Text
        color="$blue10"
        fontSize={14}
        onPress={onRetry}
        textDecorationLine="underline"
      >
        Tap to retry
      </Text>
    </YStack>
  );
});

ErrorState.displayName = "ErrorState";

const EmptyState = memo(() => {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const minHeight = SCREEN_HEIGHT * 0.55;

  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      minHeight={minHeight}
    >
      <Text color="$gray10" fontSize={14}>
        No orders found
      </Text>
    </YStack>
  );
});

EmptyState.displayName = "EmptyState";

const ItemSeparator = memo(() => <YStack height={12} />);
ItemSeparator.displayName = "ItemSeparator";

const OrdersScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "RNA" | "QC" | "FCC" | "PI" | "PS" | ""
  >("");
  const [filterMonth, setFilterMonth] = useState<
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
    | ""
  >("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

  const {
    data,
    totalPages,
    totalItems,
    isLoading,
    isError,
    refresh,
    isRefreshing,
  } = useOrdersQuery(
    currentPage,
    itemsPerPage,
    searchQuery,
    filterStatus,
    filterMonth
  );

  const handleSearch = useCallback(() => {
    const query = searchText.trim();
    setSearchQuery(query);
    setCurrentPage(1);
  }, [searchText]);

  const handleChange = useCallback((text: string) => {
    setSearchText(text);
    if (text === "") {
      setSearchQuery("");
      setCurrentPage(1);
    }
  }, []);

  const handleRefresh = useCallback(() => {
    setSearchText("");
    setSearchQuery("");
    setFilterStatus("");
    setFilterMonth("");
    setCurrentPage(1);
    refresh();
  }, [refresh]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleItemsPerPageChange = useCallback((items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  }, []);

  const handleFilterOpen = useCallback(() => {
    setFilterDialogOpen(true);
  }, []);

  const handleFilterChange = useCallback(
    (filters: {
      status: "RNA" | "QC" | "FCC" | "PI" | "PS" | "";
      month:
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
        | "";
    }) => {
      setFilterStatus(filters.status);
      setFilterMonth(filters.month);
      setCurrentPage(1);
    },
    []
  );

  const handleEdit = useCallback(
    (orderId: string) => {
      const order = data.find((item: OrderItem) => item.id === orderId);
      if (order) {
        setSelectedOrder(order);
        setEditDialogOpen(true);
      }
    },
    [data]
  );

  const updateOrderMutation = useUpdateOrderStatus();

  const handleSave = useCallback(
    async (orderId: string, data: any) => {
      try {
        await updateOrderMutation.mutateAsync({ orderId, data });
      } catch (error) {
        console.error("Failed to save order:", error);
      }
    },
    [updateOrderMutation]
  );

  const renderItem = useCallback(
    ({ item }: { item: OrderItem }) => {
      const currentStep = item.steps?.find((s) => s.is_current);
      return (
        <OrdersCard
          orderId={item.id}
          date={new Date().toLocaleDateString("id-ID")}
          technician={item.indibiz?.name || "N/A"}
          status={currentStep?.title || item.current_status || "Pending"}
          onEdit={handleEdit}
        />
      );
    },
    [handleEdit]
  );

  const keyExtractor = useCallback((item: OrderItem) => item.id, []);

  const contentContainerStyle = useMemo(
    () => ({
      paddingBottom: 24,
    }),
    []
  );

  const listEmpty = useMemo(
    () => (!isLoading ? <EmptyState /> : null),
    [isLoading]
  );

  const hasActiveFilters = filterStatus !== "" || filterMonth !== "";

  const searchContent = useMemo(
    () => (
      <YStack width="100%" gap="$3">
        <XStack width="100%" alignItems="center" gap="$2">
          <XStack flex={1}>
            <SearchInput
              value={searchText}
              onChange={handleChange}
              onSearch={handleSearch}
              placeholder="Search orders..."
              variant="default"
            />
          </XStack>
          <XStack position="relative">
            <Button
              icon={<Filter size={18} />}
              backgroundColor="$gray4"
              color="$gray12"
              onPress={handleFilterOpen}
              pressStyle={{ opacity: 0.8 }}
            />
            {hasActiveFilters && (
              <XStack
                position="absolute"
                top={-4}
                right={-4}
                width={8}
                height={8}
                backgroundColor="$blue9"
                borderRadius={4}
              />
            )}
          </XStack>
        </XStack>
      </YStack>
    ),
    [searchText, handleChange, handleSearch, handleFilterOpen, hasActiveFilters]
  );

  const paginationContent = useMemo(
    () => (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    ),
    [
      currentPage,
      totalPages,
      handlePageChange,
      itemsPerPage,
      handleItemsPerPageChange,
    ]
  );

  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      <AdminLayouts
        variant="settings"
        title="Order Management"
        subtitle="Manage and track all orders"
        showFixedSearch={true}
        showFixedPagination={!isLoading && !isError && data.length > 0}
        fixedSearchContent={searchContent}
        fixedPaginationContent={paginationContent}
      >
        <YStack flex={1} paddingHorizontal="$3" paddingTop="$3">
          {isLoading ? (
            <LoadingState />
          ) : isError ? (
            <ErrorState onRetry={refresh} />
          ) : (
            <FlashList
              data={data}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              contentContainerStyle={contentContainerStyle}
              onRefresh={handleRefresh}
              refreshing={isRefreshing}
              ItemSeparatorComponent={ItemSeparator}
              ListEmptyComponent={listEmpty}
            />
          )}
        </YStack>
      </AdminLayouts>

      <FilterOrdersDialog
        open={filterDialogOpen}
        onOpenChange={setFilterDialogOpen}
        filterStatus={filterStatus}
        filterMonth={filterMonth}
        onFilterChange={handleFilterChange}
      />

      {selectedOrder && (
        <EditOrderDialog
          ao_number={selectedOrder.indibiz?.ao_number || "N/A"}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          orderId={selectedOrder.id}
          date={new Date().toLocaleDateString("id-ID")}
          technician={selectedOrder.indibiz?.sales?.name || "N/A"}
          status={selectedOrder.current_status as any}
          statusColor="#3B82F6"
          onSave={handleSave}
        />
      )}
    </SafeAreaView>
  );
};

export default OrdersScreen;

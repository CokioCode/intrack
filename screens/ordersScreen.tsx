import { memo, useCallback, useMemo, useState } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { Text, YStack } from "tamagui";

import { SearchInput } from "@/components/common/SearchInput";
import { OrdersCard } from "@/components/features/orders/ordersCard";
import { AdminLayouts } from "@/components/layouts/adminLayouts";
import { useOrdersQuery } from "@/hooks/useOrders";
import { useOrdersStore } from "@/stores/ordersStore";

type OrderItem = {
  id: string;
  indibiz: {
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

// Move components outside to prevent recreation on every render
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

const LoadingFooter = memo(() => (
  <YStack padding="$4" alignItems="center">
    <ActivityIndicator size="small" color="#3B82F6" />
  </YStack>
));

LoadingFooter.displayName = "LoadingFooter";

const ItemSeparator = memo(() => <YStack height={12} />);
ItemSeparator.displayName = "ItemSeparator";

const OrdersScreen = () => {
  const [searchText, setSearchText] = useState("");
  const setSearchQuery = useOrdersStore((state) => state.setSearchQuery);

  const {
    data,
    isLoading,
    isError,
    loadMore,
    refresh,
    isFetchingMore,
    isRefreshing,
  } = useOrdersQuery();

  const handleSearch = useCallback(() => {
    setSearchQuery(searchText);
  }, [searchText, setSearchQuery]);

  const renderItem = useCallback(({ item }: { item: OrderItem }) => {
    const currentStep = item.steps?.find((s) => s.is_current);
    return (
      <OrdersCard
        orderId={item.id}
        date={new Date().toLocaleDateString("id-ID")}
        technician={item.indibiz?.sales?.name || "N/A"}
        status={currentStep?.title || item.current_status || "Pending"}
        statusColor="#3B82F6"
      />
    );
  }, []);

  const keyExtractor = useCallback((item: OrderItem) => item.id, []);

  const contentContainerStyle = useMemo(
    () => ({
      paddingBottom: 24,
    }),
    []
  );

  const listFooter = useMemo(
    () => (isFetchingMore ? <LoadingFooter /> : null),
    [isFetchingMore]
  );

  const listEmpty = useMemo(
    () => (!isLoading ? <EmptyState /> : null),
    [isLoading]
  );

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <AdminLayouts
        variant="settings"
        title="Order Management"
        subtitle="Manage and track all orders"
      >
        <YStack flex={1} paddingHorizontal="$4" paddingTop="$4">
          <SearchInput
            value={searchText}
            onChange={setSearchText}
            onSearch={handleSearch}
            placeholder="Search orders..."
            variant="default"
          />

          <YStack height={12} />

          <YStack flex={1}>
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
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                onRefresh={refresh}
                refreshing={isRefreshing}
                ItemSeparatorComponent={ItemSeparator}
                ListFooterComponent={listFooter}
                ListEmptyComponent={listEmpty}
              />
            )}
          </YStack>
        </YStack>
      </AdminLayouts>
    </SafeAreaView>
  );
};

export default OrdersScreen;

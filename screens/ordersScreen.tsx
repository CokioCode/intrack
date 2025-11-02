import { SearchInput } from "@/components/common/SearchInput";
import { OrdersCard } from "@/components/features/orders/ordersCard";
import { AdminLayouts } from "@/components/layouts/adminLayouts";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOrdersQuery } from "@/hooks/useOrders";
import { useOrdersStore } from "@/stores/ordersStore";
import { ActivityIndicator } from "react-native";
import { Text, YStack } from "tamagui";
import { useState } from "react";
import { FlashList } from "@shopify/flash-list";

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

  const handleSearch = () => setSearchQuery(searchText);

  // if (isLoading) {
  //   return (
  //     <SafeAreaView style={{ flex: 1 }}>
  //       <AdminLayouts
  //         variant="settings"
  //         title="Order Management"
  //         subtitle="Manage and track all orders"
  //       >
  //         <YStack flex={1} justifyContent="center" alignItems="center">
  //           <ActivityIndicator size="large" color="#3B82F6" />
  //           <Text marginTop="$4" color="$gray10">
  //             Loading orders...
  //           </Text>
  //         </YStack>
  //       </AdminLayouts>
  //     </SafeAreaView>
  //   );
  // }

  if (isError) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <AdminLayouts
          variant="settings"
          title="Order Management"
          subtitle="Manage and track all orders"
        >
          <YStack flex={1} justifyContent="center" alignItems="center">
            <Text color="$red10" fontSize="$5">
              Error loading orders
            </Text>
            <Text color="$gray10" marginTop="$2" onPress={refresh}>
              Tap to retry
            </Text>
          </YStack>
        </AdminLayouts>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <AdminLayouts
        variant="settings"
        title="Order Management"
        subtitle="Manage and track all orders"
      >
        <YStack flex={1} padding="$4" gap="$4">
          <SearchInput
            value={searchText}
            onChange={setSearchText}
            onSearch={handleSearch}
            placeholder="Search orders..."
            variant="default"
          />

          <YStack flex={1}>
            <FlashList
              data={data}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              renderItem={({ item }) => {
                const currentStep = item.steps.find((s: any) => s.is_current);
                return (
                  <OrdersCard
                    orderId={item.id}
                    date={new Date().toLocaleDateString("id-ID")}
                    technician={item.indibiz.sales.name}
                    status={currentStep?.title || item.current_status}
                    statusColor="#3B82F6"
                  />
                );
              }}
              contentContainerStyle={{
                paddingBottom: 24,
              }}
              onEndReached={loadMore}
              onEndReachedThreshold={0.5}
              onRefresh={refresh}
              refreshing={isRefreshing}
              ItemSeparatorComponent={() => <YStack height={8} />}
              ListFooterComponent={
                isFetchingMore ? (
                  <YStack padding="$4" alignItems="center">
                    <ActivityIndicator size="small" color="#3B82F6" />
                  </YStack>
                ) : null
              }
              ListEmptyComponent={
                <YStack alignItems="center" marginTop="$10">
                  <Text color="$gray10">No orders found</Text>
                </YStack>
              }
            />
          </YStack>
        </YStack>
      </AdminLayouts>
    </SafeAreaView>
  );
};

export default OrdersScreen;

import { AdminLayouts } from "@/components/layouts/adminLayouts";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, YStack, ScrollView } from "tamagui";

const OrdersScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <AdminLayouts
        variant="settings"
        title="Order Management"
        subtitle="Manage and track all orders"
      >
        <ScrollView flex={1}>
          <YStack padding="$4" gap="$4">
            <Text fontSize="$5" fontWeight="600" color="#333">
              Orders Content
            </Text>
            <Text color="#666">This is the orders screen content area</Text>
          </YStack>
        </ScrollView>
      </AdminLayouts>
    </SafeAreaView>
  );
};

export default OrdersScreen;

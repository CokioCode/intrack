import { AdminLayouts } from "@/components/layouts/adminLayouts";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, YStack } from "tamagui";

const IndibizScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <AdminLayouts
        variant="settings"
        title="Indibiz Management"
        subtitle="Monitor and control Indibiz"
      >
        <ScrollView flex={1}>
          <YStack padding="$4" gap="$4">
            <Text fontSize="$5" fontWeight="600" color="#333">
              Indibiz Content
            </Text>
            <Text color="#666">This is the Indibiz screen content area.</Text>
          </YStack>
        </ScrollView>
      </AdminLayouts>
    </SafeAreaView>
  );
};

export default IndibizScreen;

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, YStack, Text } from "tamagui";
import { AdminLayouts } from "@/components/layouts/adminLayouts";

const BotScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <AdminLayouts
        variant="settings"
        title="Bot Management"
        subtitle="Monitor and control bots"
      >
        <ScrollView flex={1}>
          <YStack padding="$4" gap="$4">
            <Text fontSize="$5" fontWeight="600" color="#333">
              Bot Content
            </Text>
            <Text color="#666">This is the bot screen content area.</Text>
          </YStack>
        </ScrollView>
      </AdminLayouts>
    </SafeAreaView>
  );
};

export default BotScreen;

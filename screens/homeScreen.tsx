import { AdminLayouts } from "@/components/layouts/adminLayouts";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "tamagui";
import { YStack, Text } from "tamagui";

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <AdminLayouts>
        <ScrollView flex={1}>
          <YStack padding="$4" gap="$4">
            <Text fontSize="$5" fontWeight="600" color="#333">
              Home Content
            </Text>
            <Text color="#666">This is the home screen content area.</Text>
          </YStack>
        </ScrollView>
      </AdminLayouts>
    </SafeAreaView>
  );
};

export default HomeScreen;

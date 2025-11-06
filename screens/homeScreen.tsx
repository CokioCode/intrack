import { useRouter } from "expo-router";
import { AdminLayouts } from "@/components/layouts/adminLayouts";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, YStack, XStack, Text, Button, Card } from "tamagui";
import { ShoppingCart, Bot, Building2, CheckCircle, Clock } from "@tamagui/lucide-icons";

const HomeScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      <AdminLayouts>
        <ScrollView flex={1}>
          <YStack padding="$4" gap="$4">
            {/* ======= Summary Section ======= */}
            <XStack justifyContent="space-between" marginBottom="$3">
              <Card elevate bordered width="48%" padding="$3" backgroundColor="#FFFFFF">
                <XStack alignItems="center" gap="$2">
                  <Clock color="#F97316" size={24} />
                  <YStack>
                    <Text color="#F97316" fontSize="$5" fontWeight="700">24</Text>
                    <Text color="#444" fontSize="$4">Pending</Text>
                  </YStack>
                </XStack>
              </Card>

              <Card elevate bordered width="48%" padding="$3" backgroundColor="#FFFFFF">
                <XStack alignItems="center" gap="$2">
                  <CheckCircle color="#16A34A" size={24} />
                  <YStack>
                    <Text color="#16A34A" fontSize="$5" fontWeight="700">156</Text>
                    <Text color="#444" fontSize="$4">Completed</Text>
                  </YStack>
                </XStack>
              </Card>
            </XStack>

            {/* ======= Quick Access Section ======= */}
            <YStack gap="$3">
              <XStack alignItems="center" gap="$2">
                <YStack width={4} height={24} backgroundColor="#1E3A8A" borderRadius={2} />
                <Text fontSize="$6" fontWeight="700" color="#1E3A8A">
                  Quick Access
                </Text>
              </XStack>

              <XStack justifyContent="space-between" gap="$3" flexWrap="wrap">
                {/* ===== Order Management ===== */}
                <Card elevate bordered width="48%" padding="$4" backgroundColor="white">
                  <XStack alignItems="center" gap="$3" marginBottom="$2">
                    <ShoppingCart color="#FF9800" size={28} flexShrink={0} />
                    <YStack flex={1}>
                      <Text fontSize="$5" fontWeight="600" color="#1E3A8A" lineHeight={22}>
                        Order Management
                      </Text>
                    </YStack>
                  </XStack>
                  <Text color="#666" fontSize="$3" marginBottom="$3">
                    View And Update Order Status, Track Progress.
                  </Text>
                  <Button
                    size="$3"
                    backgroundColor="#FF9800"
                    color="white"
                    onPress={() => router.push("/(tabs)/orders")}
                  >
                    Manage
                  </Button>
                </Card>

                {/* ===== Bot Management ===== */}
                <Card elevate bordered width="48%" padding="$4" backgroundColor="white">
                  <XStack alignItems="center" gap="$3" marginBottom="$2">
                    <Bot color="#9966CC" size={28} flexShrink={0} />
                    <YStack flex={1}>
                      <Text fontSize="$5" fontWeight="600" color="#1E3A8A" lineHeight={22}>
                        Bot Management
                      </Text>
                    </YStack>
                  </XStack>
                  <Text color="#666" fontSize="$3" marginBottom="$3">
                    Manage Chatbot Data, Keywords, And Telkom Service Packages.
                  </Text>
                  <Button
                    size="$3"
                    backgroundColor="#9966CC"
                    color="white"
                    onPress={() => router.push("/(tabs)/bot/bots")}
                  >
                    Manage
                  </Button>
                </Card>

                {/* ===== Indibiz ===== */}
                <Card
                  elevate
                  bordered
                  width="100%"
                  padding="$4"
                  backgroundColor="white"
                  marginTop="$3"
                >
                  <XStack alignItems="center" gap="$3" marginBottom="$2">
                    <Building2 color="#4CAF50" size={28} />
                    <Text fontSize="$5" fontWeight="600" color="#1E3A8A">
                      Indibiz
                    </Text>
                  </XStack>
                  <Text color="#666" fontSize="$3" marginBottom="$3">
                    View Business Records, Installation Details, And PIC Contacts.
                  </Text>
                  <Button
                    size="$3"
                    backgroundColor="#4CAF50"
                    color="white"
                    onPress={() => router.push("/(tabs)/indibiz")}
                  >
                    View Dashboard
                  </Button>
                </Card>
              </XStack>
            </YStack>
          </YStack>
        </ScrollView>
      </AdminLayouts>
    </SafeAreaView>
  );
};

export default HomeScreen;

import { AdminLayouts } from "@/components/layouts/adminLayouts";
import {
  BarChart3,
  Bot,
  ClipboardList,
  Clock,
  FileText,
  TrendingUp,
} from "@tamagui/lucide-icons";
import { router } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Card, Circle, XStack } from "tamagui";
import { YStack, Text } from "tamagui";

const HomeScreen = () => {
  const quickAccessItems = [
    {
      icon: FileText,
      title: "Tracking Log",
      description:
        "Monitor detailed tracking history of user and system activities",
      buttonText: "Open Log",
      path: "/tracking-log",
      color: "$blue10",
      bgColor: "$blue3",
    },
    {
      icon: ClipboardList,
      title: "Order Management",
      description: "View and update order status, track progress efficiently",
      buttonText: "Manage Orders",
      path: "/order-management",
      color: "$purple10",
      bgColor: "$purple3",
    },
    {
      icon: Bot,
      title: "Bot Management",
      description: "Manage chatbot data, keywords, and Telkom service packages",
      buttonText: "Manage Bot",
      path: "/bot-management",
      color: "$green10",
      bgColor: "$green3",
    },
    {
      icon: BarChart3,
      title: "Indibiz Dashboard",
      description:
        "View business records, installation details, and PIC contacts",
      buttonText: "View Dashboard",
      path: "/indibiz",
      color: "$orange10",
      bgColor: "$orange3",
    },
  ];
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <AdminLayouts>
        <YStack flex={1} backgroundColor="$gray2" padding="$4" gap="$5">
          <YStack gap="$2">
            <Text fontSize="$7" fontWeight="800" color="$gray12">
              Welcome Back 👋
            </Text>
            <Text fontSize="$4" color="$gray11">
              Here's what's happening with your orders today
            </Text>
          </YStack>

          <XStack gap="$3">
            <Card
              flex={1}
              backgroundColor="white"
              borderRadius="$5"
              padding="$4"
              elevate
              borderWidth={1}
              borderColor="$red5"
            >
              <YStack gap="$3">
                <XStack justifyContent="space-between" alignItems="center">
                  <Circle size={48} backgroundColor="$red3">
                    <Clock size={24} color="$red10" />
                  </Circle>
                  <YStack alignItems="flex-end">
                    <Text fontSize="$9" fontWeight="800" color="$red10">
                      24
                    </Text>
                  </YStack>
                </XStack>
                <YStack gap="$1">
                  <Text fontSize="$3" fontWeight="600" color="$gray12">
                    Pending Orders
                  </Text>
                  <Text fontSize="$2" color="$red9">
                    Requires attention
                  </Text>
                </YStack>
              </YStack>
            </Card>

            <Card
              flex={1}
              backgroundColor="white"
              borderRadius="$5"
              padding="$4"
              elevate
              borderWidth={1}
              borderColor="$green5"
            >
              <YStack gap="$3">
                <XStack justifyContent="space-between" alignItems="center">
                  <Circle size={48} backgroundColor="$green3">
                    <TrendingUp size={24} color="$green10" />
                  </Circle>
                  <YStack alignItems="flex-end">
                    <Text fontSize="$9" fontWeight="800" color="$green10">
                      156
                    </Text>
                  </YStack>
                </XStack>
                <YStack gap="$1">
                  <Text fontSize="$3" fontWeight="600" color="$gray12">
                    Completed
                  </Text>
                  <Text fontSize="$2" color="$green9">
                    +12% from last week
                  </Text>
                </YStack>
              </YStack>
            </Card>
          </XStack>

          <YStack gap="$3" flex={1}>
            <XStack justifyContent="space-between" alignItems="center">
              <Text fontSize="$5" fontWeight="700" color="$gray12">
                Quick Access
              </Text>
              <Text fontSize="$3" color="$blue10" fontWeight="600">
                View All →
              </Text>
            </XStack>

            <XStack flexWrap="wrap" justifyContent="space-between" gap="$3">
              {quickAccessItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={index}
                    width="48%"
                    backgroundColor="white"
                    borderRadius="$5"
                    padding="$0"
                    elevate
                    pressStyle={{ scale: 0.97 }}
                    animation="bouncy"
                    overflow="hidden"
                  >
                    <YStack>
                      <YStack backgroundColor={item.bgColor} padding="$4">
                        <XStack alignItems="center" gap="$2">
                          <Circle size={40} backgroundColor="white">
                            <Icon size={22} color={item.color} />
                          </Circle>
                          <Text
                            fontSize="$4"
                            fontWeight="700"
                            color={item.color}
                            flex={1}
                          >
                            {item.title}
                          </Text>
                        </XStack>
                      </YStack>

                      <YStack padding="$4" gap="$3">
                        <Text
                          fontSize="$2"
                          color="$gray10"
                          lineHeight={18}
                          numberOfLines={2}
                        >
                          {item.description}
                        </Text>

                        <Button
                          size="$3"
                          backgroundColor={item.color}
                          color="white"
                          fontWeight="600"
                          borderRadius="$3"
                          pressStyle={{ scale: 0.95 }}
                          onPress={() => router.push(item.path as any)}
                        >
                          {item.buttonText}
                        </Button>
                      </YStack>
                    </YStack>
                  </Card>
                );
              })}
            </XStack>
          </YStack>
        </YStack>
      </AdminLayouts>
    </SafeAreaView>
  );
};

export default HomeScreen;

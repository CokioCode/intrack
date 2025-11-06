import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, YStack, XStack, Card, Text, Button } from "tamagui";
import { AdminLayouts } from "@/components/layouts/adminLayouts";
import { router } from "expo-router";
import { Key, FileText, KeyRound, Info } from "@tamagui/lucide-icons";
import { useBotStatsQuery } from "@/hooks/useBot";

const BotScreen = () => {
  const { data } = useBotStatsQuery();
  const keywordCount = data?.data?.keywords;
  const informationCount = data?.data?.infoCenter;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "transparent" }}
      edges={[]}
    >
      <AdminLayouts
        variant="settings"
        title="Bot Management"
        subtitle="Monitor and control bots"
      >
        <ScrollView flex={1}>
          <YStack padding="$4" gap="$4">
            <XStack justifyContent="space-between" gap="$3">
              <Card bordered width="48%" padding="$3" backgroundColor="#FFFFFF">
                <XStack alignItems="center" gap="$2">
                  <KeyRound color="#FB923C" size={24} />
                  <YStack>
                    <Text color="#FB923C" fontSize="$5" fontWeight="700">
                      {keywordCount}
                    </Text>
                    <Text color="#444" fontSize="$4">
                      Keywords
                    </Text>
                  </YStack>
                </XStack>
              </Card>

              <Card width="48%" padding="$3" backgroundColor="#FFFFFF">
                <XStack alignItems="center" gap="$2">
                  <Info color="#1976D2" size={24} />
                  <YStack>
                    <Text color="#1976D2" fontSize="$5" fontWeight="700">
                      {informationCount}
                    </Text>
                    <Text color="#444" fontSize="$4">
                      Information
                    </Text>
                  </YStack>
                </XStack>
              </Card>
            </XStack>

            <YStack gap="$3">
              <Card bordered width="100%" padding="$4" backgroundColor="white">
                <XStack alignItems="center" gap="$3" marginBottom="$2">
                  <Key color="#6366F1" size={28} flexShrink={0} />
                  <YStack flex={1}>
                    <Text
                      fontSize="$5"
                      fontWeight="600"
                      color="#1E3A8A"
                      lineHeight={22}
                    >
                      Keyword Management
                    </Text>
                  </YStack>
                </XStack>
                <Text color="#666" fontSize="$3" marginBottom="$3">
                  Control Chatbot Keywords And Automated Responses. Customize
                  How Your Bot Interacts With User Messages.
                </Text>
                <Button
                  size="$3"
                  backgroundColor="#1E40AF"
                  color="white"
                  onPress={() => router.push("/bot/keyword")}
                >
                  Manage
                </Button>
              </Card>

              <Card width="100%" padding="$4" backgroundColor="white">
                <XStack alignItems="center" gap="$3" marginBottom="$2">
                  <FileText color="#3B82F6" size={28} flexShrink={0} />
                  <YStack flex={1}>
                    <Text
                      fontSize="$5"
                      fontWeight="600"
                      color="#1E3A8A"
                      lineHeight={22}
                    >
                      Information Center
                    </Text>
                  </YStack>
                </XStack>
                <Text color="#666" fontSize="$3" marginBottom="$3">
                  Publish Service Updates, Brochures, And Informational Content.
                </Text>
                <Button
                  size="$3"
                  backgroundColor="#1E40AF"
                  color="white"
                  onPress={() => router.push("/bot/information")}
                >
                  Manage
                </Button>
              </Card>
            </YStack>
          </YStack>
        </ScrollView>
      </AdminLayouts>
    </SafeAreaView>
  );
};

export default BotScreen;

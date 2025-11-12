import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  YStack,
  Accordion,
  Paragraph,
  Square,
  Card,
  Button,
  XStack,
  H5,
} from "tamagui";
import { ChevronDown, MessageCircle } from "@tamagui/lucide-icons";
import { Linking, Dimensions } from "react-native";
import HeaderApp from "@/components/common/HeaderApp";

export default function HelpScreen() {
  const { width: SCREEN_WIDTH } = Dimensions.get("window");

  const scale = (size: number) => (SCREEN_WIDTH / 375) * size;
  const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

  const handleContact = (type: "telegram") => {
    switch (type) {
      case "telegram":
        Linking.openURL("https://t.me/santozoo");
        break;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <HeaderApp
        variant="settings"
        title="Help"
        subtitle="Get help with Indibiz"
      />

      <ScrollView>
        <YStack padding={moderateScale(16)} gap={moderateScale(40)}>
          <Card elevate>
            <Card.Header paddingBottom={moderateScale(12)}>
              <H5 fontSize={moderateScale(18)}>Frequently Asked Questions</H5>
            </Card.Header>
            <Accordion overflow="hidden" width="100%" type="multiple">
              <Accordion.Item value="a1">
                <Accordion.Trigger
                  flexDirection="row"
                  justifyContent="space-between"
                  paddingVertical={moderateScale(12)}
                >
                  {({ open }: { open: boolean }) => (
                    <>
                      <Paragraph
                        flex={1}
                        paddingRight={moderateScale(8)}
                        fontSize={moderateScale(14)}
                      >
                        How do I track my order?
                      </Paragraph>
                      <Square
                        animation="quick"
                        rotate={open ? "180deg" : "0deg"}
                        size={moderateScale(20)}
                      >
                        <ChevronDown size={moderateScale(16)} />
                      </Square>
                    </>
                  )}
                </Accordion.Trigger>
                <Accordion.HeightAnimator animation="medium">
                  <Accordion.Content
                    animation="medium"
                    exitStyle={{ opacity: 0 }}
                    paddingHorizontal={moderateScale(16)}
                    paddingBottom={moderateScale(12)}
                  >
                    <Paragraph
                      fontSize={moderateScale(13)}
                      lineHeight={moderateScale(20)}
                    >
                      After logging in, go to your dashboard, then enter your SC
                      Number in the search field. The system will display your
                      order's current progress — such as Verification, QC,
                      Installation Schedule, or Completed.
                    </Paragraph>
                  </Accordion.Content>
                </Accordion.HeightAnimator>
              </Accordion.Item>

              <Accordion.Item value="a2">
                <Accordion.Trigger
                  flexDirection="row"
                  justifyContent="space-between"
                  paddingVertical={moderateScale(12)}
                >
                  {({ open }: { open: boolean }) => (
                    <>
                      <Paragraph
                        flex={1}
                        paddingRight={moderateScale(8)}
                        fontSize={moderateScale(14)}
                      >
                        What should I do if my order status hasn't updated?
                      </Paragraph>
                      <Square
                        animation="quick"
                        rotate={open ? "180deg" : "0deg"}
                        size={moderateScale(20)}
                      >
                        <ChevronDown size={moderateScale(16)} />
                      </Square>
                    </>
                  )}
                </Accordion.Trigger>
                <Accordion.HeightAnimator animation="medium">
                  <Accordion.Content
                    animation="medium"
                    exitStyle={{ opacity: 0 }}
                    paddingHorizontal={moderateScale(16)}
                    paddingBottom={moderateScale(12)}
                  >
                    <Paragraph
                      fontSize={moderateScale(13)}
                      lineHeight={moderateScale(20)}
                    >
                      Order statuses are typically updated within 24-48 hours.
                      If your status hasn't changed after this period, please
                      contact our support team using the contact options below.
                    </Paragraph>
                  </Accordion.Content>
                </Accordion.HeightAnimator>
              </Accordion.Item>

              <Accordion.Item value="a3">
                <Accordion.Trigger
                  flexDirection="row"
                  justifyContent="space-between"
                  paddingVertical={moderateScale(12)}
                >
                  {({ open }: { open: boolean }) => (
                    <>
                      <Paragraph
                        flex={1}
                        paddingRight={moderateScale(8)}
                        fontSize={moderateScale(14)}
                      >
                        How can I cancel or modify my order?
                      </Paragraph>
                      <Square
                        animation="quick"
                        rotate={open ? "180deg" : "0deg"}
                        size={moderateScale(20)}
                      >
                        <ChevronDown size={moderateScale(16)} />
                      </Square>
                    </>
                  )}
                </Accordion.Trigger>
                <Accordion.HeightAnimator animation="medium">
                  <Accordion.Content
                    animation="medium"
                    exitStyle={{ opacity: 0 }}
                    paddingHorizontal={moderateScale(16)}
                    paddingBottom={moderateScale(12)}
                  >
                    <Paragraph
                      fontSize={moderateScale(13)}
                      lineHeight={moderateScale(20)}
                    >
                      Orders can be modified or cancelled before they reach the
                      QC stage. Please contact our support team immediately if
                      you need to make changes.
                    </Paragraph>
                  </Accordion.Content>
                </Accordion.HeightAnimator>
              </Accordion.Item>

              <Accordion.Item value="a4">
                <Accordion.Trigger
                  flexDirection="row"
                  justifyContent="space-between"
                  paddingVertical={moderateScale(12)}
                >
                  {({ open }: { open: boolean }) => (
                    <>
                      <Paragraph
                        flex={1}
                        paddingRight={moderateScale(8)}
                        fontSize={moderateScale(14)}
                      >
                        What are the different order statuses?
                      </Paragraph>
                      <Square
                        animation="quick"
                        rotate={open ? "180deg" : "0deg"}
                        size={moderateScale(20)}
                      >
                        <ChevronDown size={moderateScale(16)} />
                      </Square>
                    </>
                  )}
                </Accordion.Trigger>
                <Accordion.HeightAnimator animation="medium">
                  <Accordion.Content
                    animation="medium"
                    exitStyle={{ opacity: 0 }}
                    paddingHorizontal={moderateScale(16)}
                    paddingBottom={moderateScale(12)}
                  >
                    <Paragraph
                      fontSize={moderateScale(13)}
                      lineHeight={moderateScale(20)}
                    >
                      • Verification: Order is being verified{"\n"}• QC: Quality
                      control in progress{"\n"}• Installation Schedule:
                      Installation date has been set{"\n"}• Completed: Order has
                      been fulfilled
                    </Paragraph>
                  </Accordion.Content>
                </Accordion.HeightAnimator>
              </Accordion.Item>
            </Accordion>
          </Card>

          <Card elevate>
            <Card.Header paddingBottom={moderateScale(8)}>
              <H5 fontSize={moderateScale(18)} marginBottom={moderateScale(4)}>
                Contact Support
              </H5>
              <Paragraph theme="alt2" fontSize={moderateScale(12)}>
                Still need help? Reach out to our support team
              </Paragraph>
            </Card.Header>
            <YStack padding={moderateScale(16)} gap={moderateScale(12)}>
              <XStack gap={moderateScale(12)}>
                <Button
                  flex={1}
                  onPress={() => handleContact("telegram")}
                  icon={MessageCircle}
                  theme="blue"
                >
                  Telegram
                </Button>
              </XStack>
            </YStack>
          </Card>

          <Card elevate>
            <Card.Header paddingBottom={moderateScale(8)}>
              <H5 fontSize={moderateScale(18)}>Support Hours</H5>
            </Card.Header>
            <YStack padding={moderateScale(16)} gap={moderateScale(8)}>
              <XStack justifyContent="space-between">
                <Paragraph fontSize={moderateScale(14)}>
                  Monday - Friday
                </Paragraph>
                <Paragraph fontWeight="600" fontSize={moderateScale(14)}>
                  08:00 - 17:00 WIB
                </Paragraph>
              </XStack>
              <XStack justifyContent="space-between">
                <Paragraph fontSize={moderateScale(14)}>
                  Saturday - Sunday
                </Paragraph>
                <Paragraph fontWeight="600" fontSize={moderateScale(14)}>
                  Closed
                </Paragraph>
              </XStack>
            </YStack>
          </Card>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}

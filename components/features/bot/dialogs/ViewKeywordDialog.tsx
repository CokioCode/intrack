import {
  Text,
  XStack,
  YStack,
  Button,
  Dialog,
  ScrollView,
  Image,
} from "tamagui";
import { X } from "@tamagui/lucide-icons";

interface ViewKeywordDialogProps {
  keyword: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ViewKeywordDialog = ({
  keyword,
  open,
  onOpenChange,
}: ViewKeywordDialogProps) => {
  return (
    <Dialog modal open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={["transform", "opacity"]}
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
          maxWidth={600}
          width="90%"
        >
          <Dialog.Title fontSize="$6" fontWeight="700" color="$gray12">
            View Keyword Details
          </Dialog.Title>

          <ScrollView maxHeight={500}>
            <YStack gap="$4">
              <YStack gap="$2">
                <Text
                  fontSize="$2"
                  color="$gray10"
                  textTransform="uppercase"
                  fontWeight="600"
                >
                  Keyword ID
                </Text>
                <Text fontSize="$3" fontWeight="500" color="$gray12">
                  {keyword.id}
                </Text>
              </YStack>

              <YStack gap="$2">
                <Text
                  fontSize="$2"
                  color="$gray10"
                  textTransform="uppercase"
                  fontWeight="600"
                >
                  Keywords
                </Text>
                <XStack gap="$2" flexWrap="wrap">
                  {keyword.keywords?.map((kw: string, idx: number) => (
                    <YStack
                      key={idx}
                      backgroundColor="$blue3"
                      paddingHorizontal="$3"
                      paddingVertical="$1.5"
                      borderRadius="$10"
                    >
                      <Text fontSize="$2" color="$blue11" fontWeight="500">
                        {kw}
                      </Text>
                    </YStack>
                  ))}
                </XStack>
              </YStack>

              {keyword.customInfo && (
                <>
                  <YStack gap="$2">
                    <Text
                      fontSize="$2"
                      color="$gray10"
                      textTransform="uppercase"
                      fontWeight="600"
                    >
                      Title
                    </Text>
                    <Text fontSize="$4" fontWeight="600" color="$gray12">
                      {keyword.customInfo.title}
                    </Text>
                  </YStack>

                  <YStack gap="$2">
                    <Text
                      fontSize="$2"
                      color="$gray10"
                      textTransform="uppercase"
                      fontWeight="600"
                    >
                      Description
                    </Text>
                    <Text fontSize="$3" color="$gray11" lineHeight={22}>
                      {keyword.customInfo.description}
                    </Text>
                  </YStack>

                  <YStack gap="$2">
                    <Text
                      fontSize="$2"
                      color="$gray10"
                      textTransform="uppercase"
                      fontWeight="600"
                    >
                      Category
                    </Text>
                    <Text fontSize="$3" color="$gray12" fontWeight="500">
                      {keyword.customInfo.category}
                    </Text>
                  </YStack>

                  <YStack gap="$2">
                    <Text
                      fontSize="$2"
                      color="$gray10"
                      textTransform="uppercase"
                      fontWeight="600"
                    >
                      Type
                    </Text>
                    <Text fontSize="$3" color="$gray12" fontWeight="500">
                      {keyword.customInfo.type}
                    </Text>
                  </YStack>

                  {keyword.customInfo.type === "TEXT" &&
                    keyword.customInfo.text && (
                      <YStack gap="$2">
                        <Text
                          fontSize="$2"
                          color="$gray10"
                          textTransform="uppercase"
                          fontWeight="600"
                        >
                          Content
                        </Text>
                        <YStack
                          backgroundColor="$gray2"
                          padding="$3"
                          borderRadius="$2"
                        >
                          <Text fontSize="$3" color="$gray12" lineHeight={22}>
                            {keyword.customInfo.text}
                          </Text>
                        </YStack>
                      </YStack>
                    )}

                  {keyword.customInfo.type === "FILE" &&
                    keyword.customInfo.file_url && (
                      <YStack gap="$2">
                        <Text
                          fontSize="$2"
                          color="$gray10"
                          textTransform="uppercase"
                          fontWeight="600"
                        >
                          File
                        </Text>
                        {keyword.customInfo.file_mime?.startsWith("image/") ? (
                          <Image
                            source={{ uri: keyword.customInfo.file_url }}
                            width="100%"
                            height={300}
                            borderRadius="$2"
                            resizeMode="contain"
                          />
                        ) : (
                          <YStack
                            backgroundColor="$gray2"
                            padding="$3"
                            borderRadius="$2"
                          >
                            <Text
                              fontSize="$3"
                              color="$blue10"
                              fontWeight="500"
                            >
                              📎 {keyword.customInfo.file_name}
                            </Text>
                            <Text fontSize="$2" color="$gray10" marginTop="$1">
                              {keyword.customInfo.file_mime}
                            </Text>
                          </YStack>
                        )}
                      </YStack>
                    )}
                </>
              )}

              {keyword.response && !keyword.customInfo && (
                <YStack gap="$2">
                  <Text
                    fontSize="$2"
                    color="$gray10"
                    textTransform="uppercase"
                    fontWeight="600"
                  >
                    Response
                  </Text>
                  <Text fontSize="$3" color="$gray11" lineHeight={22}>
                    {keyword.response}
                  </Text>
                </YStack>
              )}

              <YStack gap="$2">
                <Text
                  fontSize="$2"
                  color="$gray10"
                  textTransform="uppercase"
                  fontWeight="600"
                >
                  Created At
                </Text>
                <Text fontSize="$3" color="$gray11">
                  {new Date(keyword.createdAt).toLocaleString("id-ID")}
                </Text>
              </YStack>
            </YStack>
          </ScrollView>

          <XStack gap="$3" marginTop="$3" justifyContent="flex-end">
            <Dialog.Close displayWhenAdapted asChild>
              <Button
                backgroundColor="$gray5"
                color="$gray11"
                onPress={() => onOpenChange(false)}
                pressStyle={{ opacity: 0.8 }}
              >
                Close
              </Button>
            </Dialog.Close>
          </XStack>

          <Dialog.Close asChild>
            <Button
              position="absolute"
              top="$3"
              right="$3"
              size="$2"
              circular
              icon={<X size={16} />}
              chromeless
            />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

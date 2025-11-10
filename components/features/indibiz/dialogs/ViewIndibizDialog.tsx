import { X } from "@tamagui/lucide-icons";
import React from "react";
import {
  Dialog,
  YStack,
  XStack,
  Button,
  Text,
  Separator,
  ScrollView,
} from "tamagui";

const ViewIndibizDialog = ({
  open,
  setOpen,
  indibiz,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  indibiz: any;
}) => {
  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <YStack gap="$1.5">
      <Text
        fontSize="$2"
        fontWeight="600"
        color="$gray11"
        textTransform="uppercase"
        letterSpacing={0.5}
      >
        {label}
      </Text>
      <Text fontSize="$4" color="$gray12" lineHeight="$2">
        {value || "-"}
      </Text>
    </YStack>
  );

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          backgroundColor="$backgroundStrong"
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
          maxWidth={500}
          width="90%"
          padding="$0"
          borderRadius="$6"
          backgroundColor="$background"
        >
          <XStack
            paddingHorizontal="$5"
            paddingVertical="$4"
            alignItems="center"
            justifyContent="space-between"
            borderBottomWidth={1}
            borderBottomColor="$borderColor"
          >
            <Dialog.Title
              fontSize="$7"
              fontWeight="700"
              color="$gray12"
              margin="$0"
            >
              Detail Data
            </Dialog.Title>

            <Dialog.Close asChild>
              <Button
                size="$3"
                circular
                icon={<X size={18} />}
                chromeless
                hoverStyle={{
                  backgroundColor: "$gray4",
                }}
                pressStyle={{
                  backgroundColor: "$gray5",
                }}
              />
            </Dialog.Close>
          </XStack>

          <ScrollView maxHeight={500}>
            <YStack padding="$5" gap="$4">
              <YStack gap="$3">
                <Text
                  fontSize="$5"
                  fontWeight="700"
                  color="$gray12"
                  marginBottom="$2"
                >
                  Business Information
                </Text>

                <InfoRow label="Business Name" value={indibiz.name} />
                <InfoRow label="SC Number" value={indibiz.ao_number} />
                <InfoRow label="Status" value={indibiz.status} />
              </YStack>

              <Separator borderColor="$borderColor" />

              <YStack gap="$3">
                <Text
                  fontSize="$5"
                  fontWeight="700"
                  color="$gray12"
                  marginBottom="$2"
                >
                  Contact Person
                </Text>

                <InfoRow label="PIC Name" value={indibiz.pic_name} />
                <InfoRow
                  label="Place & Date of Birth"
                  value={indibiz.pic_birth_info}
                />
                <InfoRow label="ID Card Number" value={indibiz.id_number} />
              </YStack>

              <Separator borderColor="$borderColor" />

              <YStack gap="$3">
                <Text
                  fontSize="$5"
                  fontWeight="700"
                  color="$gray12"
                  marginBottom="$2"
                >
                  Contact Details
                </Text>

                <InfoRow label="Phone Number 1" value={indibiz.phone_primary} />
                <InfoRow
                  label="Phone Number 2"
                  value={indibiz.phone_secondary}
                />
                <InfoRow label="Email" value={indibiz.email} />
              </YStack>

              <Separator borderColor="$borderColor" />

              <YStack gap="$3">
                <Text
                  fontSize="$5"
                  fontWeight="700"
                  color="$gray12"
                  marginBottom="$2"
                >
                  Location
                </Text>

                <InfoRow label="Address" value={indibiz.address} />
                <InfoRow label="Coordinates" value={indibiz.coordinates} />
              </YStack>

              {indibiz.note && (
                <>
                  <Separator borderColor="$borderColor" />

                  <YStack gap="$3">
                    <Text
                      fontSize="$5"
                      fontWeight="700"
                      color="$gray12"
                      marginBottom="$2"
                    >
                      Notes
                    </Text>

                    <InfoRow
                      label="Additional Information"
                      value={indibiz.note}
                    />
                  </YStack>
                </>
              )}
            </YStack>
          </ScrollView>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default ViewIndibizDialog;

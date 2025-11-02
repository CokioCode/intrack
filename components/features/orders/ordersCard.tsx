import { useState } from "react";
import { Text, XStack, YStack, Button, Dialog } from "tamagui";
import { Calendar, User, Edit3, X } from "@tamagui/lucide-icons";

export const OrdersCard = ({
  orderId = "SC-202510146",
  date = "15 October 2025",
  technician = "Arifin",
  status = "PI",
  statusColor = "#8B5CF6",
  onEdit,
}: {
  orderId: string;
  date: string;
  technician: string;
  status: string;
  statusColor?: string;
  onEdit?: (orderId: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  const handleEdit = () => {
    setOpen(true);
    onEdit?.(orderId);
  };

  return (
    <>
      <XStack
        backgroundColor="white"
        borderRadius="$4"
        padding="$3.5"
        alignItems="center"
        marginBottom={5}
        justifyContent="space-between"
        shadowColor="$shadowColor"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.1}
        shadowRadius={4}
        elevation={2}
      >
        <YStack gap="$2" flex={1}>
          <Text fontSize="$5" fontWeight="600" color="$gray12">
            {orderId}
          </Text>

          <XStack gap="$2">
            <XStack alignItems="center" gap="$2">
              <Calendar size={14} color="$gray10" />
              <Text fontSize="$3" color="$gray10">
                {date}
              </Text>
            </XStack>

            <XStack alignItems="center" gap="$2">
              <User size={14} color="$gray10" />
              <Text fontSize="$3" color="$gray10">
                {technician}
              </Text>
            </XStack>
          </XStack>

          <Text fontSize="$2" color="$gray9" marginTop="$1">
            Status updated from FCC to PI (technician is on the way for
            installation).
          </Text>
        </YStack>

        <Button
          icon={<Edit3 size={18} />}
          backgroundColor="$blue9"
          color="white"
          paddingHorizontal="$3"
          paddingVertical="$2.5"
          borderRadius="$3"
          onPress={handleEdit}
          pressStyle={{
            opacity: 0.8,
            scale: 0.98,
          }}
        />
      </XStack>

      <Dialog modal open={open} onOpenChange={setOpen}>
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
            maxWidth={500}
            width="90%"
          >
            <Dialog.Title fontSize="$6" fontWeight="700" color="$gray12">
              Edit Order
            </Dialog.Title>

            <Dialog.Description fontSize="$3" color="$gray10">
              {orderId}
            </Dialog.Description>

            <YStack gap="$4">
              <XStack alignItems="center" gap="$2">
                <Text fontSize="$4" fontWeight="600" color="$gray11">
                  Current Status:
                </Text>
                <XStack
                  backgroundColor={statusColor}
                  paddingHorizontal="$3"
                  paddingVertical="$1.5"
                  borderRadius="$2"
                >
                  <Text fontSize="$3" fontWeight="600" color="white">
                    {status}
                  </Text>
                </XStack>
              </XStack>

              <YStack
                gap="$3"
                padding="$4"
                backgroundColor="$gray2"
                borderRadius="$3"
              >
                <XStack justifyContent="space-between">
                  <Text fontSize="$3" color="$gray10">
                    Date:
                  </Text>
                  <Text fontSize="$3" fontWeight="600" color="$gray12">
                    {date}
                  </Text>
                </XStack>
                <XStack justifyContent="space-between">
                  <Text fontSize="$3" color="$gray10">
                    Technician:
                  </Text>
                  <Text fontSize="$3" fontWeight="600" color="$gray12">
                    {technician}
                  </Text>
                </XStack>
              </YStack>

              <Text
                fontSize="$3"
                color="$gray10"
                textAlign="center"
                marginTop="$2"
              >
                Add your edit form components here
              </Text>
            </YStack>

            <XStack gap="$3" marginTop="$3" justifyContent="flex-end">
              <Dialog.Close displayWhenAdapted asChild>
                <Button
                  backgroundColor="$gray5"
                  color="$gray11"
                  onPress={() => setOpen(false)}
                  pressStyle={{ opacity: 0.8 }}
                >
                  Cancel
                </Button>
              </Dialog.Close>

              <Button
                backgroundColor="$blue9"
                color="white"
                onPress={() => {
                  setOpen(false);
                }}
                pressStyle={{ opacity: 0.8 }}
              >
                Save Changes
              </Button>
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
    </>
  );
};

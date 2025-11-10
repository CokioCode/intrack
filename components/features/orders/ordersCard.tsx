import { Text, XStack, YStack, Button } from "tamagui";
import { Calendar, User, Edit3 } from "@tamagui/lucide-icons";

export const OrdersCard = ({
  orderId = "SC-202510146",
  date = "15 October 2025",
  technician = "Arifin",
  onEdit,
}: {
  orderId: string;
  date: string;
  technician: string;
  status: string;
  statusColor?: string;
  onEdit?: (orderId: string) => void;
}) => {
  const handleEdit = () => {
    onEdit?.(orderId);
  };

  return (
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
  );
};

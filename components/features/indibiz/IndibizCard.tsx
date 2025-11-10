import { YStack, XStack, Text, Button } from "tamagui";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Building2,
  IdCard,
} from "@tamagui/lucide-icons";
import ViewIndibizDialog from "./dialogs/ViewIndibizDialog";
import { useState } from "react";

interface Region {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

interface Agency {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

interface Sales {
  id: string;
  name: string;
  code: string;
  email: string;
  status: string;
  region_id: string;
  agency_id: string;
  created_at: string;
  updated_at: string;
  agency: Agency;
  region: Region;
}

interface IndibizData {
  id: string;
  name: string;
  phone_primary: string;
  phone_secondary: string;
  address: string;
  pic_name: string;
  pic_birth_info: string;
  id_number: string;
  email: string;
  ao_number: string;
  status: string;
  description: string | null;
  is_sync: boolean;
  created_at: string;
  updated_at: string;
  region_id: string;
  sales_id: string;
  sales: Sales;
  region: Region;
}

interface IndibizCardProps {
  information: IndibizData;
}

export function IndibizCard({ information }: IndibizCardProps) {
  const [open, setOpen] = useState(false);
  return (
    <YStack
      backgroundColor="white"
      borderRadius="$3"
      padding="$4"
      gap="$3"
      shadowColor="rgba(0,0,0,0.08)"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.15}
      shadowRadius={4}
      elevationAndroid={3}
    >
      <XStack justifyContent="space-between" alignItems="flex-start" gap="$3">
        <YStack flex={1} gap="$1">
          <Text
            fontSize={16}
            fontWeight="600"
            color="#1a1a1a"
            numberOfLines={2}
          >
            {information.name}
          </Text>
          <XStack gap="$2" alignItems="center">
            <Text fontSize={12} color="#6b7280">
              AO: {information.ao_number}
            </Text>
            <Text fontSize={12} color="#6b7280">
              •
            </Text>
            <Text
              fontSize={12}
              fontWeight="500"
              color={information.status === "PI" ? "#10b981" : "#6b7280"}
            >
              {information.status}
            </Text>
          </XStack>
        </YStack>

        <Button
          size="$2"
          backgroundColor="#6366f1"
          color="white"
          borderRadius="$2"
          paddingHorizontal="$3.5"
          paddingVertical="$1.5"
          fontSize={13}
          fontWeight="500"
          pressStyle={{ opacity: 0.85, scale: 0.98 }}
          onPress={() => setOpen(true)}
        >
          Detail
        </Button>
      </XStack>

      <YStack gap="$2.5">
        <XStack gap="$2.5" alignItems="center">
          <User size={15} color="#6b7280" />
          <Text fontSize={14} color="#374151" flex={1}>
            {information.pic_name} • {information.pic_birth_info}
          </Text>
        </XStack>

        <XStack gap="$2.5" alignItems="center">
          <MapPin size={15} color="#6b7280" />
          <Text fontSize={14} color="#374151" flex={1}>
            {information.region.name}
          </Text>
        </XStack>

        <XStack gap="$2.5" alignItems="center">
          <Mail size={15} color="#6b7280" />
          <Text fontSize={14} color="#6366f1" flex={1} numberOfLines={1}>
            {information.email}
          </Text>
        </XStack>
      </YStack>
      <ViewIndibizDialog open={open} setOpen={setOpen} indibiz={information} />
    </YStack>
  );
}

export const InformationCard = IndibizCard;

import { X } from "@tamagui/lucide-icons";
import { Button, Label, Text, XStack, YStack } from "tamagui";

interface KeywordTagsListProps {
  keywords: string[];
  onRemove: (index: number) => void;
}

export const KeywordTagsList = ({
  keywords,
  onRemove,
}: KeywordTagsListProps) => {
  return (
    <YStack gap="$2">
      <Label fontSize="$2" color="$gray10">
        Keywords ({keywords.length})
      </Label>
      <XStack gap="$2" flexWrap="wrap">
        {keywords.map((keyword, index) => (
          <XStack
            key={index}
            backgroundColor="$blue3"
            paddingHorizontal="$3"
            paddingVertical="$1.5"
            borderRadius="$10"
            alignItems="center"
            gap="$2"
          >
            <Text fontSize="$2" color="$blue11" fontWeight="500">
              {keyword}
            </Text>
            <Button
              size="$1"
              circular
              chromeless
              icon={<X size={14} />}
              onPress={() => onRemove(index)}
            />
          </XStack>
        ))}
      </XStack>
    </YStack>
  );
};

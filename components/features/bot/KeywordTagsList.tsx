import { X } from "@tamagui/lucide-icons";
import { XStack, YStack, Text, Button } from "tamagui";

interface KeywordTagsListProps {
  keywords: (string | any)[];
  onRemove: (index: number) => void;
}

export const KeywordTagsList = ({
  keywords,
  onRemove,
}: KeywordTagsListProps) => {
  return (
    <XStack flexWrap="wrap" gap="$2">
      {keywords.map((keyword, index) => {
        // Handle both string and object formats
        const keywordText =
          typeof keyword === "string"
            ? keyword
            : keyword?.keywords || keyword?.text || String(keyword);

        return (
          <XStack
            key={index}
            backgroundColor="$blue2"
            paddingHorizontal="$3"
            paddingVertical="$1.5"
            borderRadius="$6"
            alignItems="center"
            gap="$2"
          >
            <Text fontSize="$2" color="$blue11" fontWeight="500">
              {keywordText}
            </Text>
            <Button
              size="$1"
              circular
              chromeless
              icon={<X size={14} color="$blue11" />}
              onPress={() => onRemove(index)}
              pressStyle={{ opacity: 0.6 }}
            />
          </XStack>
        );
      })}
    </XStack>
  );
};

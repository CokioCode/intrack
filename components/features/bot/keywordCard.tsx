import { useState } from "react";
import { Text, XStack, YStack, Button, Separator } from "tamagui";
import { Eye, Edit3, Trash2 } from "@tamagui/lucide-icons";
import { ViewKeywordDialog } from "./dialogs/ViewKeywordDialog";
import { EditKeywordDialog } from "./dialogs/EditKeywordDialog";
import { DeleteKeywordDialog } from "./dialogs/DeleteKeywordDialog";

export const KeywordCard = ({
  keyword,
  onView,
  onEdit,
  onDelete,
}: {
  keyword: any;
  onView?: (keywordId: string) => void;
  onEdit?: (keywordId: string) => void;
  onDelete?: (keywordId: string) => void;
}) => {
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const title =
    keyword.customInfo?.title || keyword.keywords?.join(", ") || "No Title";
  const description =
    keyword.customInfo?.description || keyword.response || "No Description";
  const category = keyword.customInfo?.category || "GENERAL";
  const type = keyword.customInfo?.type || "TEXT";

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "PAKET":
        return "#E0F2FE";
      case "PROMO":
        return "#FFE5B4";
      case "INFO":
        return "#E0F7E9";
      default:
        return "#F3F4F6";
    }
  };

  const statusColor = getCategoryColor(category);

  return (
    <>
      <YStack
        backgroundColor="white"
        borderRadius="$3"
        borderWidth={1}
        borderColor="$gray4"
        overflow="hidden"
        marginBottom="$3"
      >
        <YStack backgroundColor={statusColor} padding="$3">
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize="$4" fontWeight="600" color="$gray12">
              {title}
            </Text>
            <Text fontSize="$2" color="$gray10" fontWeight="500">
              {category}
            </Text>
          </XStack>
          <Text fontSize="$2" color="$gray10" marginTop="$1">
            Keywords: {keyword.keywords?.join(", ")}
          </Text>
        </YStack>

        <YStack padding="$3" gap="$3">
          <Text fontSize="$3" color="$gray11" lineHeight={20} numberOfLines={3}>
            {description}
          </Text>

          {type === "FILE" && keyword.customInfo?.file_url && (
            <XStack
              backgroundColor="$gray3"
              padding="$2"
              borderRadius="$2"
              alignItems="center"
              gap="$2"
            >
              <Text fontSize="$2" color="$gray11">
                📎{" "}
                {keyword.customInfo.file_mime?.split("/")[1]?.toUpperCase() ||
                  "FILE"}
              </Text>
            </XStack>
          )}

          <Separator />

          <XStack gap="$2" justifyContent="flex-end">
            <Button
              icon={<Eye size={18} />}
              backgroundColor="transparent"
              borderWidth={1}
              borderColor="$gray7"
              color="$gray11"
              size="$3"
              circular
              padding="$2"
              onPress={() => {
                setViewOpen(true);
                onView?.(keyword.id);
              }}
              pressStyle={{ opacity: 0.7, backgroundColor: "$gray3" }}
            />

            <Button
              icon={<Edit3 size={18} />}
              backgroundColor="transparent"
              borderWidth={1}
              borderColor="$gray7"
              color="$gray11"
              size="$3"
              circular
              padding="$2"
              onPress={() => {
                setEditOpen(true);
                onEdit?.(keyword.id);
              }}
              pressStyle={{ opacity: 0.7, backgroundColor: "$gray3" }}
            />

            <Button
              icon={<Trash2 size={18} />}
              backgroundColor="transparent"
              borderWidth={1}
              borderColor="$red7"
              color="$red10"
              size="$3"
              circular
              padding="$2"
              onPress={() => {
                setDeleteOpen(true);
                onDelete?.(keyword.id);
              }}
              pressStyle={{ opacity: 0.7, backgroundColor: "$red3" }}
            />
          </XStack>
        </YStack>
      </YStack>

      <ViewKeywordDialog
        keyword={keyword}
        open={viewOpen}
        onOpenChange={setViewOpen}
      />

      <EditKeywordDialog
        keyword={keyword}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <DeleteKeywordDialog
        keyword={keyword}
        title={title}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
};

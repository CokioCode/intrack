import { memo, useState, useCallback } from "react";
import { Text, XStack, YStack, Button, Separator } from "tamagui";
import { Eye, Edit3, Trash2 } from "@tamagui/lucide-icons";
import { ViewKeywordDialog } from "./dialogs/ViewKeywordDialog";
import { EditKeywordDialog } from "./dialogs/EditKeywordDialog";
import { DeleteKeywordDialog } from "./dialogs/DeleteKeywordDialog";

type KeywordCardProps = {
  keyword: {
    id: string;
    keywords?: string[];
    response?: string;
    customInfo?: {
      title?: string;
      description?: string;
      category?: string;
      type?: string;
      file_url?: string;
      file_mime?: string;
    };
  };
  onView?: (keywordId: string) => void;
  onEdit?: (keywordId: string) => void;
  onDelete?: (keywordId: string) => void;
};

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

const ActionButton = memo(
  ({
    icon,
    onPress,
    color = "$gray11",
    borderColor = "$gray7",
    bgColor = "$gray3",
  }: {
    icon: React.ReactNode;
    onPress: () => void;
    color?: string;
    borderColor?: string;
    bgColor?: string;
  }) => (
    <Button
      icon={icon as any}
      backgroundColor="transparent"
      borderWidth={1}
      borderColor={borderColor}
      color={color}
      size="$3"
      circular
      padding="$2"
      onPress={onPress}
      pressStyle={{ opacity: 0.7, backgroundColor: bgColor }}
    />
  )
);

const KeywordCardComponent = ({ keyword, onView, onEdit, onDelete }: KeywordCardProps) => {
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { customInfo, keywords = [], response } = keyword;
  const title = customInfo?.title || keywords.join(", ") || "No Title";
  const description = customInfo?.description || response || "No Description";
  const category = customInfo?.category || "GENERAL";
  const type = customInfo?.type || "TEXT";
  const statusColor = getCategoryColor(category);

    const handleViewClick = useCallback(() => {
      setViewOpen(true);
      onView?.(keyword.id);
    }, [keyword.id, onView]);

    const handleEditClick = useCallback(() => {
      setEditOpen(true);
      onEdit?.(keyword.id);
    }, [keyword.id, onEdit]);

    const handleDeleteClick = useCallback(() => {
      setDeleteOpen(true);
      onDelete?.(keyword.id);
    }, [keyword.id, onDelete]);

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
              <Text
                fontSize="$4"
                fontWeight="600"
                color="$gray12"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {title}
              </Text>
              <Text fontSize="$2" color="$gray10" fontWeight="500">
                {category}
              </Text>
            </XStack>
            <Text
              fontSize="$2"
              color="$gray10"
              marginTop="$1"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Keywords: {keywords.join(", ")}
            </Text>
          </YStack>

          <YStack padding="$3" gap="$3">
            <Text
              fontSize="$3"
              color="$gray11"
              lineHeight={20}
              numberOfLines={3}
            >
              {description}
            </Text>

            {type === "FILE" && customInfo?.file_url && (
              <XStack
                backgroundColor="$gray3"
                padding="$2"
                borderRadius="$2"
                alignItems="center"
                gap="$2"
              >
                <Text fontSize="$2" color="$gray11" numberOfLines={1}>
                  📎{" "}
                  {customInfo.file_mime?.split("/")[1]?.toUpperCase() || "FILE"}
                </Text>
              </XStack>
            )}

            <Separator />

            <XStack gap="$2" justifyContent="flex-end">
              <ActionButton
                icon={<Eye size={18} />}
                onPress={handleViewClick}
              />
              <ActionButton
                icon={<Edit3 size={18} />}
                onPress={handleEditClick}
              />
              <ActionButton
                icon={<Trash2 size={18} />}
                onPress={handleDeleteClick}
                color="$red10"
                borderColor="$red7"
                bgColor="$red3"
              />
            </XStack>
          </YStack>
        </YStack>

        {viewOpen && (
          <ViewKeywordDialog
            keyword={keyword}
            open={viewOpen}
            onOpenChange={setViewOpen}
          />
        )}

        {editOpen && (
          <EditKeywordDialog
            keyword={keyword}
            open={editOpen}
            onOpenChange={setEditOpen}
          />
        )}

        {deleteOpen && (
          <DeleteKeywordDialog
            keyword={keyword}
            title={title}
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
          />
        )}
      </>
    );
  };

const MemoizedKeywordCard = memo(KeywordCardComponent);
MemoizedKeywordCard.displayName = 'KeywordCard';

export { MemoizedKeywordCard as KeywordCard };

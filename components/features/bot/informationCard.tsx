import { useState } from "react";
import {
  Text,
  XStack,
  YStack,
  Button,
  Dialog,
  ScrollView,
  Separator,
  Image,
} from "tamagui";
import { Eye, Edit3, Trash2, X } from "@tamagui/lucide-icons";

export const InformationCard = ({
  information,
  onView,
  onEdit,
  onDelete,
}: {
  information: any;
  onView?: (infoId: string) => void;
  onEdit?: (infoId: string) => void;
  onDelete?: (infoId: string) => void;
}) => {
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const title = information.title || "No Title";
  const description = information.description || "No Description";
  const category = information.category || "GENERAL";
  const type = information.type || "TEXT";

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

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const isActive = () => {
    if (!information.start_date || !information.end_date) return true;
    const now = new Date();
    const start = new Date(information.start_date);
    const end = new Date(information.end_date);
    return now >= start && now <= end;
  };

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
            <XStack gap="$2" alignItems="center">
              {!isActive() && (
                <Text
                  fontSize="$1"
                  color="$gray10"
                  backgroundColor="$gray5"
                  paddingHorizontal="$2"
                  paddingVertical="$1"
                  borderRadius="$2"
                  fontWeight="500"
                >
                  EXPIRED
                </Text>
              )}
              <Text fontSize="$2" color="$gray10" fontWeight="500">
                {category}
              </Text>
            </XStack>
          </XStack>
          {information.start_date && information.end_date && (
            <Text fontSize="$2" color="$gray10" marginTop="$1">
              📅 {formatDate(information.start_date)} -{" "}
              {formatDate(information.end_date)}
            </Text>
          )}
        </YStack>

        <YStack padding="$3" gap="$3">
          <Text fontSize="$3" color="$gray11" lineHeight={20} numberOfLines={3}>
            {description}
          </Text>

          {type === "FILE" && information.file_url && (
            <XStack
              backgroundColor="$gray3"
              padding="$2"
              borderRadius="$2"
              alignItems="center"
              gap="$2"
            >
              <Text fontSize="$2" color="$gray11">
                📎{" "}
                {information.file_mime?.split("/")[1]?.toUpperCase() || "FILE"}
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
                onView?.(information.id);
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
                onEdit?.(information.id);
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
                onDelete?.(information.id);
              }}
              pressStyle={{ opacity: 0.7, backgroundColor: "$red3" }}
            />
          </XStack>
        </YStack>
      </YStack>

      <Dialog modal open={viewOpen} onOpenChange={setViewOpen}>
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
              View Information Details
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
                    Title
                  </Text>
                  <Text fontSize="$4" fontWeight="600" color="$gray12">
                    {information.title}
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
                    {information.description}
                  </Text>
                </YStack>

                <XStack gap="$4">
                  <YStack gap="$2" flex={1}>
                    <Text
                      fontSize="$2"
                      color="$gray10"
                      textTransform="uppercase"
                      fontWeight="600"
                    >
                      Category
                    </Text>
                    <Text fontSize="$3" color="$gray12" fontWeight="500">
                      {information.category}
                    </Text>
                  </YStack>

                  <YStack gap="$2" flex={1}>
                    <Text
                      fontSize="$2"
                      color="$gray10"
                      textTransform="uppercase"
                      fontWeight="600"
                    >
                      Type
                    </Text>
                    <Text fontSize="$3" color="$gray12" fontWeight="500">
                      {information.type}
                    </Text>
                  </YStack>
                </XStack>

                {information.start_date && information.end_date && (
                  <YStack gap="$2">
                    <Text
                      fontSize="$2"
                      color="$gray10"
                      textTransform="uppercase"
                      fontWeight="600"
                    >
                      Period
                    </Text>
                    <XStack gap="$2" alignItems="center">
                      <Text fontSize="$3" color="$gray12">
                        {formatDate(information.start_date)}
                      </Text>
                      <Text fontSize="$3" color="$gray10">
                        →
                      </Text>
                      <Text fontSize="$3" color="$gray12">
                        {formatDate(information.end_date)}
                      </Text>
                      {!isActive() && (
                        <Text
                          fontSize="$2"
                          color="$red10"
                          backgroundColor="$red3"
                          paddingHorizontal="$2"
                          paddingVertical="$1"
                          borderRadius="$2"
                          fontWeight="500"
                        >
                          EXPIRED
                        </Text>
                      )}
                    </XStack>
                  </YStack>
                )}

                {information.type === "TEXT" && information.text && (
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
                        {information.text}
                      </Text>
                    </YStack>
                  </YStack>
                )}

                {information.type === "FILE" && information.file_url && (
                  <YStack gap="$2">
                    <Text
                      fontSize="$2"
                      color="$gray10"
                      textTransform="uppercase"
                      fontWeight="600"
                    >
                      File
                    </Text>
                    {information.file_mime?.startsWith("image/") ? (
                      <Image
                        source={{ uri: information.file_url }}
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
                        <Text fontSize="$3" color="$blue10" fontWeight="500">
                          📎 {information.file_name}
                        </Text>
                        <Text fontSize="$2" color="$gray10" marginTop="$1">
                          {information.file_mime}
                        </Text>
                      </YStack>
                    )}
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
                    {new Date(information.created_at).toLocaleString("id-ID")}
                  </Text>
                </YStack>

                {information.updated_at && (
                  <YStack gap="$2">
                    <Text
                      fontSize="$2"
                      color="$gray10"
                      textTransform="uppercase"
                      fontWeight="600"
                    >
                      Last Updated
                    </Text>
                    <Text fontSize="$3" color="$gray11">
                      {new Date(information.updated_at).toLocaleString("id-ID")}
                    </Text>
                  </YStack>
                )}
              </YStack>
            </ScrollView>

            <XStack gap="$3" marginTop="$3" justifyContent="flex-end">
              <Dialog.Close displayWhenAdapted asChild>
                <Button
                  backgroundColor="$gray5"
                  color="$gray11"
                  onPress={() => setViewOpen(false)}
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

      <Dialog modal open={editOpen} onOpenChange={setEditOpen}>
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
              Edit Information
            </Dialog.Title>

            <Dialog.Description fontSize="$3" color="$gray10">
              {information.id}
            </Dialog.Description>

            <ScrollView maxHeight={400}>
              <YStack gap="$4">
                <Text
                  fontSize="$3"
                  color="$gray10"
                  textAlign="center"
                  marginTop="$2"
                >
                  Add your information edit form components here
                </Text>
              </YStack>
            </ScrollView>

            <XStack gap="$3" marginTop="$3" justifyContent="flex-end">
              <Dialog.Close displayWhenAdapted asChild>
                <Button
                  backgroundColor="$gray5"
                  color="$gray11"
                  onPress={() => setEditOpen(false)}
                  pressStyle={{ opacity: 0.8 }}
                >
                  Cancel
                </Button>
              </Dialog.Close>

              <Button
                backgroundColor="$blue9"
                color="white"
                onPress={() => {
                  setEditOpen(false);
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

      <Dialog modal open={deleteOpen} onOpenChange={setDeleteOpen}>
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
            maxWidth={450}
            width="90%"
          >
            <Dialog.Title fontSize="$6" fontWeight="700" color="$red10">
              Delete Information
            </Dialog.Title>

            <Dialog.Description fontSize="$4" color="$gray11" lineHeight={22}>
              Are you sure you want to delete information "{title}" (
              {information.id.substring(0, 8)}...)? This action cannot be
              undone.
            </Dialog.Description>

            <XStack gap="$3" marginTop="$3" justifyContent="flex-end">
              <Dialog.Close displayWhenAdapted asChild>
                <Button
                  backgroundColor="$gray5"
                  color="$gray11"
                  onPress={() => setDeleteOpen(false)}
                  pressStyle={{ opacity: 0.8 }}
                >
                  Cancel
                </Button>
              </Dialog.Close>

              <Button
                backgroundColor="$red9"
                color="white"
                onPress={() => {
                  setDeleteOpen(false);
                }}
                pressStyle={{ opacity: 0.8 }}
              >
                Delete
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

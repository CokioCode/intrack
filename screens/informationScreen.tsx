import { SearchInput } from "@/components/common/SearchInput";
import { AddInformationDialog } from "@/components/features/bot/dialogs/AddInformationDialog";
import { InformationCard } from "@/components/features/bot/informationCard";
import { AdminLayouts } from "@/components/layouts/adminLayouts";
import { useInformationQuery } from "@/hooks/useInformation";
import { useInformationStore } from "@/stores/informationStore";
import { FlashList } from "@shopify/flash-list";
import { Plus } from "@tamagui/lucide-icons";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, XStack, YStack } from "tamagui";

const InformationScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const setSearchQuery = useInformationStore((state) => state.setSearchQuery);

  const {
    data,
    isLoading,
    isError,
    loadMore,
    refresh,
    isFetchingMore,
    isRefreshing,
  } = useInformationQuery();

  const handleSearch = () => setSearchQuery(searchText);

  const handleView = (keywordId: string) => {
    console.log("View keyword:", keywordId);
  };

  const handleEdit = (keywordId: string) => {
    console.log("Edit keyword:", keywordId);
  };

  const handleDelete = async (keywordId: string) => {
    console.log("Delete keyword:", keywordId);
  };
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <AdminLayouts
        variant="settings"
        title="Bot Management"
        subtitle="Monitor and control bots"
      >
        <YStack flex={1} padding="$4" gap="$4">
          <XStack width="100%" alignItems="center" space="$2">
            <XStack flex={1}>
              <SearchInput
                value={searchText}
                onChange={setSearchText}
                onSearch={handleSearch}
                placeholder="Search keywords..."
                variant="default"
              />
            </XStack>

            <Button
              icon={<Plus size={18} />}
              backgroundColor="$blue9"
              color="white"
              onPress={() => setAddDialogOpen(true)}
              pressStyle={{ opacity: 0.8 }}
            />
          </XStack>

          <YStack flex={1}>
            <FlashList
              data={data}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              renderItem={({ item }) => (
                <InformationCard
                  information={item}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
              contentContainerStyle={{
                paddingBottom: 24,
              }}
              onEndReached={loadMore}
              onEndReachedThreshold={0.5}
              onRefresh={refresh}
              refreshing={isRefreshing}
              ItemSeparatorComponent={() => <YStack height={12} />}
              ListFooterComponent={
                isFetchingMore ? (
                  <YStack padding="$4" alignItems="center">
                    <ActivityIndicator size="small" color="#3B82F6" />
                  </YStack>
                ) : null
              }
              ListEmptyComponent={
                <YStack alignItems="center" marginTop="$10">
                  <Text color="$gray10">No keywords found</Text>
                </YStack>
              }
            />
          </YStack>
        </YStack>
      </AdminLayouts>

      <AddInformationDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
      />
    </SafeAreaView>
  );
};

export default InformationScreen;

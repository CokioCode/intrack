import { SearchInput } from "@/components/common/SearchInput";
import { KeywordCard } from "@/components/features/bot/keywordCard";
import { AdminLayouts } from "@/components/layouts/adminLayouts";
import { useKeywordQuery } from "@/hooks/useKeyword";
import { useKeywordStore } from "@/stores/keywordStore";
import { FlashList } from "@shopify/flash-list";
import { Plus } from "@tamagui/lucide-icons";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, XStack, YStack } from "tamagui";
import { AddKeywordDialog } from "@/components/features/bot/dialogs/AddKeywordDialog";
import { useKeywordActions } from "@/hooks/actions/useKeywordActions";

const KeywordScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const setSearchQuery = useKeywordStore((state) => state.setSearchQuery);

  const { data, isLoading, loadMore, refresh, isFetchingMore, isRefreshing } =
    useKeywordQuery();

  const { handleView, handleEdit, handleDelete } = useKeywordActions();

  const handleSearch = () => setSearchQuery(searchText);

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
            {isLoading ? (
              <YStack flex={1} justifyContent="center" alignItems="center">
                <ActivityIndicator size="large" color="#3B82F6" />
              </YStack>
            ) : (
              <FlashList
                data={data}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderItem={({ item }) => (
                  <KeywordCard
                    keyword={item}
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
            )}
          </YStack>
        </YStack>
      </AdminLayouts>

      <AddKeywordDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />
    </SafeAreaView>
  );
};

export default KeywordScreen;

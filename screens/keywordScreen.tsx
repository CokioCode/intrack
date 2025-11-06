import { memo, useCallback, useMemo, useState } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { Plus } from "@tamagui/lucide-icons";
import { Button, Text, XStack, YStack } from "tamagui";

import { SearchInput } from "@/components/common/SearchInput";
import { KeywordCard } from "@/components/features/bot/keywordCard";
import { AddKeywordDialog } from "@/components/features/bot/dialogs/AddKeywordDialog";
import { AdminLayouts } from "@/components/layouts/adminLayouts";
import { useKeywordQuery } from "@/hooks/useKeyword";
import { useKeywordActions } from "@/hooks/actions/useKeywordActions";
import { useKeywordStore } from "@/stores/keywordStore";

type KeywordItem = {
  id: string;
};

const LoadingState = memo(() => {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const minHeight = SCREEN_HEIGHT * 0.55;

  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      minHeight={minHeight}
    >
      <ActivityIndicator size="large" color="#3B82F6" />
      <Text marginTop="$4" color="$gray10" fontSize={14}>
        Loading keywords...
      </Text>
    </YStack>
  );
});

LoadingState.displayName = "LoadingState";

const EmptyState = memo(() => {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const minHeight = SCREEN_HEIGHT * 0.55;

  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      minHeight={minHeight}
    >
      <Text color="$gray10" fontSize={14}>
        No keywords found
      </Text>
    </YStack>
  );
});

EmptyState.displayName = "EmptyState";

const LoadingFooter = memo(() => (
  <YStack padding="$4" alignItems="center">
    <ActivityIndicator size="small" color="#3B82F6" />
  </YStack>
));

LoadingFooter.displayName = "LoadingFooter";

const ItemSeparator = memo(() => <YStack height={12} />);
ItemSeparator.displayName = "ItemSeparator";

const KeywordScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const setSearchQuery = useKeywordStore((state) => state.setSearchQuery);
  const { data, isLoading, loadMore, refresh, isFetchingMore, isRefreshing } =
    useKeywordQuery();
  const { handleView, handleEdit, handleDelete } = useKeywordActions();

  const handleSearch = useCallback(() => {
    const query = searchText.trim();
    setSearchQuery(query);
  }, [searchText, setSearchQuery]);

  const handleChange = useCallback(
    (text: string) => {
      setSearchText(text);

      if (text === "") {
        setSearchQuery("");
      }
    },
    [setSearchQuery]
  );

  const handleRefresh = useCallback(() => {
    setSearchText("");
    setSearchQuery("");
    refresh();
  }, [setSearchQuery, refresh]);

  const renderItem = useCallback(
    ({ item }: { item: KeywordItem }) => (
      <KeywordCard
        keyword={item}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ),
    [handleView, handleEdit, handleDelete]
  );

  const keyExtractor = useCallback((item: KeywordItem) => item.id, []);

  const contentContainerStyle = useMemo(
    () => ({
      paddingBottom: 24,
    }),
    []
  );

  const listFooter = useMemo(
    () => (isFetchingMore ? <LoadingFooter /> : null),
    [isFetchingMore]
  );

  const listEmpty = useMemo(
    () => (!isLoading ? <EmptyState /> : null),
    [isLoading]
  );

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <AdminLayouts
        variant="settings"
        title="Bot Management"
        subtitle="Monitor and control bots"
      >
        <YStack flex={1} paddingHorizontal="$4" paddingTop="$4">
          <XStack width="100%" alignItems="center" space="$2" marginBottom="$2">
            <XStack flex={1}>
              <SearchInput
                value={searchText}
                onChange={handleChange}
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
              <LoadingState />
            ) : (
              <FlashList
                data={data}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                contentContainerStyle={contentContainerStyle}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                onRefresh={handleRefresh}
                refreshing={isRefreshing}
                removeClippedSubviews={true}
                ItemSeparatorComponent={ItemSeparator}
                ListFooterComponent={listFooter}
                ListEmptyComponent={listEmpty}
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

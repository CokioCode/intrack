import { memo, useCallback, useEffect, useMemo, useState } from "react";
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
import { useKeywordStore } from "@/stores/keywordStore";
import Pagination from "@/components/common/Pagination";

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

const ErrorState = memo(({ onRetry }: { onRetry: () => void }) => {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const minHeight = SCREEN_HEIGHT * 0.55;

  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      minHeight={minHeight}
      gap={8}
    >
      <Text color="$red10" fontSize={16} fontWeight="600">
        Error loading keywords
      </Text>
      <Text
        color="$blue10"
        fontSize={14}
        onPress={onRetry}
        textDecorationLine="underline"
      >
        Tap to retry
      </Text>
    </YStack>
  );
});

ErrorState.displayName = "ErrorState";

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

const ItemSeparator = memo(() => <YStack height={12} />);
ItemSeparator.displayName = "ItemSeparator";

const KeywordScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const setSearchQuery = useKeywordStore((state) => state.setSearchQuery);

  const { data, totalPages, isLoading, isError, refresh, isRefreshing } =
    useKeywordQuery(currentPage, itemsPerPage);

  const handleSearch = useCallback(() => {
    const query = searchText.trim();
    setSearchQuery(query);
    setCurrentPage(1);
  }, [searchText, setSearchQuery]);

  const handleChange = useCallback(
    (text: string) => {
      setSearchText(text);

      if (text === "") {
        setSearchQuery("");
        setCurrentPage(1);
      }
    },
    [setSearchQuery]
  );

  const handleRefresh = useCallback(() => {
    setSearchText("");
    setSearchQuery("");
    setCurrentPage(1);
    refresh();
  }, [setSearchQuery, refresh]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleItemsPerPageChange = useCallback((items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  }, []);

  const handleAdd = useCallback(() => {
    setAddDialogOpen(true);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: KeywordItem }) => <KeywordCard keyword={item} />,
    []
  );

  const keyExtractor = useCallback((item: KeywordItem) => item.id, []);

  const contentContainerStyle = useMemo(
    () => ({
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 16,
    }),
    []
  );

  const listEmpty = useMemo(
    () => (!isLoading ? <EmptyState /> : null),
    [isLoading]
  );

  const searchContent = useMemo(
    () => (
      <XStack width="100%" alignItems="center" space="$2">
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
          onPress={handleAdd}
          pressStyle={{ opacity: 0.8 }}
        />
      </XStack>
    ),
    [searchText, handleChange, handleSearch, handleAdd]
  );

  const paginationContent = useMemo(
    () => (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    ),
    [
      currentPage,
      totalPages,
      handlePageChange,
      itemsPerPage,
      handleItemsPerPageChange,
    ]
  );

  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      <AdminLayouts
        variant="settings"
        title="Bot Management"
        subtitle="Monitor and control bots"
        showFixedSearch={!isLoading && !isError}
        fixedSearchContent={searchContent}
        showFixedPagination={!isLoading && !isError && data.length > 0}
        fixedPaginationContent={paginationContent}
      >
        {isLoading ? (
          <LoadingState />
        ) : isError ? (
          <ErrorState onRetry={refresh} />
        ) : (
          <FlashList
            data={data}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            onRefresh={handleRefresh}
            refreshing={isRefreshing}
            removeClippedSubviews
            ListEmptyComponent={listEmpty}
            ItemSeparatorComponent={ItemSeparator}
            contentContainerStyle={contentContainerStyle}
          />
        )}
      </AdminLayouts>

      <AddKeywordDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />
    </SafeAreaView>
  );
};

export default KeywordScreen;

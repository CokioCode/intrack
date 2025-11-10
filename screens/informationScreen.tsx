import { memo, useCallback, useMemo, useState } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { Plus, Filter } from "@tamagui/lucide-icons";
import { Button, Text, XStack, YStack, View } from "tamagui";

import { SearchInput } from "@/components/common/SearchInput";
import { AddInformationDialog } from "@/components/features/bot/dialogs/AddInformationDialog";
import { FilterInformationDialog } from "@/components/features/bot/dialogs/FilterInformationDialog";
import { InformationCard } from "@/components/features/bot/informationCard";
import { AdminLayouts } from "@/components/layouts/adminLayouts";
import { useInformationQuery } from "@/hooks/useInformation";
import Pagination from "@/components/common/Pagination";

type InformationItem = {
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
        Loading information...
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
        Error loading information
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
        No information found
      </Text>
    </YStack>
  );
});

EmptyState.displayName = "EmptyState";

const ItemSeparator = memo(() => <YStack height={12} />);
ItemSeparator.displayName = "ItemSeparator";

const InformationScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<
    "PROMO" | "PAKET" | "INFO" | ""
  >("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);

  const { data, totalPages, isLoading, isError, refresh, isRefreshing } =
    useInformationQuery(currentPage, itemsPerPage, searchQuery, filterCategory);

  const handleSearch = useCallback(() => {
    const query = searchText.trim();
    setSearchQuery(query);
    setCurrentPage(1);
  }, [searchText]);

  const handleChange = useCallback((text: string) => {
    setSearchText(text);
    if (text === "") {
      setSearchQuery("");
      setCurrentPage(1);
    }
  }, []);

  const handleRefresh = useCallback(() => {
    setSearchText("");
    setSearchQuery("");
    setFilterCategory("");
    setCurrentPage(1);
    refresh();
  }, [refresh]);

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

  const handleFilterOpen = useCallback(() => {
    setFilterDialogOpen(true);
  }, []);

  const handleFilterChange = useCallback(
    (category: "PROMO" | "PAKET" | "INFO" | "") => {
      setFilterCategory(category);
      setCurrentPage(1);
    },
    []
  );

  const renderItem = useCallback(
    ({ item }: { item: InformationItem }) => (
      <InformationCard information={item} />
    ),
    []
  );

  const keyExtractor = useCallback((item: InformationItem) => item.id, []);

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
      <YStack width="100%" gap="$3">
        <XStack width="100%" alignItems="center" gap="$2">
          <XStack flex={1}>
            <SearchInput
              value={searchText}
              onChange={handleChange}
              onSearch={handleSearch}
              placeholder="Search information..."
              variant="default"
            />
          </XStack>
          <XStack position="relative">
            <Button
              icon={<Filter size={18} />}
              backgroundColor="$gray4"
              color="$gray12"
              onPress={handleFilterOpen}
              pressStyle={{ opacity: 0.8 }}
            />
            {filterCategory !== "" && (
              <View
                position="absolute"
                top={-4}
                right={-4}
                width={8}
                height={8}
                backgroundColor="$blue9"
                borderRadius={4}
              />
            )}
          </XStack>
          <Button
            icon={<Plus size={18} />}
            backgroundColor="$blue9"
            color="white"
            onPress={handleAdd}
            pressStyle={{ opacity: 0.8 }}
          />
        </XStack>
      </YStack>
    ),
    [searchText, handleChange, handleSearch, handleFilterOpen, filterCategory]
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
        showFixedSearch={true}
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

      <AddInformationDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
      />

      <FilterInformationDialog
        open={filterDialogOpen}
        onOpenChange={setFilterDialogOpen}
        filterCategory={filterCategory}
        onFilterChange={handleFilterChange}
      />
    </SafeAreaView>
  );
};

export default InformationScreen;

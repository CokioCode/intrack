import { memo, useCallback, useMemo, useState } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { Plus, Filter, RefreshCw } from "@tamagui/lucide-icons";
import { Button, Text, XStack, YStack, View } from "tamagui";

import { SearchInput } from "@/components/common/SearchInput";
import { IndibizCard } from "@/components/features/indibiz/IndibizCard";
import { AdminLayouts } from "@/components/layouts/adminLayouts";
import { useIndibizQuery, useSyncIndibiz } from "@/hooks/useIndibiz";
import Pagination from "@/components/common/Pagination";
import { FilterIndibizDialog } from "@/components/features/indibiz/dialogs/FilterIndibizDialog";
import SyncIndibizDialog from "@/components/features/indibiz/dialogs/SyncIndibizDialog";

type IndibizItem = {
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
        Loading indibiz...
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
        Error loading indibiz
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
        No indibiz found
      </Text>
    </YStack>
  );
});

EmptyState.displayName = "EmptyState";

const ItemSeparator = memo(() => <YStack height={12} />);
ItemSeparator.displayName = "ItemSeparator";

const IndibizScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatusIndibiz, setFilterStatusIndibiz] = useState<
    | "PS"
    | "CANCEL"
    | "KENDALA"
    | "REVOKE"
    | "QC1"
    | "PI"
    | "FALLOUT"
    | "WFM_UNSC"
    | "QC2_FCC"
    | "PAPERLESS"
    | "SURVER"
    | "DECLINE_FCC"
    | "PT3_WAITING_AKTIVASI"
    | "FOLLOWUP_TO_COMPLETE"
    | ""
  >("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { data, totalPages, isLoading, isError, refresh, isRefreshing } =
    useIndibizQuery(
      currentPage,
      itemsPerPage,
      searchQuery,
      filterStatusIndibiz
    );

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
    setFilterStatusIndibiz("");
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
    setIsOpen(true);
  }, []);

  const handleFilterOpen = useCallback(() => {
    setFilterDialogOpen(true);
  }, []);

  const handleFilterChange = useCallback(
    (
      status:
        | "PS"
        | "CANCEL"
        | "KENDALA"
        | "REVOKE"
        | "QC1"
        | "PI"
        | "FALLOUT"
        | "WFM_UNSC"
        | "QC2_FCC"
        | "PAPERLESS"
        | "SURVER"
        | "DECLINE_FCC"
        | "PT3_WAITING_AKTIVASI"
        | "FOLLOWUP_TO_COMPLETE"
        | ""
    ) => {
      setFilterStatusIndibiz(status);
      setCurrentPage(1);
    },
    []
  );

  const renderItem = useCallback(
    ({ item }: { item: IndibizItem }) => (
      <IndibizCard information={item as any} />
    ),
    []
  );

  const keyExtractor = useCallback((item: IndibizItem) => item.id, []);

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
  const syncMutation = useSyncIndibiz();

  const handleSync = async () => {
    await syncMutation.mutateAsync();
    refresh();
  };

  const searchContent = useMemo(
    () => (
      <YStack width="100%" gap="$3">
        <XStack width="100%" alignItems="center" gap="$2">
          <XStack flex={1}>
            <SearchInput
              value={searchText}
              onChange={handleChange}
              onSearch={handleSearch}
              placeholder="Search indibiz..."
              variant="default"
            />
          </XStack>
          <XStack position="relative">
            <Button
              icon={<Filter size={18} />}
              backgroundColor="$gray4"
              color="$gray12"
              height={54}
              onPress={handleFilterOpen}
              pressStyle={{ opacity: 0.8 }}
            />
            {filterStatusIndibiz !== "" && (
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
            icon={
              syncMutation.isPending ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <RefreshCw size={18} />
              )
            }
            backgroundColor="$green10"
            height={54}
            color="white"
            disabled={syncMutation.isPending}
            onPress={handleSync}
            pressStyle={{ opacity: 0.8 }}
          />
        </XStack>
      </YStack>
    ),
    [
      searchText,
      handleChange,
      handleSearch,
      handleFilterOpen,
      filterStatusIndibiz,
      handleSync,
    ]
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
        title="Indibiz Management"
        subtitle="Manage and monitor indibiz"
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

      <FilterIndibizDialog
        open={filterDialogOpen}
        onOpenChange={setFilterDialogOpen}
        filterStatusIndibiz={filterStatusIndibiz}
        onFilterChange={handleFilterChange}
      />
    </SafeAreaView>
  );
};

export default IndibizScreen;

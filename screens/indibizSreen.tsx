import { memo, useCallback, useMemo, useState } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { Plus } from "@tamagui/lucide-icons";
import { Button, Text, XStack, YStack } from "tamagui";

import { SearchInput } from "@/components/common/SearchInput";
import { IndibizCard } from "@/components/features/indibiz/IndibizCard";
import { AdminLayouts } from "@/components/layouts/adminLayouts";
import { useIndibizQuery } from "@/hooks/useIndibiz";
import { useIndibizStore } from "@/stores/indibizStore";

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

const LoadingFooter = memo(() => (
  <YStack padding="$4" alignItems="center">
    <ActivityIndicator size="small" color="#3B82F6" />
  </YStack>
));

LoadingFooter.displayName = "LoadingFooter";

const ItemSeparator = memo(() => <YStack height={12} />);
ItemSeparator.displayName = "ItemSeparator";

const IndibizScreen = () => {
  const [searchText, setSearchText] = useState("");
  const setSearchQuery = useIndibizStore((state) => state.setSearchQuery);

  const {
    data,
    isLoading,
    isError,
    loadMore,
    refresh,
    isFetchingMore,
    isRefreshing,
  } = useIndibizQuery();

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

  const handleView = useCallback((indibizId: string) => {
    console.log("View indibiz:", indibizId);
  }, []);

  const handleAdd = useCallback(() => {
    console.log("Add new indibiz");
    // TODO: Implement add dialog
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: IndibizItem }) => (
      <IndibizCard information={item as any} onView={handleView} />
    ),
    [handleView]
  );

  const keyExtractor = useCallback((item: IndibizItem) => item.id, []);

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
        title="Indibiz Management"
        subtitle="Manage and monitor indibiz"
      >
        <YStack flex={1} paddingHorizontal="$4" paddingTop="$4">
          <XStack width="100%" alignItems="center" space="$2" marginBottom="$2">
            <XStack flex={1}>
              <SearchInput
                value={searchText}
                onChange={handleChange}
                onSearch={handleSearch}
                placeholder="Search indibiz..."
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

          <YStack flex={1}>
            {isLoading ? (
              <LoadingState />
            ) : isError ? (
              <ErrorState onRetry={refresh} />
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
    </SafeAreaView>
  );
};

export default IndibizScreen;

import React, { ReactNode, useState } from "react";
import { YStack, ScrollView } from "tamagui";
import HeaderApp from "../common/HeaderApp";
import { router } from "expo-router";
import { useAuthStore } from "@/stores/authStrore";
import { showToast } from "@/utils/toast";

type AdminLayoutsProps = {
  children: React.ReactNode;
  variant?: "home" | "settings";
  title?: string;
  subtitle?: string;
  username?: string;
  avatarUrl?: string;
  onSearch?: (value: string) => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
  onHelpClick?: () => void;
  searchPlaceholder?: string;
  fixedSearchContent?: ReactNode;
  fixedPaginationContent?: ReactNode;
  showFixedSearch?: boolean;
  showFixedPagination?: boolean;
};

export const AdminLayouts = ({
  variant = "home",
  children,
  subtitle,
  title = "Let's Track your package",
  username,
  avatarUrl,
  onSearch,
  onSettingsClick,
  onLogoutClick,
  onHelpClick,
  searchPlaceholder = "Enter SC Number",
  fixedSearchContent,
  fixedPaginationContent,
  showFixedSearch = false,
  showFixedPagination = false,
}: AdminLayoutsProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const logout = useAuthStore((state) => state.logout);

  const handleSearch = () => {
    if (onSearch && searchValue.trim()) {
      setIsSearching(true);
      try {
        onSearch(searchValue);
      } finally {
        setIsSearching(false);
      }
    }
  };

  const handleLogout = () => {
    logout();
    showToast.success("Logout successfully");
    router.replace("/");
  };

  const role = useAuthStore((state) => state.role);

  const handleHelpClick = () => {
    if (role === "ADMIN") {
      router.push("/helps/help");
    } else {
      router.push("/users/help");
    }
  };

  return (
    <YStack flex={1}>
      <HeaderApp
        variant={variant}
        title={title}
        subtitle={subtitle}
        username={username}
        avatarUrl={avatarUrl}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearch={handleSearch}
        isSearching={isSearching}
        searchPlaceholder={searchPlaceholder}
        onSettingsClick={onSettingsClick}
        onLogoutClick={onLogoutClick || handleLogout}
        onHelpClick={handleHelpClick}
      />

      {showFixedSearch && fixedSearchContent && (
        <YStack
          paddingHorizontal="$4"
          paddingTop="$4"
          paddingBottom="$2"
          backgroundColor="$background"
          borderBottomWidth={1}
          borderBottomColor="$borderColor"
        >
          {fixedSearchContent}
        </YStack>
      )}

      <YStack flex={1}>{children}</YStack>

      {showFixedPagination && fixedPaginationContent && (
        <YStack
          backgroundColor="$background"
          borderTopWidth={1}
          borderTopColor="$borderColor"
        >
          {fixedPaginationContent}
        </YStack>
      )}
    </YStack>
  );
};

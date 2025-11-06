import React, { useState } from "react";
import { YStack } from "tamagui";
import { ScrollView } from "tamagui";
import HeaderApp from "../common/HeaderApp";
import { router } from "expo-router";

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
}: AdminLayoutsProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

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
        onLogoutClick={() => router.push("/")}
        onHelpClick={onHelpClick}
      />
      <ScrollView>
        <YStack flex={1}>{children}</YStack>
      </ScrollView>
    </YStack>
  );
};

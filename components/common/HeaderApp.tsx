import {
  YStack,
  XStack,
  Text,
  Image,
  Avatar,
  Input,
  Button,
  Spinner,
  Sheet,
  Separator,
} from "tamagui";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LogOut, Search, Settings, User } from "@tamagui/lucide-icons";
import { Dimensions } from "react-native";

export default function HeaderApp({
  variant = "home",
  title,
  subtitle,
  username,
  avatarUrl,
  searchValue = "",
  onSearchChange,
  onSearch,
  isSearching = false,
  searchPlaceholder = "Enter SC Number",
  onHelpClick,
  onSettingsClick,
  onLogoutClick,
}: {
  variant?: "settings" | "home";
  title?: string;
  subtitle?: string;
  username?: string;
  avatarUrl?: string;

  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearch?: () => void;
  isSearching?: boolean;
  searchPlaceholder?: string;

  onHelpClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
}) {
  const insets = useSafeAreaInsets();
  const [showDropdown, setShowDropdown] = useState(false);
  const isSettingsVariant = variant === "settings";

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get("window");

  const scale = (size: number) => (SCREEN_WIDTH / 375) * size;
  const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

  const handleMenuItemClick = (action?: () => void) => {
    setShowDropdown(false);
    if (action) {
      setTimeout(() => action(), 100);
    }
  };

  const sheetSnapPoint = SCREEN_HEIGHT * 0.05;
  const avatarSize = moderateScale(48);
  const iconSize = moderateScale(20);
  const paddingSize = moderateScale(60);
  const gapSize = moderateScale(12);

  return (
    <YStack width="100%" position="relative" zIndex={1}>
      <YStack
        backgroundColor="#071333"
        paddingTop={insets.top + 16}
        paddingBottom={isSettingsVariant ? 32 : 48}
        paddingHorizontal="$4"
        borderBottomLeftRadius={24}
        borderBottomRightRadius={24}
        overflow="hidden"
        position="relative"
      >
        <Image
          source={require("../../assets/images/city.png")}
          objectFit="cover"
          width="100%"
          height="100%"
          position="absolute"
          bottom={0}
          left={0}
          right={0}
        />

        <YStack zIndex={1} gap={isSettingsVariant ? 6 : 16}>
          <XStack alignItems="center" justifyContent="space-between">
            {!isSettingsVariant && (
              <Image
                source={require("../../assets/images/logo_app.png")}
                width="$4"
                height="$4"
                objectFit="contain"
                alt="App Logo"
              />
            )}
            <XStack alignItems="center" gap={20}>
              {username && (
                <Text
                  color="white"
                  fontSize={13}
                  fontWeight="600"
                  letterSpacing={-0.2}
                >
                  {username}
                </Text>
              )}
              {!isSettingsVariant && (
                <Button
                  unstyled
                  onPress={() => setShowDropdown(true)}
                  padding={0}
                  backgroundColor="transparent"
                >
                  <Avatar
                    circular
                    size="$3.5"
                    borderWidth={1}
                    borderColor="#FFFFFF"
                  >
                    <Avatar.Image accessibilityLabel="User" src={avatarUrl} />
                    <Avatar.Fallback backgroundColor="#FFFFFF" />
                  </Avatar>
                </Button>
              )}
            </XStack>
          </XStack>

          {isSettingsVariant ? (
            <XStack alignItems="center" marginTop={20}>
              <Image
                source={require("../../assets/images/logo_app.png")}
                width="$3"
                height="$3"
                objectFit="contain"
                alt="App Logo"
                marginRight={-20}
              />
              <YStack gap={6}>
                <Text
                  color="white"
                  fontSize={20}
                  fontWeight="700"
                  letterSpacing={-0.5}
                  marginLeft={44}
                >
                  {title || "Settings"}
                </Text>
                {subtitle && (
                  <Text
                    color="#B9C4E2"
                    fontSize={14}
                    fontWeight="500"
                    letterSpacing={-0.3}
                    marginLeft={44}
                  >
                    {subtitle}
                  </Text>
                )}
              </YStack>
            </XStack>
          ) : (
            <YStack gap={12}>
              <Text
                color="white"
                fontSize={18}
                fontWeight="700"
                letterSpacing={-0.4}
                lineHeight={24}
              >
                {title || "Track Your Orders With Indibiz."}
              </Text>

              <XStack
                backgroundColor="rgba(255, 255, 255, 0.95)"
                alignItems="center"
                borderRadius="$3"
                paddingLeft="$4"
                paddingRight="$2"
                paddingVertical="$2"
                gap="$2"
                shadowColor="#000"
                shadowOffset={{ width: 0, height: 2 }}
                shadowOpacity={0.1}
                shadowRadius={4}
                elevation={3}
              >
                <Input
                  flex={1}
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChangeText={onSearchChange}
                  onSubmitEditing={onSearch}
                  returnKeyType="search"
                  borderWidth={0}
                  backgroundColor="transparent"
                  autoCapitalize="characters"
                  autoCorrect={false}
                  disabled={isSearching}
                  placeholderTextColor="#B0B0B0"
                  fontSize="$3"
                  color="#333"
                  padding={0}
                />

                <Button
                  icon={
                    isSearching ? (
                      <Spinner size="small" color="#2490A9" />
                    ) : (
                      <Search size={20} color="#2490A9" />
                    )
                  }
                  backgroundColor="transparent"
                  onPress={onSearch}
                  disabled={isSearching || !searchValue.trim()}
                  pressStyle={{ opacity: 0.7 }}
                  paddingHorizontal="$3"
                />
              </XStack>
            </YStack>
          )}
        </YStack>
      </YStack>
      <Sheet
        modal
        open={showDropdown}
        onOpenChange={setShowDropdown}
        snapPoints={[sheetSnapPoint]}
        dismissOnSnapToBottom
        zIndex={100000}
        animation="medium"
      >
        <Sheet.Overlay
          animation="lazy"
          padding={10}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          backgroundColor="rgba(0, 0, 0, 0.5)"
        />
        <Sheet.Frame
          backgroundColor="#FFFFFF"
          borderTopLeftRadius={moderateScale(24)}
          borderTopRightRadius={moderateScale(24)}
        >
          <Sheet.Handle backgroundColor="#E0E0E0" marginBottom={gapSize} />

          <YStack gap={gapSize * 0.6}>
            <XStack
              alignItems="center"
              gap={gapSize}
              paddingVertical={gapSize}
              paddingHorizontal={paddingSize * 0.5}
            >
              <Avatar
                circular
                size={avatarSize}
                borderWidth={1}
                borderColor="#2490A9"
              >
                <Avatar.Image accessibilityLabel="User" src={avatarUrl} />
                <Avatar.Fallback backgroundColor="#E0E0E0" />
              </Avatar>
              <YStack flex={1}>
                <Text
                  fontWeight="600"
                  fontSize={moderateScale(16)}
                  color="#333"
                >
                  {username || "User"}
                </Text>
                <Text fontSize={moderateScale(12)} color="#666">
                  View profile
                </Text>
              </YStack>
            </XStack>

            <Separator marginVertical={gapSize * 0.5} />

            <Button
              backgroundColor="transparent"
              justifyContent="flex-start"
              paddingVertical={gapSize}
              paddingHorizontal={paddingSize * 0.5}
              onPress={() => handleMenuItemClick(onHelpClick)}
              pressStyle={{ backgroundColor: "#F5F5F5" }}
              borderRadius={moderateScale(12)}
            >
              <XStack alignItems="center" gap={gapSize} flex={1}>
                <User size={iconSize} color="#333" />
                <Text
                  fontSize={moderateScale(14)}
                  color="#333"
                  fontWeight="500"
                >
                  Help & Support
                </Text>
              </XStack>
            </Button>

            <Separator marginVertical={gapSize * 0.5} />

            <Button
              backgroundColor="transparent"
              justifyContent="flex-start"
              paddingVertical={gapSize}
              paddingHorizontal={paddingSize * 0.5}
              onPress={() => handleMenuItemClick(onLogoutClick)}
              pressStyle={{ backgroundColor: "#FFEBEE" }}
              borderRadius={moderateScale(12)}
            >
              <XStack alignItems="center" gap={gapSize} flex={1}>
                <LogOut size={iconSize} color="#D32F2F" />
                <Text
                  fontSize={moderateScale(14)}
                  color="#D32F2F"
                  fontWeight="500"
                >
                  Logout
                </Text>
              </XStack>
            </Button>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </YStack>
  );
}

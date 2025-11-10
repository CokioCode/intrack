import React from "react";
import { XStack, YStack, Button, Text, Select, Adapt, Sheet } from "tamagui";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
} from "@tamagui/lucide-icons";
import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const scale = (size: number) => (SCREEN_WIDTH / 375) * size;
const verticalScale = (size: number) => (SCREEN_HEIGHT / 667) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 5,
  onItemsPerPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  onItemsPerPageChange?: (items: number) => void;
}) => {
  const itemsOptions = [5, 10, 15, 20, 25, 50];
  const isSmallScreen = SCREEN_WIDTH < 380;

  const buttonHeight = verticalScale(28);
  const iconSize = moderateScale(16);

  return (
    <XStack
      backgroundColor="$background"
      paddingVertical={verticalScale(8)}
      paddingHorizontal={scale(isSmallScreen ? 6 : 12)}
      borderTopWidth={1}
      borderTopColor="$borderColor"
      justifyContent="space-between"
      alignItems="center"
      gap={scale(isSmallScreen ? 3 : 6)}
      width="100%"
      flexWrap="nowrap"
    >
      <XStack
        alignItems="center"
        gap={scale(isSmallScreen ? 3 : 5)}
        flexShrink={1}
      >
        {!isSmallScreen && (
          <Text fontSize={moderateScale(12)} color="$color10" numberOfLines={1}>
            Show:
          </Text>
        )}

        <Select
          value={itemsPerPage.toString()}
          onValueChange={(val) => onItemsPerPageChange?.(parseInt(val))}
          size="$2"
        >
          <Select.Trigger
            width={scale(isSmallScreen ? 55 : 65)}
            iconAfter={ChevronDown}
            height={buttonHeight}
            paddingHorizontal={scale(6)}
            borderRadius={scale(6)}
          >
            <Select.Value placeholder="5" />
          </Select.Trigger>

          <Adapt when="sm" platform="touch">
            <Sheet
              modal
              dismissOnSnapToBottom
              animationConfig={{
                type: "spring",
                damping: 20,
                mass: 1.2,
                stiffness: 250,
              }}
            >
              <Sheet.Frame>
                <Sheet.ScrollView>
                  <Adapt.Contents />
                </Sheet.ScrollView>
              </Sheet.Frame>
              <Sheet.Overlay
                animation="lazy"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
              />
            </Sheet>
          </Adapt>

          <Select.Content zIndex={200000}>
            <Select.ScrollUpButton
              alignItems="center"
              justifyContent="center"
              position="relative"
              width="100%"
              height={verticalScale(24)}
            >
              <YStack zIndex={10}>
                <ChevronDown size={iconSize} />
              </YStack>
            </Select.ScrollUpButton>

            <Select.Viewport minWidth={scale(120)}>
              <Select.Group>
                {itemsOptions.map((item, i) => (
                  <Select.Item index={i} key={item} value={item.toString()}>
                    <Select.ItemText fontSize={moderateScale(13)}>
                      {item}
                    </Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={iconSize} />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Viewport>

            <Select.ScrollDownButton
              alignItems="center"
              justifyContent="center"
              position="relative"
              width="100%"
              height={verticalScale(24)}
            >
              <YStack zIndex={10}>
                <ChevronDown size={iconSize} />
              </YStack>
            </Select.ScrollDownButton>
          </Select.Content>
        </Select>
      </XStack>

      <XStack
        alignItems="center"
        gap={scale(isSmallScreen ? 3 : 5)}
        flexShrink={0}
      >
        <Button
          size="$2"
          disabled={currentPage === 1}
          onPress={() => currentPage > 1 && onPageChange(currentPage - 1)}
          backgroundColor="$background"
          borderWidth={1}
          borderColor="$borderColor"
          pressStyle={{
            backgroundColor: "$color3",
            scale: 0.97,
          }}
          disabledStyle={{
            opacity: 0.4,
            cursor: "not-allowed",
          }}
          icon={<ChevronLeft size={iconSize} />}
          paddingHorizontal={scale(isSmallScreen ? 6 : 10)}
          height={buttonHeight}
          borderRadius={scale(6)}
          circular={isSmallScreen}
          width={isSmallScreen ? scale(32) : undefined}
        />

        <XStack
          alignItems="center"
          gap={scale(2)}
          minWidth={scale(isSmallScreen ? 50 : 60)}
          justifyContent="center"
        >
          <XStack
            backgroundColor="$color2"
            borderWidth={1}
            borderColor="$borderColor"
            borderRadius={scale(6)}
            paddingHorizontal={scale(isSmallScreen ? 6 : 10)}
            paddingVertical={verticalScale(5)}
            minWidth={scale(isSmallScreen ? 28 : 35)}
            justifyContent="center"
            alignItems="center"
          >
            <Text
              fontSize={moderateScale(12)}
              fontWeight="600"
              color="$color12"
              numberOfLines={1}
            >
              {currentPage}
            </Text>
          </XStack>

          <Text
            fontSize={moderateScale(isSmallScreen ? 10 : 11)}
            color="$color9"
            numberOfLines={1}
          >
            / {totalPages}
          </Text>
        </XStack>

        <Button
          size="$2"
          disabled={currentPage === totalPages}
          onPress={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          backgroundColor="$background"
          borderWidth={1}
          borderColor="$borderColor"
          pressStyle={{
            backgroundColor: "$color3",
            scale: 0.97,
          }}
          disabledStyle={{
            opacity: 0.4,
            cursor: "not-allowed",
          }}
          icon={<ChevronRight size={iconSize} />}
          paddingHorizontal={scale(isSmallScreen ? 6 : 10)}
          height={buttonHeight}
          borderRadius={scale(6)}
          circular={isSmallScreen}
          width={isSmallScreen ? scale(32) : undefined}
        />
      </XStack>
    </XStack>
  );
};

export default Pagination;

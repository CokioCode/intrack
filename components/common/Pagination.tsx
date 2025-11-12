import React, { useState, useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";
import { XStack, Button, Text, View } from "tamagui";
import { ChevronLeft, ChevronRight, ChevronDown } from "@tamagui/lucide-icons";
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
  const [mounted, setMounted] = useState(false);
  const itemsOptions = [5, 10, 15, 20, 25, 50];
  const isSmallScreen = SCREEN_WIDTH < 380;

  const buttonHeight = verticalScale(28);
  const iconSize = moderateScale(16);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      opacity={mounted ? 1 : 0}
      animation="quick"
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

        <View
          style={{
            width: scale(isSmallScreen ? 55 : 65),
            height: buttonHeight,
            borderRadius: scale(6),
            borderWidth: 1,
            borderColor: "$borderColor",
            justifyContent: "center",
            paddingHorizontal: scale(6),
          }}
        >
          <RNPickerSelect
            value={itemsPerPage}
            onValueChange={(val) => {
              if (val) {
                onItemsPerPageChange?.(val);
              }
            }}
            items={itemsOptions.map((item) => ({
              label: item.toString(),
              value: item,
            }))}
            style={{
              inputIOS: {
                fontSize: moderateScale(13),
                paddingVertical: 0,
                paddingHorizontal: 0,
                color: "black",
              },
              inputAndroid: {
                fontSize: moderateScale(13),
                paddingVertical: 0,
                paddingHorizontal: 0,
                color: "black",
              },
              inputWeb: {
                fontSize: moderateScale(13),
                paddingVertical: 0,
                paddingHorizontal: 0,
                color: "black",
              },
              iconContainer: {
                top: "50%",
                right: 0,
                transform: [{ translateY: -iconSize / 2 }],
              },
            }}
            placeholder={{}}
            useNativeAndroidPickerStyle={false}
            Icon={() => <ChevronDown size={iconSize} color="$color10" />}
          />
        </View>
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

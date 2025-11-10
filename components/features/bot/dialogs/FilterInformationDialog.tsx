import { memo, useEffect, useState, useCallback } from "react";
import { Modal, StyleSheet, Pressable } from "react-native";
import { Button, Text, XStack, YStack, Label } from "tamagui";
import RNPickerSelect from "react-native-picker-select";
import { X, Filter, ChevronDown } from "@tamagui/lucide-icons";

interface FilterInformationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filterCategory: "PROMO" | "PAKET" | "INFO" | "";
  onFilterChange: (category: "PROMO" | "PAKET" | "INFO" | "") => void;
}

const CATEGORIES = [
  { value: "", label: "All" },
  { value: "PROMO", label: "Promo" },
  { value: "PAKET", label: "Paket" },
  { value: "INFO", label: "Info" },
] as const;

export const FilterInformationDialog = memo(
  ({
    open,
    onOpenChange,
    filterCategory,
    onFilterChange,
  }: FilterInformationDialogProps) => {
    const [tempCategory, setTempCategory] = useState(filterCategory);

    useEffect(() => {
      if (open) {
        setTempCategory(filterCategory);
      }
    }, [open, filterCategory]);

    const handleCategoryChange = useCallback((value: string) => {
      setTempCategory(value as "PROMO" | "PAKET" | "INFO" | "");
    }, []);

    const handleReset = useCallback(() => {
      onFilterChange("");
      onOpenChange(false);
    }, [onFilterChange, onOpenChange]);

    const handleApply = useCallback(() => {
      onFilterChange(tempCategory);
      onOpenChange(false);
    }, [onFilterChange, onOpenChange, tempCategory]);

    const handleClose = useCallback(() => {
      onOpenChange(false);
    }, [onOpenChange]);

    const selectedLabel =
      CATEGORIES.find((cat) => cat.value === tempCategory)?.label || "All";

    return (
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
        statusBarTranslucent
      >
        <Pressable style={styles.overlay} onPress={handleClose}>
          <Pressable onPress={(e) => e.stopPropagation()}>
            <YStack
              backgroundColor="$background"
              borderRadius="$4"
              padding="$4"
              width="90%"
              maxWidth={400}
              gap="$4"
              shadowColor="$shadowColor"
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.25}
              shadowRadius={3.84}
              elevation={5}
            >
              <XStack justifyContent="space-between" alignItems="center">
                <XStack alignItems="center" gap="$2">
                  <Filter size={20} color="$gray12" />
                  <Text fontSize={18} fontWeight="600" color="$gray12">
                    Filter Information
                  </Text>
                </XStack>
                <Button
                  size="$2"
                  circular
                  icon={<X size={16} />}
                  backgroundColor="transparent"
                  color="$gray11"
                  pressStyle={{ opacity: 0.7 }}
                  onPress={handleClose}
                />
              </XStack>

              <Text fontSize={14} color="$gray11">
                Filter information by category
              </Text>

              <YStack gap="$2">
                <Label fontSize={14} fontWeight="500" color="$gray12">
                  Category
                </Label>

                <YStack
                  borderWidth={1}
                  borderColor="$gray7"
                  borderRadius="$3"
                  backgroundColor="$gray2"
                  overflow="hidden"
                >
                  <RNPickerSelect
                    value={tempCategory}
                    onValueChange={handleCategoryChange}
                    items={CATEGORIES.map((cat) => ({
                      label: cat.label,
                      value: cat.value,
                    }))}
                    style={pickerSelectStyles}
                    placeholder={{}}
                    useNativeAndroidPickerStyle={false}
                    Icon={() => (
                      <YStack
                        paddingRight="$3"
                        justifyContent="center"
                        height="100%"
                      >
                        <ChevronDown size={18} color="$gray11" />
                      </YStack>
                    )}
                  />
                </YStack>

                <Text fontSize={12} color="$gray10">
                  Selected: {selectedLabel}
                </Text>
              </YStack>

              <XStack gap="$3" justifyContent="flex-end" paddingTop="$2">
                <Button
                  variant="outlined"
                  borderColor="$gray7"
                  color="$gray11"
                  onPress={handleReset}
                  pressStyle={{ opacity: 0.7 }}
                >
                  Reset
                </Button>

                <Button
                  backgroundColor="$blue9"
                  color="white"
                  onPress={handleApply}
                  pressStyle={{ opacity: 0.8 }}
                >
                  Apply Filter
                </Button>
              </XStack>
            </YStack>
          </Pressable>
        </Pressable>
      </Modal>
    );
  }
);

FilterInformationDialog.displayName = "FilterInformationDialog";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    paddingVertical: 12,
    paddingHorizontal: 12,
    color: "#1F2937",
    paddingRight: 40,
  },
  inputAndroid: {
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: "#1F2937",
    paddingRight: 40,
  },
  placeholder: {
    color: "#9CA3AF",
  },
  iconContainer: {
    top: 0,
    right: 0,
    height: "100%",
  },
});

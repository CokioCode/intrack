import { memo, useEffect, useState, useCallback } from "react";
import { Modal, StyleSheet, Pressable } from "react-native";
import { Button, Text, XStack, YStack, Label } from "tamagui";
import RNPickerSelect from "react-native-picker-select";
import { X, Filter, ChevronDown } from "@tamagui/lucide-icons";

interface FilterIndibizDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filterStatusIndibiz:
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
    | "";
  onFilterChange: (
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
  ) => void;
}

export const STATUSES = [
  { value: "", label: "All" },
  { value: "PS", label: "PS" },
  { value: "CANCEL", label: "Cancel" },
  { value: "KENDALA", label: "Kendala" },
  { value: "REVOKE", label: "Revoke" },
  { value: "QC1", label: "QC1" },
  { value: "PI", label: "PI" },
  { value: "FALLOUT", label: "Fallout" },
  { value: "WFM_UNSC", label: "WFM UNSC" },
  { value: "QC2_FCC", label: "QC2 FCC" },
  { value: "PAPERLESS", label: "Paperless" },
  { value: "SURVER", label: "Surver" },
  { value: "DECLINE_FCC", label: "Decline FCC" },
  { value: "PT3_WAITING_AKTIVASI", label: "PT3 Waiting Aktivasi" },
  { value: "FOLLOWUP_TO_COMPLETE", label: "Followup to Complete" },
] as const;

export const FilterIndibizDialog = memo(
  ({
    open,
    onOpenChange,
    filterStatusIndibiz,
    onFilterChange,
  }: FilterIndibizDialogProps) => {
    const [tempStatus, setTempStatus] = useState(filterStatusIndibiz);

    useEffect(() => {
      if (open) {
        setTempStatus(filterStatusIndibiz);
      }
    }, [open, filterStatusIndibiz]);

    const handleStatusChange = useCallback((value: string) => {
      setTempStatus(
        value as
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
      );
    }, []);

    const handleReset = useCallback(() => {
      onFilterChange("");
      onOpenChange(false);
    }, [onFilterChange, onOpenChange]);

    const handleApply = useCallback(() => {
      onFilterChange(tempStatus);
      onOpenChange(false);
    }, [onFilterChange, onOpenChange, tempStatus]);

    const handleClose = useCallback(() => {
      onOpenChange(false);
    }, [onOpenChange]);

    const selectedLabel =
      STATUSES.find((status) => status.value === tempStatus)?.label || "All";

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
                    Filter Indibiz
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
                Filter information by status
              </Text>

              <YStack gap="$2">
                <Label fontSize={14} fontWeight="500" color="$gray12">
                  Status
                </Label>

                <YStack
                  borderWidth={1}
                  borderColor="$gray7"
                  borderRadius="$3"
                  backgroundColor="$gray2"
                  overflow="hidden"
                >
                  <RNPickerSelect
                    value={tempStatus}
                    onValueChange={handleStatusChange}
                    items={STATUSES.map((status) => ({
                      label: status.label,
                      value: status.value,
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

FilterIndibizDialog.displayName = "FilterIndibizDialog";

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

import { memo, useEffect, useState, useCallback } from "react";
import { Modal, StyleSheet, Pressable } from "react-native";
import { Button, Text, XStack, YStack, Label } from "tamagui";
import RNPickerSelect from "react-native-picker-select";
import { X, Filter, ChevronDown } from "@tamagui/lucide-icons";

interface FilterOrdersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filterStatus: "RNA" | "QC" | "FCC" | "PI" | "PS" | "";
  filterMonth:
    | "january"
    | "february"
    | "march"
    | "april"
    | "may"
    | "june"
    | "july"
    | "august"
    | "september"
    | "october"
    | "november"
    | "december"
    | "";
  onFilterChange: (filters: {
    status: "RNA" | "QC" | "FCC" | "PI" | "PS" | "";
    month:
      | "january"
      | "february"
      | "march"
      | "april"
      | "may"
      | "june"
      | "july"
      | "august"
      | "september"
      | "october"
      | "november"
      | "december"
      | "";
  }) => void;
}

const STATUSES = [
  { value: "", label: "All Status" },
  { value: "RNA", label: "RNA" },
  { value: "QC", label: "QC" },
  { value: "FCC", label: "FCC" },
  { value: "PI", label: "PI" },
  { value: "PS", label: "PS" },
] as const;

const MONTHS = [
  { value: "", label: "All Months" },
  { value: "january", label: "January" },
  { value: "february", label: "February" },
  { value: "march", label: "March" },
  { value: "april", label: "April" },
  { value: "may", label: "May" },
  { value: "june", label: "June" },
  { value: "july", label: "July" },
  { value: "august", label: "August" },
  { value: "september", label: "September" },
  { value: "october", label: "October" },
  { value: "november", label: "November" },
  { value: "december", label: "December" },
] as const;

export const FilterOrdersDialog = memo(
  ({
    open,
    onOpenChange,
    filterStatus,
    filterMonth,
    onFilterChange,
  }: FilterOrdersDialogProps) => {
    const [tempStatus, setTempStatus] = useState(filterStatus);
    const [tempMonth, setTempMonth] = useState(filterMonth);

    useEffect(() => {
      if (open) {
        setTempStatus(filterStatus);
        setTempMonth(filterMonth);
      }
    }, [open, filterStatus, filterMonth]);

    const handleStatusChange = useCallback((value: string) => {
      setTempStatus(value as "RNA" | "QC" | "FCC" | "PI" | "PS" | "");
    }, []);

    const handleMonthChange = useCallback((value: string) => {
      setTempMonth(
        value as
          | "january"
          | "february"
          | "march"
          | "april"
          | "may"
          | "june"
          | "july"
          | "august"
          | "september"
          | "october"
          | "november"
          | "december"
          | ""
      );
    }, []);

    const handleReset = useCallback(() => {
      onFilterChange({ status: "", month: "" });
      onOpenChange(false);
    }, [onFilterChange, onOpenChange]);

    const handleApply = useCallback(() => {
      onFilterChange({ status: tempStatus, month: tempMonth });
      onOpenChange(false);
    }, [onFilterChange, onOpenChange, tempStatus, tempMonth]);

    const handleClose = useCallback(() => {
      onOpenChange(false);
    }, [onOpenChange]);

    const selectedStatusLabel =
      STATUSES.find((status) => status.value === tempStatus)?.label ||
      "All Status";
    const selectedMonthLabel =
      MONTHS.find((month) => month.value === tempMonth)?.label || "All Months";

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
                    Filter Data
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
                Filter data by status and month
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
                  Selected: {selectedStatusLabel}
                </Text>
              </YStack>

              <YStack gap="$2">
                <Label fontSize={14} fontWeight="500" color="$gray12">
                  Month
                </Label>

                <YStack
                  borderWidth={1}
                  borderColor="$gray7"
                  borderRadius="$3"
                  backgroundColor="$gray2"
                  overflow="hidden"
                >
                  <RNPickerSelect
                    value={tempMonth}
                    onValueChange={handleMonthChange}
                    items={MONTHS.map((month) => ({
                      label: month.label,
                      value: month.value,
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
                  Selected: {selectedMonthLabel}
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

FilterOrdersDialog.displayName = "FilterOrdersDialog";

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

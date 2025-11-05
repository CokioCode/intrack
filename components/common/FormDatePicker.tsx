import { useState } from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { YStack, Text, Button, XStack } from "tamagui";
import { Calendar } from "@tamagui/lucide-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";

interface FormDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

export function FormDatePicker<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Select date",
  error,
  disabled = false,
}: FormDatePickerProps<T>) {
  const [show, setShow] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        const dateValue = value ? new Date(value) : new Date();
        const formattedDate = value
          ? new Date(value).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
          : "";

        const handleDateChange = (event: any, selectedDate?: Date) => {
          setShow(Platform.OS === "ios");
          if (selectedDate) {
            onChange(selectedDate.toISOString().split("T")[0]);
          }
        };

        return (
          <YStack gap="$2">
            {label && (
              <Text fontSize="$3" fontWeight="600" color="$gray12">
                {label}
              </Text>
            )}

            <Button
              backgroundColor="white"
              borderWidth={1}
              borderColor={error ? "$red7" : "$gray7"}
              color={formattedDate ? "$gray12" : "$gray10"}
              justifyContent="flex-start"
              iconAfter={<Calendar size={18} color="$gray10" />}
              onPress={() => !disabled && setShow(true)}
              disabled={disabled}
              opacity={disabled ? 0.5 : 1}
              pressStyle={{ opacity: 0.7 }}
            >
              {formattedDate || placeholder}
            </Button>

            {show && (
              <DateTimePicker
                value={dateValue}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleDateChange}
              />
            )}

            {error && (
              <Text fontSize="$2" color="$red10">
                {error}
              </Text>
            )}
          </YStack>
        );
      }}
    />
  );
}

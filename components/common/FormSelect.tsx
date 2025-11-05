import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { YStack, Text } from "tamagui";
import RNPickerSelect from "react-native-picker-select";
import { StyleSheet } from "react-native";
import { ChevronDown } from "@tamagui/lucide-icons";

interface SelectOption {
  label: string;
  value: string;
}

interface FormSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export function FormSelect<T extends FieldValues>({
  name,
  control,
  label,
  placeholder = "Select an option",
  options,
  error,
  required = false,
  disabled = false,
}: FormSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <YStack gap="$2" width="100%">
          {label && (
            <Text fontSize="$3" fontWeight="600" color="$gray12">
              {label}
              {required && (
                <Text color="$red10" marginLeft="$1">
                  *
                </Text>
              )}
            </Text>
          )}

          <YStack
            borderWidth={1}
            borderColor={error ? "$red7" : "$gray7"}
            borderRadius="$3"
            backgroundColor="white"
            justifyContent="center"
            paddingHorizontal={12}
            height={52}
          >
            <RNPickerSelect
              onValueChange={onChange}
              value={value}
              disabled={disabled}
              items={options}
              placeholder={{ label: placeholder, value: null }}
              style={pickerSelectStyles}
              Icon={() => <ChevronDown size={18} color="#666" />}
              useNativeAndroidPickerStyle={false}
            />
          </YStack>

          {error && (
            <Text fontSize="$2" color="$red10">
              {error}
            </Text>
          )}
        </YStack>
      )}
    />
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    color: "#000",
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 10,
    color: "#000",
  },
  iconContainer: {
    top: 12,
    right: 10,
  },
});

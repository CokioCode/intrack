import { useState, useEffect, useCallback } from "react";
import { Input, XStack, YStack, Button, styled, Theme } from "tamagui";
import { Search, X } from "@tamagui/lucide-icons";
import { Pressable } from "react-native";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  debounceMs?: number;
  showClearButton?: boolean;
  disabled?: boolean;
  variant?: "default" | "rounded" | "outlined";
}

const StyledInput = styled(Input, {
  flex: 1,
  borderWidth: 0,
  backgroundColor: "transparent",
  fontSize: "$4",
  color: "$gray12",

  variants: {
    variant: {
      default: {
        placeholderTextColor: "$gray10",
      },
      rounded: {
        placeholderTextColor: "$gray9",
      },
      outlined: {
        placeholderTextColor: "$gray10",
      },
    },
  } as const,
});

export const SearchInput = ({
  placeholder = "Search...",
  value: controlledValue,
  onChange,
  onSearch,
  debounceMs = 300,
  showClearButton = true,
  disabled = false,
  variant = "default",
}: SearchInputProps) => {
  const [internalValue, setInternalValue] = useState(controlledValue || "");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue]);

  useEffect(() => {
    if (!onSearch) return;
    const timer = setTimeout(() => {
      onSearch(internalValue);
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [internalValue, debounceMs, onSearch]);

  const handleChange = useCallback(
    (text: string) => {
      setInternalValue(text);
      onChange?.(text);
    },
    [onChange]
  );

  const handleClear = useCallback(() => {
    setInternalValue("");
    onChange?.("");
    onSearch?.("");
  }, [onChange, onSearch]);

  const getContainerStyle = () => {
    switch (variant) {
      case "rounded":
        return {
          backgroundColor: "$gray3",
          borderRadius: "$12",
          borderWidth: 0,
          paddingHorizontal: "$4",
          paddingVertical: "$3",
          ...(isFocused && {
            backgroundColor: "$gray4",
            shadowColor: "$blue8",
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 2,
          }),
        };
      case "outlined":
        return {
          backgroundColor: "$background",
          borderRadius: "$4",
          borderWidth: 1.5,
          borderColor: isFocused ? "$blue9" : "$gray6",
          paddingHorizontal: "$4",
          paddingVertical: "$3",
          ...(isFocused && {
            borderColor: "$blue9",
            shadowColor: "$blue8",
            shadowOpacity: 0.15,
            shadowRadius: 6,
            elevation: 2,
          }),
        };
      default:
        return {
          backgroundColor: "$gray2",
          borderRadius: "$3",
          borderWidth: 1,
          borderColor: isFocused ? "$blue8" : "$gray5",
          paddingHorizontal: "$3.5",
          paddingVertical: "$1.5",
        };
    }
  };

  return (
    <XStack
      ai="center"
      animation="quick"
      {...getContainerStyle()}
      opacity={disabled ? 0.5 : 1}
    >
      <Search size={20} color={isFocused ? "$blue10" : "$gray10"} />

      <StyledInput
        variant={variant}
        placeholder={placeholder}
        value={internalValue}
        onChangeText={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        placeholderTextColor="$gray9"
      />

      {showClearButton && internalValue && !disabled && (
        <Pressable onPress={handleClear}>
          <XStack
            backgroundColor="$gray5"
            borderRadius="$10"
            padding="$1.5"
            hoverStyle={{
              backgroundColor: "$gray6",
            }}
            pressStyle={{
              backgroundColor: "$gray7",
              scale: 0.95,
            }}
            animation="quick"
          >
            <X size={16} color="$gray11" />
          </XStack>
        </Pressable>
      )}
    </XStack>
  );
};

import React, { useState } from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Input, Text, XStack, YStack, Button } from "tamagui";
import { Eye, EyeOff } from "@tamagui/lucide-icons";
import type { InputProps } from "tamagui";

export function FormPassword<T extends FieldValues>({
  control,
  name,
  label,
  error,
  disabled,
  required,
  ...inputProps
}: {
  control: Control<T>;
  name: Path<T>;
  label: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
} & Omit<InputProps, "name">) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <YStack gap={8}>
      <Text fontSize={14} color="#1A1A1A" fontWeight="500">
        {label}
        {required && <Text color="#FF3B30"> *</Text>}
      </Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <XStack
            alignItems="center"
            backgroundColor="white"
            borderRadius={6}
            borderWidth={1}
            borderColor={error ? "#FF3B30" : "#E0E0E0"}
            paddingHorizontal={12}
            height={52}
          >
            <Input
              flex={1}
              value={value || ""}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={!showPassword}
              disabled={disabled}
              unstyled
              paddingLeft={12}
              fontSize={15}
              color="#1A1A1A"
              {...inputProps}
            />
            <Button
              unstyled
              onPress={() => setShowPassword(!showPassword)}
              padding={4}
              chromeless
              disabled={disabled}
            >
              {showPassword ? (
                <Eye size={20} color="#999999" />
              ) : (
                <EyeOff size={20} color="#999999" />
              )}
            </Button>
          </XStack>
        )}
      />
      {error && (
        <Text fontSize={12} color="#FF3B30">
          {error}
        </Text>
      )}
    </YStack>
  );
}

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, H3, Text, XStack, YStack } from "tamagui";
import { LoginInput, loginSchema } from "@/types/authTypes";
import { FormInput } from "@/components/common/FormInput";
import { FormPassword } from "@/components/common/FormPassword";

export const LoginForm = ({
  onSubmit,
  isPending = false,
  error = null,
}: {
  onSubmit: (data: LoginInput) => void;
  isPending?: boolean;
  error?: { message?: string } | null;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <YStack paddingHorizontal={24} paddingTop={32} gap={20}>
      <YStack gap={4}>
        <H3>Sign In</H3>
        <Text fontSize={14} color="#666666">
          Welcome to the Indibiz monitoring app.
        </Text>
      </YStack>

      <YStack gap={16}>
        <FormInput
          control={control}
          name="username"
          label="Username"
          placeholder="Enter your username"
          autoCapitalize="none"
          error={errors.username?.message}
          disabled={isPending}
        />

        <FormPassword
          control={control}
          name="password"
          label="Password"
          placeholder="Enter Password"
          error={errors.password?.message}
          disabled={isPending}
        />

        {error && (
          <XStack
            backgroundColor="#FFEBEE"
            padding={12}
            borderRadius={6}
            borderWidth={1}
            borderColor="#FFCDD2"
          >
            <Text fontSize={13} color="#C62828">
              {error.message || "Login failed. Please try again."}
            </Text>
          </XStack>
        )}

        <Button
          backgroundColor="#0721A9"
          color="white"
          fontSize={16}
          fontWeight="600"
          height={50}
          borderRadius={6}
          marginTop={16}
          onPress={handleSubmit(onSubmit)}
          disabled={isPending || !isValid}
          opacity={isPending || !isValid ? 0.6 : 1}
          pressStyle={{
            backgroundColor: "#0029A3",
            scale: 0.98,
          }}
        >
          {isPending ? "Signing in..." : "Sign In"}
        </Button>
      </YStack>
    </YStack>
  );
};

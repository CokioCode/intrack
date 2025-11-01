import React from "react";
import { YStack } from "tamagui";
import { ScrollView } from "tamagui";
import HeaderApp from "../common/HeaderApp";

export const AdminLayouts = ({
  variant = "home",
  children,
  subtitle,
  title = "Let’s Track your package",
}: {
  children: React.ReactNode;
  variant?: "home" | "settings";
  title?: string;
  subtitle?: string;
}) => {
  return (
    <YStack flex={1}>
      <HeaderApp variant={variant} title={title} subtitle={subtitle} />
      <ScrollView>
        <YStack flex={1}>{children}</YStack>
      </ScrollView>
    </YStack>
  );
};

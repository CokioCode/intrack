import { RootLayout } from "@/components";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <RootLayout>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </RootLayout>
  );
}

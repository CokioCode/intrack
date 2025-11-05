import { Stack } from "expo-router";

export default function BotLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="bots" />
      <Stack.Screen name="information" />
      <Stack.Screen name="keyword" />
    </Stack>
  );
}

import { LoginFooter } from "@/components/features/auth/LoginFooter";
import { LoginForm } from "@/components/features/auth/LoginForm";
import { LoginHeader } from "@/components/features/auth/LoginHeader";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "tamagui";
import { YStack } from "tamagui";

const LoginScreen = () => {
  const { login, isLoggingIn } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <YStack flex={1}>
        <LoginHeader />
        <LoginForm onSubmit={login} isPending={isLoggingIn} />
        <LoginFooter />
        <Button onPress={() => router.push("/bot")}>Bot</Button>
      </YStack>
    </SafeAreaView>
  );
};

export default LoginScreen;

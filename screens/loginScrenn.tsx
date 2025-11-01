import { LoginFooter } from "@/components/features/auth/LoginFooter";
import { LoginForm } from "@/components/features/auth/LoginForm";
import { LoginHeader } from "@/components/features/auth/LoginHeader";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { YStack } from "tamagui";

const LoginScrenn = () => {
  return (
    <SafeAreaView>
      <YStack>
        <LoginHeader />
        <LoginForm onSubmit={() => router.push("/home")} />
        <LoginFooter />
      </YStack>
    </SafeAreaView>
  );
};

export default LoginScrenn;

import { QueryProvider } from "@/providers";
import tamaguiConfig from "@/tamagui.config";
import { useFonts } from "expo-font";
import { useEffect, ReactNode } from "react";
import { TamaguiProvider } from "tamagui";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/authStrore";

import * as SplashScreen from "expo-splash-screen";
import { LogBox } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    LogBox.ignoreAllLogs();
    console.error = () => {};
    const defaultHandler = ErrorUtils.getGlobalHandler?.();
    ErrorUtils.setGlobalHandler?.((error, isFatal) => {
      console.log("Global error caught:", error.message);
      if (defaultHandler) defaultHandler(error, false);
    });
  }, []);

  const router = useRouter();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const role = useAuthStore((state) => state.role);

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded) {
        try {
          await SplashScreen.hideAsync();

          if (isAuthenticated) {
            if (role === "ADMIN") {
              router.replace("/home");
            } else {
              router.replace("/users/home");
            }
          } else {
            router.replace("/");
          }
        } catch (error) {
          console.warn("Error in splash screen handling:", error);
        }
      }
    };

    hideSplashScreen();
  }, [fontsLoaded, isAuthenticated]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryProvider>
      <TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>
    </QueryProvider>
  );
}

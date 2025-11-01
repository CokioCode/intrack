import { QueryProvider } from "@/providers";
import tamaguiConfig from "@/tamagui.config";
import { useFonts } from "expo-font";
import { useEffect, ReactNode } from "react";
import { TamaguiProvider } from "tamagui";

import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout({ children }: { children: ReactNode }) {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded) {
        try {
          await SplashScreen.hideAsync();
        } catch (error) {
          console.warn("Error hiding splash screen:", error);
        }
      }
    };

    hideSplashScreen();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryProvider>
      <TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>
    </QueryProvider>
  );
}

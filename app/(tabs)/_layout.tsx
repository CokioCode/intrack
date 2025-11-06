import { Bot, Building2, Home, ShoppingCart } from "@tamagui/lucide-icons";
import { Tabs } from "expo-router";
import { Dimensions, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "tamagui";

export default function Layout() {
  const theme = useTheme();

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get("window");

  const scale = (size: number) => (SCREEN_WIDTH / 375) * size;
  const verticalScale = (size: number) => (SCREEN_HEIGHT / 812) * size;
  const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

  const tabBarHeight = verticalScale(80);
  const tabBarPaddingTop = verticalScale(8);
  const tabBarLabelFontSize = moderateScale(8);
  const tabBarIconSize = moderateScale(20);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: theme.gray9?.val || "#8E8E93",
          tabBarStyle: {
            backgroundColor: "#071333",
            borderTopColor: theme.borderColor?.val || "#E5E5EA",
            borderTopWidth: 1,
            height: tabBarHeight,
            paddingTop: tabBarPaddingTop,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarLabelStyle: {
            fontSize: tabBarLabelFontSize,
            fontWeight: "600",
            marginTop: verticalScale(4),
          },
          tabBarIconStyle: {
            marginTop: verticalScale(4),
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Home
                color={color}
                size={focused ? tabBarIconSize + 2 : tabBarIconSize}
                strokeWidth={focused ? 2.5 : 2}
              />
            ),
            title: "Home",
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <ShoppingCart
                color={color}
                size={focused ? tabBarIconSize + 2 : tabBarIconSize}
                strokeWidth={focused ? 2.5 : 2}
              />
            ),
            title: "Orders",
          }}
        />
        <Tabs.Screen
          name="bot"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Bot
                color={color}
                size={focused ? tabBarIconSize + 2 : tabBarIconSize}
                strokeWidth={focused ? 2.5 : 2}
              />
            ),
            title: "Bot",
          }}
        />
        <Tabs.Screen
          name="indibiz"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Building2
                color={color}
                size={focused ? tabBarIconSize + 2 : tabBarIconSize}
                strokeWidth={focused ? 2.5 : 2}
              />
            ),
            title: "Indibiz",
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

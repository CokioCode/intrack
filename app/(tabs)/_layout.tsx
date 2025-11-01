import { Bot, Building2, Home, ShoppingCart } from "@tamagui/lucide-icons";
import { Tabs } from "expo-router";
import { useTheme } from "tamagui";

export default function Layout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: theme.gray9?.val || "#8E8E93",
        tabBarStyle: {
          backgroundColor: "#071333",
          borderTopColor: theme.borderColor?.val || "#E5E5EA",
          borderTopWidth: 1,
          height: 80,
          paddingTop: 8,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Home
              color={color}
              size={focused ? size + 2 : size}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <ShoppingCart
              color={color}
              size={focused ? size + 2 : size}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
          title: "Orders",
        }}
      />
      <Tabs.Screen
        name="bot"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Bot
              color={color}
              size={focused ? size + 2 : size}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
          title: "Bot",
        }}
      />
      <Tabs.Screen
        name="indibiz"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Building2
              color={color}
              size={focused ? size + 2 : size}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
          title: "Indibiz",
        }}
      />
    </Tabs>
  );
}

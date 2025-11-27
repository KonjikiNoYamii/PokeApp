// DrawerNavigator.tsx
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabsNavigator from "./BottomTabsNavigator";
import SettingsScreen from "../screens/SettingsScreen";
import { useTheme } from "../context/ThemeContext";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { isDark } = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: isDark ? "#121212" : "#ffffff" },
        headerTintColor: isDark ? "#f2f2f2" : "#222",
        drawerStyle: { backgroundColor: isDark ? "#1a1a1a" : "#fff" },
        drawerLabelStyle: { fontWeight: "600", color: isDark ? "#f2f2f2" : "#222" },
        drawerActiveBackgroundColor: isDark ? "#333" : "#e6e6e6",
        drawerActiveTintColor: isDark ? "#ff7f50" : "#ff3d3d",
        drawerInactiveTintColor: isDark ? "#aaa" : "#555",
      }}
    >
      <Drawer.Screen name="Home" component={BottomTabsNavigator} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

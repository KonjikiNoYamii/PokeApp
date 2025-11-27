import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../screens/ProfileScreen";
import TopTabsScreen from "./TopTabsNavigator";
import { useTheme } from "../context/ThemeContext";
import { View, Text } from "react-native";
import Ionicons from '@react-native-vector-icons/ionicons';

const Tab = createBottomTabNavigator();

export default function BottomTabsNavigator() {
  const { isDark } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? "#121212" : "#ffffff",
          borderTopWidth: 0,
          elevation: 8,
          shadowOpacity: 0.3,
        },
        tabBarActiveTintColor: isDark ? "#ff7f50" : "#ff3d3d",
        tabBarInactiveTintColor: isDark ? "#888" : "#555",
      }}
    >
      <Tab.Screen
        name="PokemonList"
        component={TopTabsScreen}
        options={{
          title: "Pokemon",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

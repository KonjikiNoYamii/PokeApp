import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../screens/ProfileScreen";
import TopTabsScreen from "./TopTabsNavigator";
import { useTheme } from "../context/ThemeContext";
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
          shadowOpacity: 0.25,

          height: 55,    
          paddingBottom: 6,
          paddingTop: 6,
        },
        tabBarActiveTintColor: isDark ? "#ff7f50" : "#ff3d3d",
        tabBarInactiveTintColor: isDark ? "#888" : "#555",
        tabBarLabelStyle: {
          fontSize: 11, 
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="PokemonList"
        component={TopTabsScreen}
        options={{
          title: "Pokemon",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size - 2} color={color} /> 
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size - 2} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

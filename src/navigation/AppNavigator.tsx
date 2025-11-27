import React from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import PokemonDetailScreen from '../screens/PokemonDetailScreen';
import DrawerNavigator from './DrawerNavigator';
import LoginScreen from '../screens/LoginScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import AboutScreen from '../screens/AboutScreen';
import { useTheme } from '../context/ThemeContext';

// Definisikan tipe untuk params setiap screen
export type RootStackParamList = {
  Login: undefined;
  MainApp: undefined;
  Detail: { name: string }; // <-- pastikan ada name
  EditProfile: undefined;
  About: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { isDark } = useTheme();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: isDark ? '#121212' : '#f8f9fa' },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen name="MainApp" component={DrawerNavigator} />

        <Stack.Screen
          name="Detail"
          component={PokemonDetailScreen}
          options={({ route }: { route: NativeStackScreenProps<RootStackParamList, 'Detail'>['route'] }) => {
            const { isDark } = useTheme(); 
            return {
              headerShown: true,
              title:
                route.params.name.charAt(0).toUpperCase() +
                route.params.name.slice(1),
              headerStyle: { backgroundColor: isDark ? '#1f1f1f' : '#fff' },
              headerTintColor: isDark ? '#fff' : '#000',
              contentStyle: { backgroundColor: isDark ? '#121212' : '#f8f9fa' },
            };
          }}
        />

        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

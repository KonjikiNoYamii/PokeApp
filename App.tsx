import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { FavoriteProvider } from "./src/context/FavoritesContext";
import { AuthProvider } from "./src/context/AuthContext";
import { ThemeProvider } from "./src/context/ThemeContext";


export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
      <FavoriteProvider>
        <AppNavigator/>
\    </FavoriteProvider>
    </AuthProvider>
    </ThemeProvider>
  );
}

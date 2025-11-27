import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

const THEME_KEY = "@app:theme";

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDark, setIsDark] = useState(false);

  // Load theme dari AsyncStorage tanpa blocking render
  useEffect(() => {
    AsyncStorage.getItem(THEME_KEY)
      .then((storedTheme) => {
        if (storedTheme === "dark") setIsDark(true);
      })
      .catch((e) => console.log("Gagal load theme:", e));
  }, []);

  // Simpan theme ke AsyncStorage dengan useCallback supaya stabil
  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const newTheme = !prev;
      AsyncStorage.setItem(THEME_KEY, newTheme ? "dark" : "light").catch((e) =>
        console.log("Gagal menyimpan theme:", e)
      );
      return newTheme;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

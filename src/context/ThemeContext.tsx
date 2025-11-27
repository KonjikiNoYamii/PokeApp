// context/ThemeContext.tsx
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

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(THEME_KEY);
        if (storedTheme !== null) {
          setIsDark(storedTheme === "dark");
        }
      } catch (e) {
        console.log("Gagal load theme:", e);
      }
    };
    loadTheme();
  }, []);

  // Toggle instan tanpa menunggu penyimpanan
  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const newTheme = !prev;
      // Simpan di background
      AsyncStorage.setItem(THEME_KEY, newTheme ? "dark" : "light").catch(err => console.log(err));
      return newTheme;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

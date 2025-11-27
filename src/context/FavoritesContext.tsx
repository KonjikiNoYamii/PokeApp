// FavoriteContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Pokemon = { name: string; image: string };

type FavoriteContextType = {
  favorites: Pokemon[];
  addFavorite: (pokemon: Pokemon) => void;
  removeFavorite: (name: string) => void;
};

const STORAGE_KEY = "@favorites";

const FavoriteContext = createContext<FavoriteContextType | null>(null);

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  // Load favorites dari AsyncStorage saat app start
  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) setFavorites(JSON.parse(json));
      } catch (e) {
        console.log("Failed to load favorites", e);
      }
    })();
  }, []);

  const saveFavorites = async (newFavorites: Pokemon[]) => {
    setFavorites(newFavorites);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
    } catch (e) {
      console.log("Failed to save favorites", e);
    }
  };

  function addFavorite(pokemon: Pokemon) {
    const exists = favorites.find(p => p.name === pokemon.name);
    if (!exists) saveFavorites([...favorites, pokemon]);
  }

  function removeFavorite(name: string) {
    saveFavorites(favorites.filter(p => p.name !== name));
  }

  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const ctx = useContext(FavoriteContext);
  if (!ctx) throw new Error("useFavorite must be inside FavoriteProvider");
  return ctx;
}

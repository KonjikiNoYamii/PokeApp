import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  user: string | null;
  avatar: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUsername: (newName: string) => Promise<void>;
  updateAvatar: (uri: string) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  avatar: null,
  login: async () => {},
  logout: async () => {},
  updateUsername: async () => {},
  updateAvatar: async () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  // Key storage per-user
  const getAvatarKey = (username: string) => `@auth:avatar:${username}`;

  // Load user dan avatar saat app start
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("@auth:user");
        if (storedUser) {
          setUser(storedUser);
          const storedAvatar = await AsyncStorage.getItem(getAvatarKey(storedUser));
          if (storedAvatar) setAvatar(storedAvatar);
        }
      } catch (err) {
        console.log("Gagal load data user:", err);
      }
    };
    loadUserData();
  }, []);

  // Login / register
  const login = async (username: string, password: string) => {
    setUser(username);
    await AsyncStorage.setItem("@auth:user", username);

    // Load avatar jika ada
    const storedAvatar = await AsyncStorage.getItem(getAvatarKey(username));
    if (storedAvatar) setAvatar(storedAvatar);
    else setAvatar(null);
  };

  const logout = async () => {
    if (user) {
      setUser(null);
      setAvatar(null);
      await AsyncStorage.removeItem("@auth:user");
    }
  };

  const updateUsername = async (newName: string) => {
    if (!user) return;
    const oldKey = getAvatarKey(user);
    const newKey = getAvatarKey(newName);

    const storedAvatar = await AsyncStorage.getItem(oldKey);
    if (storedAvatar) {
      await AsyncStorage.setItem(newKey, storedAvatar);
      await AsyncStorage.removeItem(oldKey);
    }

    setUser(newName);
    await AsyncStorage.setItem("@auth:user", newName);
  };

  const updateAvatar = async (uri: string) => {
    if (!user) return;
    setAvatar(uri);
    await AsyncStorage.setItem(getAvatarKey(user), uri);
  };

  return (
    <AuthContext.Provider
      value={{ user, avatar, login, logout, updateUsername, updateAvatar, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user';

const USERS_KEY = 'users';
const LOGGED_IN_USER_KEY = 'loggedInUser';

// Ambil semua user
export const getAllUsers = async (): Promise<Record<string, User>> => {
  const storedUsers = await AsyncStorage.getItem(USERS_KEY);
  return storedUsers ? JSON.parse(storedUsers) : {};
};

// Simpan semua user
export const saveAllUsers = async (users: Record<string, User>) => {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Login atau register user
export const loginOrRegister = async (username: string, password: string) => {
  const users = await getAllUsers();

  if (users[username]) {
    if (users[username].password === password) {
      await AsyncStorage.setItem(LOGGED_IN_USER_KEY, username);
      return { status: 'login', user: users[username] };
    } else {
      throw new Error('Password salah desuwah!');
    }
  } else {
    // Register baru
    const newUser: User = { password, data: {} };
    users[username] = newUser;
    await saveAllUsers(users);
    await AsyncStorage.setItem(LOGGED_IN_USER_KEY, username);
    return { status: 'register', user: newUser };
  }
};

// Logout
export const logout = async () => {
  await AsyncStorage.removeItem(LOGGED_IN_USER_KEY);
};

// Ambil user yang sedang login
export const getLoggedInUser = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(LOGGED_IN_USER_KEY);
};

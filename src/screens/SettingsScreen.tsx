import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function SettingsScreen() {
  const navigation = useNavigation<any>();
  const { logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const handleLogout = async () => {
    await logout();
    Alert.alert("Info", "Anda telah logout.");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: isDark ? "#121212" : "#f2f5f8" }]}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      <Text style={[styles.title, { color: isDark ? "#fff" : "#222" }]}>Pengaturan</Text>

      <View style={[styles.settingCard, { backgroundColor: isDark ? "#1e1e1e" : "#fff" }]}>
        <Text style={[styles.settingLabel, { color: isDark ? "#fff" : "#222" }]}>
          Tema {isDark ? "Gelap" : "Terang"}
        </Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>

      <View style={[styles.settingCard, { backgroundColor: isDark ? "#1e1e1e" : "#fff" }]}>
        <Text style={[styles.settingLabel, { color: isDark ? "#fff" : "#222" }]}>Notifikasi</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>

      <Pressable
        style={[styles.settingCard, { backgroundColor: isDark ? "#1e1e1e" : "#fff" }]}
        onPress={() => navigation.navigate("About")}
      >
        <Text style={[styles.settingLabel, { color: isDark ? "#fff" : "#222" }]}>Tentang Aplikasi</Text>
        <Text style={[styles.chevron, { color: isDark ? "#ccc" : "#888" }]}>›</Text>
      </Pressable>

      <Pressable
        style={[styles.settingCard, styles.logoutCard]}
        onPress={handleLogout}
      >
        <Text style={[styles.settingLabel, { color: "#fff" }]}>Logout</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  settingCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  chevron: {
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutCard: {
    backgroundColor: "#dc3545",
    justifyContent: "center",
  },
});

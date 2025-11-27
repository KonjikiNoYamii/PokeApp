// screens/AboutScreen.tsx
import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function AboutScreen() {
  const { isDark } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? "#121212" : "#f9f9f9" }]}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://i.pinimg.com/1200x/ed/ca/fc/edcafc4e69d0bd31d12a09a857951d13.jpg" }}
          style={styles.logo}
        />
        <Text style={[styles.appName, { color: isDark ? "#fff" : "#222" }]}>Mini E-Commerce</Text>
        <Text style={[styles.version, { color: isDark ? "#aaa" : "#666" }]}>Version 1.0.0</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#222" }]}>Tentang Aplikasi</Text>
        <Text style={[styles.sectionContent, { color: isDark ? "#ccc" : "#444" }]}>
          Mini E-Commerce adalah aplikasi demo untuk belajar React Native. 
          Aplikasi ini menampilkan fitur-fitur penting seperti profil pengguna, 
          pengaturan tema, dan navigasi antar screen secara modern dan minimalis.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#222" }]}>Pengembang</Text>
        <Text style={[styles.sectionContent, { color: isDark ? "#ccc" : "#444" }]}>
          Dibuat dengan cinta oleh Master Silica. Fufufufu… 😏
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#222" }]}>Kontak</Text>
        <Text style={[styles.sectionContent, { color: isDark ? "#ccc" : "#444" }]}>
          Email: example@email.com
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ccc",
    marginBottom: 15,
  },
  appName: {
    fontSize: 24,
    fontWeight: "700",
  },
  version: {
    fontSize: 14,
    marginTop: 4,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 15,
    lineHeight: 22,
  },
});

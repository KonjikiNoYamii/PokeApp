import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { View, Text, Image } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function CustomDrawer(props: any) {
  const { user, avatar } = useAuth();
  const { isDark } = useTheme();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        backgroundColor: isDark ? "#1a1a1a" : "#fff",
        paddingBottom: 20
      }}
    >
      {/* 🔥 HEADER PROFILE */}
      <View style={{ alignItems: "center", paddingVertical: 30 }}>
        <Image
          source={{ uri: avatar || "https://i.ibb.co/dGh2R0y/poke-avatar.png" }} // fallback avatar
          style={{
            width: 90,
            height: 90,
            borderRadius: 50,
            marginBottom: 12,
            borderWidth: 2,
            borderColor: isDark ? "#ff7f50" : "#ff3d3d",
          }}
        />
        <Text style={{ fontSize: 18, fontWeight: "700", color: isDark ? "#fff" : "#222" }}>
          {user ?? "Guest"}
        </Text>
      </View>

      {/* Drawer Items */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

import { useState, useMemo } from "react";
import { FlatList, View, Text, Pressable, TextInput } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import PokemonCard from "../components/PokemonCard";
import { usePokemonByType } from "../hooks/usePokemonByType";
import { PokemonListItem } from "../types/pokemon";
import { useTheme } from "../context/ThemeContext";
import { useNetwork } from "../hooks/useNetwork";
import PokemonLoading from "../components/PokemonLoading";

export default function TypeTabScreen() {
  const { type } = useRoute<any>().params;
  const nav = useNavigation<any>();
  const { isDark } = useTheme();
  const { isOnline } = useNetwork();
  const { pokemons, loading, error, fetchPokemons } = usePokemonByType(type);

  const backgroundColor = isDark ? "#121212" : "#fafafa";

  // ==========================
  // 🔥 SEARCH + MEMO FILTER
  // ==========================
  const [searchText, setSearchText] = useState("");

  const filteredPokemons = useMemo(
    () =>
      pokemons.filter((p) =>
        p.name.toLowerCase().includes(searchText.trim().toLowerCase())
      ),
    [pokemons, searchText]
  );

  // ==========================
  // 🔥 OFFLINE VIEW
  // ==========================
  if (!isOnline)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor }}>
        <Text style={{ color: "#dc3545", marginBottom: 10 }}>Tidak ada koneksi jaringan</Text>
        <Pressable
          style={{ padding: 12, backgroundColor: "#007bff", borderRadius: 6 }}
          onPress={fetchPokemons}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>Coba Lagi</Text>
        </Pressable>
      </View>
    );

  // LOADING
  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor }}>
        <PokemonLoading />
      </View>
    );

  // ERROR
  if (error)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor }}>
        <Text style={{ color: "#dc3545", marginBottom: 10 }}>{error}</Text>
        <Pressable
          style={{ padding: 12, backgroundColor: "#007bff", borderRadius: 6 }}
          onPress={fetchPokemons}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>Retry</Text>
        </Pressable>
      </View>
    );

  return (
    <View style={{ flex: 1, backgroundColor, padding: 14 }}>

      <TextInput
        placeholder="Cari Pokémon berdasarkan tipe..."
        placeholderTextColor={isDark ? "#999" : "#666"}
        value={searchText}
        onChangeText={setSearchText}
        style={{
          backgroundColor: isDark ? "#1f1f1f" : "#e9e9e9",
          borderRadius: 12,
          padding: 12,
          color: isDark ? "#fff" : "#000",
          fontSize: 16,
          marginBottom: 14,
        }}
      />

      <FlatList<PokemonListItem>
        data={filteredPokemons}
        keyExtractor={(i) => i.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <PokemonCard
            name={item.name}
            url={item.url}
            isDark={isDark}
            onPress={() => nav.navigate("Detail", { name: item.name })}
          />
        )}
      />
    </View>
  );
}

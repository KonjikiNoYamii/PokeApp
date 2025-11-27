// screens/TypeTabScreen.tsx
import React, { useState } from "react";
import { FlatList, View, ActivityIndicator, Text, Pressable, TextInput } from "react-native";
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

  const [searchText, setSearchText] = useState("");

  const backgroundColor = isDark ? "#121212" : "#fafafa";
  const textColor = isDark ? "#eee" : "#222";

  // Filter Pokémon sesuai search
  const filteredPokemons = pokemons.filter(p =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

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

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor }}>
        <PokemonLoading />
      </View>
    );

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
      {/* SEARCH BAR */}
      <TextInput
        placeholder="Cari Pokémon..."
        placeholderTextColor={isDark ? "#aaa" : "#555"}
        value={searchText}
        onChangeText={setSearchText}
        style={{
          backgroundColor: isDark ? "#2a2a2a" : "#eee",
          borderRadius: 12,
          padding: 10,
          marginBottom: 12,
          color: isDark ? "#fff" : "#000",
        }}
      />

      <FlatList<PokemonListItem>
        data={filteredPokemons}
        showsVerticalScrollIndicator={false}
        keyExtractor={(i) => i.name}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <PokemonCard
            name={item.name}
            url={item.url}
            onPress={() => nav.navigate("Detail", { name: item.name })}
            isDark={isDark}
          />
        )}
      />
    </View>
  );
}

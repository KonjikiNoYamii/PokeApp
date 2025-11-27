// screens/AllPokemonTab.tsx
import React, { useState } from "react";
import { FlatList, ActivityIndicator, View, Text, Pressable, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { usePokemons } from "../hooks/usePokemons";
import PokemonCard from "../components/PokemonCard";
import { PokemonListItem } from "../types/pokemon";
import { useTheme } from "../context/ThemeContext"; 
import PokemonLoading from "../components/PokemonLoading";

export default function AllPokemonTab() {
  const nav = useNavigation<any>();
  const { pokemons, loading, error, fetchPokemons } = usePokemons();
  const { isDark } = useTheme(); 

  const [searchText, setSearchText] = useState("");

  const backgroundColor = isDark ? "#121212" : "#fafafa";

  // Filter pokemon sesuai search
  const filteredPokemons = pokemons.filter(p =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
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
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: "#007bff",
            borderRadius: 6,
          }}
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

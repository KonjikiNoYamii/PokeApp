// screens/AllPokemonTab.tsx
import { useState, useMemo } from "react";
import { FlatList, View, Text, Pressable, TextInput } from "react-native";
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

  // 🔥 optimized filter — tidak re-render tiap ketik
  const filteredPokemons = useMemo(
    () =>
      pokemons.filter((p) =>
        p.name.toLowerCase().includes(searchText.trim().toLowerCase())
      ),
    [pokemons, searchText]
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

      {/* 🔥 SEARCH BAR */}
      <TextInput
        placeholder="Cari Pokémon..."
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

      {/* LIST */}
      <FlatList<PokemonListItem>
        data={filteredPokemons}
        showsVerticalScrollIndicator={false}
        keyExtractor={(i) => i.name}
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

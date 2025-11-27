import { FlatList, View, ActivityIndicator, Text, Pressable } from "react-native";
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
  const textColor = isDark ? "#eee" : "#222";

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
      <FlatList<PokemonListItem>
        data={pokemons}
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

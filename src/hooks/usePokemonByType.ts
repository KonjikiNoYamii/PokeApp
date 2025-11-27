import { useEffect, useState, useCallback } from "react";
import apiClient from "../api/apiClient";
import { PokemonListItem } from "../types/pokemon";

interface UsePokemonByTypeResult {
  pokemons: PokemonListItem[];
  loading: boolean;
  error: string | null;
  fetchPokemons: () => void;
}

export function usePokemonByType(type: string): UsePokemonByTypeResult {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemons = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.get(`/type/${type}`);
      const extracted: PokemonListItem[] = res.data.pokemon.map((p: any) => ({
        name: p.pokemon.name,
        url: p.pokemon.url,
      }));
      setPokemons(extracted);
    } catch (err: any) {
      setError("Gagal memuat Pokémon. Silahkan coba lagi.");
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  return { pokemons, loading, error, fetchPokemons };
}

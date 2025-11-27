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

  // 👉 timeout & delay seperti pada usePokemons()
  const requestTimeout = (ms: number) =>
    new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms));

  const fetchPokemons = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await Promise.race([
        apiClient.get(`/type/${type}`),
        requestTimeout(5000), 
      ]);

      // ⏳ delay agar konsisten dengan usePokemons()
      await new Promise(resolve => setTimeout<any>(resolve, 3000));

      const extracted: PokemonListItem[] = (res as any).data.pokemon.map((p: any) => ({
        name: p.pokemon.name,
        url: p.pokemon.url,
      }));

      setPokemons(extracted);
    } catch (err: any) {
      setError("Gagal memuat Pokémon berdasarkan type. Periksa koneksi lalu coba lagi.");
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  return { pokemons, loading, error, fetchPokemons };
}

import { useEffect, useState } from "react";
import { PokemonService } from "../api/pokemonServices";

export const usePokemons = () => {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemons = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await PokemonService.getPokemons(100);
      await new Promise((resolve: any) => setTimeout(resolve, 3000));
      setPokemons(data);
    } catch (err: any) {
      setError("Gagal memuat Pokémon. Silahkan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return { pokemons, loading, error, fetchPokemons };
};

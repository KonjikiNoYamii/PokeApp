import apiClient from "../api/apiClient";
import { PokemonDetailResponse, PokemonListResponse } from "../types/pokemon";


export async function getPokemonList(limit = 20, offset = 0): Promise<PokemonListResponse> {
  try {
    const res = await apiClient.get<PokemonListResponse>(`pokemon?limit=${limit}&offset=${offset}`);
    return res.data;
  } catch (error) {
    console.error("Error fetch Pokemon List:", error);
    throw new Error("Failed to load Pokémon list");
  }
}

export async function getPokemonDetail(name: string): Promise<PokemonDetailResponse> {
  try {
    const res = await apiClient.get<PokemonDetailResponse>(`pokemon/${name}`);
    return res.data;
  } catch (error) {
    console.error("Error fetch Pokemon Detail:", error);
    throw new Error("Failed to load Pokémon detail");
  }
}

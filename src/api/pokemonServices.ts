// /api/pokemonServices.ts
import apiClient from "./apiClient";

export const PokemonService = {

  getPokemons: async (limit = 50) => {
    const { data } = await apiClient.get(`/pokemon?limit=${limit}`);
    return data.results;
  },

  /** Detail Utama Pokemon */
  getPokemonDetail: async (name: string) => {
    const { data } = await apiClient.get(`/pokemon/${name}`);
    return data;
  },

  /** Species data (evolution chain url, habitat, color, growth_rate) */
  getPokemonSpecies: async (name: string) => {
    const { data } = await apiClient.get(`/pokemon-species/${name}`);
    return data;
  },

  /** Evolution chain */
  getEvolutionChain: async (url: string) => {
    const { data } = await apiClient.get(url.replace("https://pokeapi.co/api/v2",""));
    return data;
  },

  /** Moves List */
  getPokemonMoves: async (name: string) => {
    const { data } = await apiClient.get(`/pokemon/${name}`);
    return data.moves; 
  },


  getMoreData: async (name: string) => {
    const detail = await PokemonService.getPokemonDetail(name);
    const species = await PokemonService.getPokemonSpecies(name);
    const evolution = await PokemonService.getEvolutionChain(species.evolution_chain.url);

    return {
      basic: detail,
      species,
      evolution,
      stats: detail.stats,
      abilities: detail.abilities,
      moves: detail.moves
    };
  },

  /** TYPE — REGION — HABITAT tetap sama */
  getTypes: async () => {
    const { data } = await apiClient.get("/type");
    return data.results;
  },

  getRegions: async () => {
    const { data } = await apiClient.get("/region");
    return data.results;
  },

  getHabitats: async () => {
    const { data } = await apiClient.get("/pokemon-habitat");
    return data.results;
  },

  getPokemonByType: async (type:string) => {
    const { data } = await apiClient.get(`/type/${type}`);
    return data.pokemon.map((p:any)=>p.pokemon);
  },

  getPokemonByRegion: async (region:string) => {
    const { data } = await apiClient.get(`/region/${region}`);
    return data.pokedexes?.[0]?.pokemon_entries || [];
  },

  getPokemonByHabitat: async(habitat:string)=>{
    const { data } = await apiClient.get(`/pokemon-habitat/${habitat}`);
    return data.pokemon_species;
  }
};

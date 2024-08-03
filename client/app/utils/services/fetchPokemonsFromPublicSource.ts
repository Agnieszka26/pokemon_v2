import { Pokemon } from "@/app/core/types/Types";

const fetchPokemonsFromPublicSource = async (ids: string[]): Promise<Pokemon[]> => {
    try {
      const promises = ids.map(async (id) => {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const data = await response.json();

          const { height, id: pokemonId, sprites, name, weight, stats, types } = data;
          return { height, id: pokemonId, sprites, name,  weight, stats, types };

        } catch (error) {
          console.error(`Error fetching data for Pokemon with id ${id}:`, error);
          return undefined;
        }
      });

      const pokemons = await Promise.all(promises);
      return pokemons.filter(Boolean) as Pokemon[];
    } catch (error) {
      console.error("Error fetching pokemons:", error);
      throw error;
    }
  };
  export default fetchPokemonsFromPublicSource

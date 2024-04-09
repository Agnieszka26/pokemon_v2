import axios from 'axios';
import { PokemonResult, PokemonSprite } from './CarouselTypes';
import { useEffect, useState } from 'react';

export const usePokemonSprites = (
  loading: unknown,
  data: { getPokemons: { results: PokemonResult[] } } | undefined
) => {
  const [pokemonSprites, setPokemonSprites] = useState<string[]>([]);

  useEffect(() => {
    const fetchPokemonSprites = async () => {
      if (!loading && data) {
        const results: PokemonResult[] = data.getPokemons.results;
        const spritesPromises: Promise<string>[] = results.map(
          async (result) => {
            try {
              const response = await axios.get(result.url);
              const pokemonData: PokemonSprite = response.data.sprites;
              return pokemonData.front_default;
            } catch (error) {
              console.error('Error fetching sprite:', error);
              return '';
            }
          }
        );
        const sprites = await Promise.all(spritesPromises);
        setPokemonSprites(sprites);
      }
    };
    fetchPokemonSprites();
  }, [loading, data]);
  console.log({ pokemonSprites });
  return pokemonSprites;
};

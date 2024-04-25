import { PokemonResult } from '../../core/types/Types';
import { useEffect, useState } from 'react';

export const useFetchPokemonsSprites = (
  loading: boolean,
  pokemonData: PokemonResult[] | undefined
) => {
  const [pokemonsSprites, setPokemonsSprites] = useState<string[]>([]);

  useEffect(() => {
    const fetchPokemonsSprites = () => {
      if (!loading && pokemonData) {
        const pokemonsSpritesArray: string[] = pokemonData.map((result) => {
          return result.url.sprites.front_default;
        });

        setPokemonsSprites(pokemonsSpritesArray);
      }
    };

    fetchPokemonsSprites();
  }, [loading, pokemonData]);

  return pokemonsSprites;
};

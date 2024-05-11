'use client';
import React from 'react';

import { useQuery } from '@apollo/client';
import { useFetchPokemonsSprites } from './useFetchPokemonsSprites';

import PokemonCarouselComponent from './PokemonCarouselComponent';

import { GET_POKEMON_DATA } from '@/app/core/gql';

const PokemonCarouselContainer = () => {
  const { error, loading, data } = useQuery(GET_POKEMON_DATA, {
    variables: { limit: 5, offset: 0 },
  });

  const pokemonsResults = data?.getLimitedPokemons.results;

  const pokemonsFrontSprites = useFetchPokemonsSprites(
    loading,
    pokemonsResults
  );

  return (
    <>
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </div>
      <PokemonCarouselComponent
        loading={loading}
        pokemonData={pokemonsFrontSprites}
      />
    </>
  );
};

export default PokemonCarouselContainer;

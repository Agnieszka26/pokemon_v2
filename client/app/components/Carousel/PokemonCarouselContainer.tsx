'use client';

import React from 'react';

import { useQuery } from '@apollo/client';
import { usePokemonSprites } from './usePokemonSprites';

import PokemonCarouselComponent from './PokemonCarouselComponent';

//qgl query
import { GET_POKEMONS } from '@/app/core/gql';

const PokemonCarouselContainer = () => {
  const { error, loading, data } = useQuery(GET_POKEMONS, {
    variables: { limit: 5, offset: 0 },
  });

  const pokemonSprites = usePokemonSprites(loading, data);

  console.log(typeof pokemonSprites);

  return (
    <>
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </div>
      <PokemonCarouselComponent
        loading={loading}
        pokemonSprites={pokemonSprites}
      />
    </>
  );
};

export default PokemonCarouselContainer;

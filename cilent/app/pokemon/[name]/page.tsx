'use client';

import React, { useEffect, useState } from 'react';
import { Button, Carousel } from 'react-daisyui';

import { gql, useQuery } from '@apollo/client';
import axios from 'axios';

interface PokemonResult {
  name: string;
  url: string;
}

interface PokemonSprite {
  front_default: string;
}

export const GET_POKEMONS = gql`
  query GetPokemons($limit: Int!, $offset: Int!) {
    getPokemons(limit: $limit, offset: $offset) {
      results {
        name
        url
      }
    }
  }
`;
const Home = () => {
  const { error, loading, data } = useQuery(GET_POKEMONS, {
    variables: { limit: 5, offset: 0 },
  });

  const [pokemonSprites, setPokemonSprites] = useState<string[]>([]);

  useEffect(() => {
    const fetchPokemonSprites = async () => {
      if (!loading && data) {
        const results: PokemonResult[] = data.getPokemons.results;
        const spritesPromises: Promise<string>[] = results.map(async (result) => {
          try {
            const response = await axios.get(result.url);
            const pokemonData: PokemonSprite = response.data.sprites;
            return pokemonData.front_default;
          } catch (error) {
            console.error('Error fetching sprite:', error);
            return '';
          }
        });
        const sprites = await Promise.all(spritesPromises);
        setPokemonSprites(sprites);
      }
    };
    fetchPokemonSprites();
  }, [loading, data]);


  console.log({ pokemonSprites });

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && pokemonSprites.length > 0 && (
        <Carousel
          className="rounded-box"
          buttonStyle={(value: string) => (
            <Button color="primary">{value}</Button>
          )}
          display="sequential"
        >
          {pokemonSprites.map((sprite, i) => (
            <Carousel.Item key={i} src={sprite} alt={`Pokemon ${i + 1}`} />
          ))}
        </Carousel>
      )}
    </div>
  );
};
'use client';

import { GET_POKEMON } from '@/app/core/gql';
import { PokemonMongo, StatePokemonCarouselData } from '@/app/core/types/Types';
import fetchPokemonsFromPublicSource from '@/app/utils/services/fetchPokemonsFromPublicSource';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import CarouselDefault from './Carousel';



const formatPokemonsId = (data: PokemonMongo[]): string[] => {
  return data.map(({ id }) => id);
};

const initialState: StatePokemonCarouselData = {
  error: false,
  isLoading: true,
  data: undefined,
};

export const PokemonCarouselContainer = () => {
  const { data: queryData, loading: queryLoading, error: queryError } = useQuery(GET_POKEMON);
  const [state, setState] = useState<StatePokemonCarouselData>(initialState);

  useEffect(() => {
    const fetchPokemons = async () => {
      if (!queryData || queryLoading) return;

      try {
        const ids = formatPokemonsId(queryData.pokemons);
        const pokemons = await fetchPokemonsFromPublicSource(ids);

        setState({
          isLoading: false,
          error: false,
          data: pokemons,
        });
      } catch (error) {
        setState({
          isLoading: false,
          error: true,
          data: undefined,
        });
      }
    };

    fetchPokemons();
  }, [queryData, queryLoading]);

  if (state.isLoading) return <Loading />;
  if (queryError) return <p>{queryError.message}</p>;
  if (state.error) return <p>Error</p>;

  return <CarouselDefault data={state.data} />;
};

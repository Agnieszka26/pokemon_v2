import { gql } from '@apollo/client';

//fetch Pokemons array
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

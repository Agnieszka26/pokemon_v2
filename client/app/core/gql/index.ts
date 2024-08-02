import { gql } from '@apollo/client';

//fetch Pokemons array
export const GET_POKEMON_DATA = gql`
  query GetLimitedPokemons($limit: Int!, $offset: Int!) {
    getLimitedPokemons(limit: $limit, offset: $offset) {
      results {
        url {
          sprites {
            front_default
          }
        }
      }
    }
  }
`;

export const GET_POKEMON = gql`
query Query {
   pokemons {
    name
    id
    }
  }
`;

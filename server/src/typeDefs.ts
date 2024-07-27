import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    "Query to get pokemon specified by id"
    getPokemon(id: Int!): Pokemon!

    "pokemon from our db"
    pokemons: [BasePokemon]
    pokemon(id: Int): BasePokemon
    "Query to get pokemon array for the homepage carousel (paginated)"
    getLimitedPokemons(limit: Int!, offset: Int!): ResponsePaginationPokemon
  }

  type ResponsePaginationPokemon {
    count: Int
    next: String
    previous: String
    results: [NamedAPIResource!]!
  }

  type NamedAPIResource {
    name: String!
    url: Pokemon!
  }

  type Pokemon {
    id: Int!
    name: String!
    weight: Int
    base_experience: Int
    height: Int
    is_default: Boolean!
    order: Int
    pokemon_species_id: Int
    sprites: PokemonSprites!
  }

  type PokemonSprites {
    front_default: String
    front_shiny: String
  }

  "BasePokemon object"
  type BasePokemon {
    id: String
    name: String
  }
`;

export default typeDefs;

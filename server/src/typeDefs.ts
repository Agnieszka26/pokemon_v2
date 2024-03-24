import gql from "graphql-tag" 
 
 const typeDefs = gql`
 type Query {
     "Query to get pokemon specified by id"
     getPokemon(id: Int!): Pokemon!

     "Query to get pokemon array for the homepage carousel (paginated)"
     getPokemons(limit: Int!, offset: Int!): ResponsePaginationPokemon
 }

 type Pokemon {
    id: Int!
    name: String!
    weight: Int
    base_experience: Int
    height:Int
    is_default: Boolean!
    order: Int
    pokemon_species_id: Int
    sprites: PokemonSprites
}

type PokemonSprites {
    front_default: String
    front_shiny: String
}

 type ResponsePaginationPokemon{
    count: Int 
    next: String
    previous: String
    results:[NamedAPIResource]
 }

 type NamedAPIResource{
    name: String
    url: String
 }
 
 

`

 export default typeDefs;
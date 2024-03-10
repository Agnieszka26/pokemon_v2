import gql from "graphql-tag" 
 
 const typeDefs = gql`
 type Query {
     "Query to get pokemon array for the homepage carousel"
     getPokemon(id: Int!): Pokemon!
     "Query to get pokemon images for specific pokemon by ID"
     getPokemonSpritesByID(id: ID!): PokemonSpirytes!
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
 }

 type PokemonSpirytes{
     spirites: String
 
}`

 export default typeDefs;
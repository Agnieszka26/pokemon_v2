import gql from "graphql-tag";

const typeDefs = gql`
	type Query {
		"Query to get pokemon specified by id"
		getPokemon(id: Int!): Pokemon!

		"pokemon from our db"
		pokemons: [BasePokemon]
		pokemon(id: String!): BasePokemon
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

	"User type what we have in our db, and what we need in form in fr"
	type User {
		id: ID!
		name: String!
		email: String!
		nick: String!
	}

	"MUTATIONS: Great mystery"
	type Mutation {


	"credentials for registration we send, and we get string? (why string,not boolean I don't know yet"
	registerUser(
		name: String!
		email: String!
		nick: String!
		password: String!
		re_password: String!
	): String

		"user otrzmuje maila potwierdzającego i musi w niego kliknąć, żeby utworzyć konto, standardowa procedura - po stronie fr będzie: w folderze app folder activate_ser (albo jakoś inaczej) i poten dynamiczny folder o nazwie odpowiadającej tokenowi wygenerowanemu przez be"
		confirmEmail(token: String!): Boolean
		createPokemon(name: String!, id: ID):BasePokemon

	}
`;

// addMainPokemon():boolean
// {
//   "addMainPokemonId": "38",
//   "name":"Ninetales",
// }
export default typeDefs;

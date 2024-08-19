import { ApolloServer } from "@apollo/server";

import { MongoClient, ServerApiVersion } from "mongodb";

import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import gql from "graphql-tag";
import http from "http";
import PokemonMongo from "../src/datasource/mongo-api";
import PokemonAPI from "../src/datasource/pokemon-api";
// import typeDefs from "../src/typeDefs";
// import resolvers from "../src/resolvers";
// import PokemonAPI from "../src/datasource/pokemon-api";
// import PokemonMongo from "../src/datasource/mongo-api";
const resolvers = {
	Query: {
		// returns a base details of pokemons
		getPokemon: (__, { id }, { dataSources }) => {
			return dataSources.pokemonAPI.getPokemon(id);
		},
		// returns a paginated array of pokemons that will be used to populate the homepage carousel of our web client
		getLimitedPokemons: (__, { limit, offset }, { dataSources }) => {
			return dataSources.pokemonAPI.getLimitedPokemons(limit, offset);
		},
		//pokemons from custom mongodb
		pokemons: async (__, _, { dataSources }) => {
			return await dataSources.basePokemons.pokemons();
		},
		//pokemon by its id from custom mongodb
		pokemon: async (__, { pokemonId }, { dataSources }) => {
			return await dataSources.basePokemons.pokemon(pokemonId);
		},
	},
	NamedAPIResource: {
		url: ({ url }, _, { dataSources }) => {
			return dataSources.pokemonAPI.getPokemonByUrl(url);
		},
	},
};
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

dotenv.config();

const password = encodeURIComponent(process.env.SECRET_MONGODB);
const uri = `mongodb+srv://pokemonsv2:${password}@pokemonsv2.uczp40b.mongodb.net/?retryWrites=true&w=majority&appName=Pokemonsv2`;

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = http.createServer(app);

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

try {
	await client.connect();
	console.log("Connected to MongoDB successfully");
} catch (err) {
	console.error("Failed to connect to MongoDB", err);
	process.exit(1); // Exit process if the connection fails
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
	"/",
	cors<cors.CorsRequest>(),
	express.json(),
	expressMiddleware(server, {
		context: async ({ req }) => {
			const { cache } = server;

			return {
				token: req.headers.token,
				dataSources: {
					pokemonAPI: new PokemonAPI({ cache }),
					basePokemons: new PokemonMongo({
						modelOrCollection: client.db("pokemons").collection("ids"),
					}),
				},
			};
		},
	})
);

await new Promise<void>((resolve) =>
	httpServer.listen({ port: 4000 }, resolve)
);

console.log(`🚀 Server ready at http://localhost:4000/`);
export default httpServer;

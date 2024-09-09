import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import { MongoClient, ServerApiVersion } from "mongodb";
import resolvers from "./src/resolvers";
import typeDefs from "./src/typeDefs";

import PokemonMongo from "./src/datasource/mongo-api";
import PokemonAPI from "./src/datasource/pokemon-api";
import UserMongo from "./src/datasource/user-api";

dotenv.config();

const port = process.env.PORT || 5844;
const app = express();

// MongoDB Connection URI
const password = encodeURIComponent(process.env.SECRET_MONGODB);
const uri = `mongodb+srv://pokemonsv2:${password}@pokemonsv2.uczp40b.mongodb.net/?retryWrites=true&w=majority&appName=Pokemonsv2`;

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,

	},
});

const httpServer = http.createServer(app);

// Middleware
app.use(express.json());
app.use(cors());

const run = async () => {
	try {
		await client.connect(  );
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
		"/graphql",
		cors(), // Apply CORS middleware
		express.json(), // Apply JSON middleware
		expressMiddleware(server, {
			context: async ({ req }) => {
				const { cache } = server;
				return {
					token: req.headers.token,
					dataSources: {
						pokemonAPI: new PokemonAPI({ cache }), // External API Data Source
						basePokemons: new PokemonMongo({
							modelOrCollection: client.db("pokemons").collection("ids"), // MongoDB Collection
						}),
						users: new UserMongo({
							modelOrCollection: client.db("pokemons").collection("users"),
						}),
					},
				};
			},
		})
	);

	// REST Endpoint
	app.get("/", (req, res) => {
		res.send("Car Junction Backend Server Running...");
	});

	// Start the HTTP server
	await new Promise((resolve) => httpServer.listen({ port }, resolve));

	console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
};

// Run the server
run().catch((error) => console.error(error));

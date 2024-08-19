import { ApolloServer } from "@apollo/server";

import { MongoClient, ServerApiVersion } from "mongodb";

import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import http from "http";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import typeDefs from "../src/typeDefs";
import resolvers from "../src/resolvers";
import PokemonAPI from "../src/datasource/pokemon-api";
import PokemonMongo from "../src/datasource/mongo-api";

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
  '/',
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
  }),
);

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`🚀 Server ready at http://localhost:4000/`);
export default httpServer;


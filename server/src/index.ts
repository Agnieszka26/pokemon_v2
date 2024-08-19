import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import PokemonAPI from "./datasource/pokemon-api";
import { MongoClient, ServerApiVersion } from "mongodb";
import PokemonMongo from "./datasource/mongo-api";
import dotenv from 'dotenv'
dotenv.config()

const password = encodeURIComponent(process.env.SECRET_MONGODB);
const uri = `mongodb+srv://pokemonsv2:${password}@pokemonsv2.uczp40b.mongodb.net/?retryWrites=true&w=majority&appName=Pokemonsv2`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

client.connect();

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  context: async () => {
    const { cache } = server;

    return {
      dataSources: {
        pokemonAPI: new PokemonAPI({ cache }),
        basePokemons: new PokemonMongo({
          modelOrCollection: client.db("pokemons").collection("ids"),
        }),
      },
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);

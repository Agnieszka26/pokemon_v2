import { ApolloServer } from '@apollo/server';
import {startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import PokemonAPI from './datasource/pokemon-api';
import { MongoClient, ServerApiVersion } from 'mongodb';

  const uri =  "mongodb+srv://aga:haslo123@pokemonv2.afijphe.mongodb.net/?retryWrites=true&w=majority&appName=pokemonv2";
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
 const server = new ApolloServer({ typeDefs, resolvers });

  async function connectToDatabase() {
    try {
      await client.connect();
      try {
       const db = client.db("aga");
       const coll = db.collection("ids_pokemon");
       const cursor = coll.find();
       await cursor.forEach(console.log);
      } catch (error) {
        console.log(error)
      } finally{
        await client.close();
      }

      console.log('Db Connected');
    } catch (err) {
      console.error(err.message);
    }
  }
  connectToDatabase();
  
  const { url } = await startStandaloneServer(server, {
    context: async () => {
      const { cache } = server;

      return {
        dataSources: {
          pokemonAPI: new PokemonAPI({ cache }),
        },
      };
    },
  });
  
  console.log(`🚀  Server ready at: ${url}`);
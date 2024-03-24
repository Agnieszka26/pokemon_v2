import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import PokemonAPI from './datasource/pokemon-api';

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  

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
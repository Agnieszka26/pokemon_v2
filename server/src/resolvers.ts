const resolvers = {
  Query: {
    // returns a base details of pokemons
    getPokemon: (__, { id }, { dataSources }) => {
      return  dataSources.pokemonAPI.getPokemon(id);
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

export default resolvers;

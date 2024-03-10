const resolvers = {
    Query: {
        // returns a base details of pokemons 
        getPokemon: (__, { id }, { dataSources }) => {
            return dataSources.pokemonAPI.getPokemon(id);
        },
        // returns a paginated array of pokemons that will be used to populate the homepage carousel of our web client 
        getPokemons: (__, { limit, offset }, { dataSources }) => {
          return dataSources.pokemonAPI.getPokemons(limit, offset);
      },


    },
};

export default resolvers;

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
    },
    NamedAPIResource: {
        url: ({ url }, _, { dataSources }) => {
            return dataSources.pokemonAPI.getPokemonByUrl(url);
        },
    },
};
export default resolvers;

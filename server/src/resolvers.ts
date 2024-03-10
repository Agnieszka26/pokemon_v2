const resolvers = {
    Query: {
        // returns an array of pokemons that will be used to populate the homepage carousel of our web client
        getPokemon: (__, { id }, { dataSources }) => {
            return dataSources.pokemonAPI.getPokemon(id);
        },

        //returns images of the pokemon
        getPokemonSpritesByID: (_, { id }, { dataSources }) => {
            return dataSources.pokemonsAPI.pokemon_v2_pokemonsprites_by_pk(id);
        },
    },
};

export default resolvers;

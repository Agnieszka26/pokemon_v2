import { RESTDataSource } from '@apollo/datasource-rest';
class PokemonAPI extends RESTDataSource {
    baseURL = 'https://pokeapi.co/api/v2/pokemon/';

    getPokemon(pokemonId) {
        return this.get(`${pokemonId}`);
    }
}

export default PokemonAPI;

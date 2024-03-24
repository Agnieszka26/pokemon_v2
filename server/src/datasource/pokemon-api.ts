import { RESTDataSource } from '@apollo/datasource-rest';
class PokemonAPI extends RESTDataSource {
    baseURL = 'https://pokeapi.co/api/v2/';

    getPokemon(pokemonId) {
        return this.get(`pokemon/${pokemonId}`);
    }
    getPokemons(limit, offset) {
      return this.get(`pokemon/?limit=${limit}&offset=${offset}/`)
    }
}

export default PokemonAPI;

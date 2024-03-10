import {RESTDataSource }from "@apollo/datasource-rest"
class PokemonAPI extends RESTDataSource {

    baseURL = 'https://pokeapi.co/api/v2/pokemon/';
  
    getPokemon(id) {
       
      return this.get(`/${id}`);
    }
  

  }


  export default PokemonAPI

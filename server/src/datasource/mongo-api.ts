import { MongoDataSource } from "apollo-datasource-mongodb";
import BasePokemonModel from "../models/BasePokemon";

export default class PokemonMongo extends MongoDataSource<
  typeof BasePokemonModel
> {
  pokemons() {
    return this.findByFields({});
  }

  pokemon(id) {

  }

}

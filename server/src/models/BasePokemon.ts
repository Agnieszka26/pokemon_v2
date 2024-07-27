import mongoose, { Schema } from "mongoose";

const BasePokemonModel = mongoose.model(
  "BasePokemon",
  new Schema({
    name: String,
    id: String,
  }),
);

export default BasePokemonModel;

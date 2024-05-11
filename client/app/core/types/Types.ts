export interface PokemonDataProps {
  loading: boolean;
  pokemonData: string[];
}

export interface PokemonResult {
  name: string;
  url: { sprites: { front_default: string } };
}

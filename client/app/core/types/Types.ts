export interface PokemonCarouselData {
  loading: boolean;
  pokemonData: string[];
}

export interface PokemonResult {
  name: string;
  url: { sprites: { front_default: string } };
}

export interface PokemonData {
  id: string;
  name: string;
}

export interface PokemonCarouselProps {
  loading: boolean;
  pokemonSprites: string[];
}

export interface PokemonResult {
  name: string;
  url: string;
}

export interface PokemonSprite {
  front_default: string;
}

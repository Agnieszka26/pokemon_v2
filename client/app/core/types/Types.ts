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

export type Sprites = {
  back_default: string;
  back_female: null;
  back_shiny: string;
  back_shiny_female: null;
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
};
export enum TypesPokemon {
  NORMAL = "normal",
    GRASS = "grass",
  FAIRY = 'fairy',
  FIRE = 'fire',
  ELECTRIC = 'electric',
  FLYING = 'flying',
  POISON='poison',
  BUG='bug',
  WATER ='water'
}

type Name = {
  name: string;
  url: string
    }
type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: Name
}

type PokemonsTypes= {
  slot: number;
  type: { name: TypesPokemon;
  url: string}
}

export type Pokemon = {
  name: string;
  height: string;
  id: string;
  sprites: Sprites;
  weight: string;
  stats:PokemonStat[];
  types: PokemonsTypes[]
};
export type PokemonMongo = {
  name: string;
  id: string;
};


export type StatePokemonCarouselData =
  | {
    error: false;
    isLoading: true;
    data: undefined;
  }
  | {
    error: true;
    isLoading: false;
    data: undefined;
  }
  | {
    error: false;
    isLoading: false;
    data: Pokemon[];
  };

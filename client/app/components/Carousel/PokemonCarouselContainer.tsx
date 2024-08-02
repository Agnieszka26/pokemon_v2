'use client';
import { useEffect, useState } from 'react';

import { useQuery } from '@apollo/client';


import { GET_POKEMON } from '@/app/core/gql';
import PokemonCarouselComponent from './PokemonCarouselComponent';
export type Sprites = {
  back_default
: string
back_female
:
null
back_shiny
: string
back_shiny_female
:
null
front_default
: string
front_female
:
null
front_shiny
: string
front_shiny_female
:
null
}



type Pokemon = {
  name: string
  height: string
   id: string
    sprites: Sprites
}
type PokemonMongo = {
  name: string
   id: string
}


const fetchPokemonsFromPublicSource = async (ids: string[]) => {
  let pokemons:  Pokemon[]= [];
// if(ids === undefined) return []

  // Map over ids and create an array of promises
  const promises = ids?.map(async (id) => {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/` + id)
      .then((resp) => resp.json())
      .then((data) => {
        const { height, id, sprites, name } = data;
        return { height, id, sprites, name };
      });
    return resp; // Return the response for this ID
  });

  // Wait for all promises to resolve and store results in the pokemons array
  pokemons = await Promise.all(promises);
  return pokemons;
}

const formatPokemonsId = (data: PokemonMongo[] ) =>{
 return data.map(({id}) => {

     return id
   })

 }
export const PokemonCarouselContainer = () => {
  const q = useQuery(GET_POKEMON);
  const [pokemons, setPokemons] = useState<undefined|  Pokemon[]>(undefined)

const data = q.data as{
  pokemons: PokemonMongo[]
}| undefined
useEffect(() => {

    const f = async () => {
      console.log('data', data)
      if(data === undefined ) return []
     const ids =  formatPokemonsId(data.pokemons)


      const p = await fetchPokemonsFromPublicSource(ids)
      setPokemons(p)
    }
    f()
  }, [data])
console.log( pokemons)
  return <>{pokemons ?<PokemonCarouselComponent pokemonData={pokemons} /> : <>n</>} </>


};

{/* <PokemonCarouselQuery loading={false} error={false} data={[]} /> */}

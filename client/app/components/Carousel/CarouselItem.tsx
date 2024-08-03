import { Pokemon } from '@/app/core/types/Types'
import React from 'react'
import Image from 'next/image'
import { ButtonPrimry } from '@/app/ui/Button'

type Props = Pokemon

const CarouselItem = ({name, sprites, height, id, weight, stats}: Props) => {
  return (
    <div key={name} className='grid grid-cols-1 justify-center align-middle mx-auto w-max border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4'>
    <Image src={sprites.front_default} alt={`Pokemon ${name}`} width={300} height={300} className='rounded-t-lg'/>
    <p className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>Name: {name}</p>
    <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Height: {height}</p>
    <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Weight: {weight}</p>
    <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>ID:  {id}</p>
{stats.map((stat) =>{
    return  <p className='mb-3 font-normal text-gray-700 dark:text-gray-400' key={stat.stat.name}>{stat.stat.name} : {String(stat.base_stat)}</p>
})}
<ButtonPrimry label={'see details'} />

  </div>
  )
}

export default CarouselItem

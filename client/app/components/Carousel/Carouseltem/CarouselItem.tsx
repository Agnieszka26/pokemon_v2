import { Pokemon } from '@/app/core/types/Types'
import { ButtonPrimry } from '@/app/ui/Button'
import { colorsTypes } from '@/app/ui/colors'
import Header3 from '@/app/ui/Typography/Header3'
import cn from '@/app/utils/className'
import Image from 'next/image'
import backgroundGradient from './backgroundGradinend'
import { StatComponent } from "./StatComponent"
import { TypeComponent } from './TypeComponent'

const CarouselItem = ({ name, sprites, height, types, weight, stats }: Pokemon) => {

  return (
    <div
      className={cn(`grid grid-cols-1
      justify-center align-middle
      mx-auto w-max
      border border-gray-200 rounded-lg shadow p-4`)}
      style={{ backgroundImage: backgroundGradient(colorsTypes[types[0].type.name]) }}
      >
      <Image
      src={sprites.front_default}
      alt={`Pokemon ${name}`}
      width={300}
      height={300}
      className='rounded-t-lg mx-auto'
      />
      <Header3> {name}</Header3>

      <div className='flex justify-center items-center gap-8 backdrop-blur-3xl rounded-lg shadow-xl my-4'>
        <StatComponent label={'height'} value={`${height} m`} />
        <div className='flex justify-center items-center'>

          {types.map((type) => {
            return <TypeComponent label={type.type.name} key={type.type.url} />
          })}
        </div>
        <StatComponent label={'weight'} value={`${weight} kg`} />
      </div>
      <div className='grid grid-cols-3 gap-2  backdrop-blur-3xl rounded-lg shadow-xl mb-4 p-4'>
        {stats.map(({ stat, base_stat }) => {
          return <StatComponent key={stat.name + base_stat} label={stat.name} value={String(base_stat)} icon={stat.name} />
        })}



      </div>
      <ButtonPrimry label={'catch me!'} />

    </div>
  )
}

export default CarouselItem

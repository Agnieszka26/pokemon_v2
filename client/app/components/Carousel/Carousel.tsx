import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { Pokemon } from '@/app/core/types/Types';

import CarouselItem from './Carouseltem/CarouselItem';


const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 1
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

type Props = {
    data: Pokemon[]
}

const CarouselDefault = ({ data }: Props) => {
    return (
        <Carousel responsive={responsive} className='mx-auto mt-4'>

            {data.map(({ sprites, name, id, height, weight, stats , types}) => {
                return <CarouselItem key={id} name={name} sprites={sprites} height={height} id={id} weight={weight} stats={stats} types={types} />

            })}
        </Carousel>
    )
}

export default CarouselDefault

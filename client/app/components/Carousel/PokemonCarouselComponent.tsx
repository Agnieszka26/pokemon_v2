import Image from 'next/image';
import { Button, Carousel } from 'react-daisyui';
import { Sprites } from './PokemonCarouselContainer';
const PokemonCarouselComponent = ({

  pokemonData,
}: {
  pokemonData: {
    name: string;
    sprites: Sprites
  }[]
}) => {
  return (

    <Carousel
      className="rounded-box"
      buttonStyle={(value: string) => {
        return (
          <Button
            id={value === '❯' ? 'button_next' : 'button_prev'}
            color="primary"
          >
            {value}
          </Button>
        );
      }}
      display="sequential"
    >
      {pokemonData.map(({ sprites, name }) => (
        <Carousel.Item key={name}>
          <Image src={sprites.front_default} alt={`Pokemon ${name}`} width={500} height={500}/>
          <p>{name}</p>
        </Carousel.Item>
      ))}
    </Carousel>


  );
};

export default PokemonCarouselComponent;

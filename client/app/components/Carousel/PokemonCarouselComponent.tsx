import React from 'react';
import type { Key } from 'react';
import { Button, Carousel } from 'react-daisyui';
import { PokemonCarouselProps } from './CarouselTypes';

const PokemonCarouselComponent = ({
  loading,
  pokemonSprites,
}: PokemonCarouselProps): React.JSX.Element => {
  return (
    <>
      {!loading && pokemonSprites.length > 0 && (
        <Carousel
          className="rounded-box"
          buttonStyle={(value: string) => {
            return <Button color="primary">{value}</Button>;
          }}
          display="sequential"
        >
          {pokemonSprites.map((sprite: string, i: Key) => (
            <Carousel.Item
              key={i}
              src={sprite}
              alt={`Pokemon ${(i as number) + 1}`}
            />
          ))}
        </Carousel>
      )}
    </>
  );
};

export default PokemonCarouselComponent;

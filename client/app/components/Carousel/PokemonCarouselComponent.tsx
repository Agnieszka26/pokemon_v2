import React from 'react';
import { Button, Carousel } from 'react-daisyui';
import { PokemonCarouselData } from '../../core/types/Types';

const PokemonCarouselComponent = ({
  loading,
  pokemonData,
}: PokemonCarouselData) => {
  return (
    <>
      {!loading && pokemonData && pokemonData.length > 0 && (
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
          {pokemonData.map((sprite: string, i: number) => (
            <Carousel.Item key={i} src={sprite} alt={`Pokemon ${i + 1}`} />
          ))}
        </Carousel>
      )}
    </>
  );
};

export default PokemonCarouselComponent;

'use client';

import React from 'react';
import { Button, Carousel } from 'react-daisyui';

import { gql, useQuery } from '@apollo/client';

export const GET_POKEMONS = gql`
  query GetPokemons($limit: Int!, $offset: Int!) {
    getPokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      results {
        name
        url
      }
    }
  }
`;

const Home = () => {
  const { error, loading, data } = useQuery(GET_POKEMONS, {
    variables: { limit: 5, offset: 0 },
  });
  console.log({ error });
  console.log({ data });
  console.log({ loading });
  return (
    <Carousel
      className="rounded-box"
      buttonStyle={(value: string) => <Button color="primary">{value}</Button>}
      display="sequential"
    >
      <Carousel.Item
        src="https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg"
        alt="City"
      />
      <Carousel.Item
        src="https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
        alt="City"
      />
      <Carousel.Item
        src="https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg"
        alt="City"
      />
      <Carousel.Item
        src="https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
        alt="City"
      />
    </Carousel>
  );
};

export default Home;

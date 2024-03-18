/* eslint-disable react/jsx-key */
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import type { PageComponent } from '@nxweb/react';

import { useCommand, useStore } from '@models/store.js';

import PokemonDetails from './pokemonDetailsCard';

const Details: PageComponent = () => {
  const { id } = useParams();
  const [state, dispatch] = useStore((store) => store.pokemons);

  const pokemon = useMemo(
    () => state?.pokemons?.find((o) => o?.id.toString() === id),
    [state, id]
  );

  return <PokemonDetails pokemon={pokemon} />;
};

Details.displayName = 'Pokemon Details';

export default Details;

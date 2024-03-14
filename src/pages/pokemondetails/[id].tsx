/* eslint-disable react/jsx-key */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import type { PageComponent } from '@nxweb/react';

import { Card, Grid } from '@components/material.js';
import { useCommand, useStore } from '@models/store.js';

import PokemonDetails from './pokemonDetailsCard';

const Details: PageComponent = () => {
  const { id } = useParams();
  const [state, dispatch] = useStore((store) => store.pokemons);
  const command = useCommand((cmd) => cmd);

  useEffect(() => {
    dispatch(command.pokemons.load(id)).catch((err: unknown) => {
      console.error(err);
    });

    return () => {
      dispatch(command.pokemons.clear());
    };
  }, []);

  return (
      <PokemonDetails pokemon={state?.pokemons} />

  );
};

Details.displayName = 'Pokemon Details';

export default Details;

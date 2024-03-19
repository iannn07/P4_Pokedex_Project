/* eslint-disable react/jsx-key */
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import type { PageComponent } from '@nxweb/react';

import { useCommand, useStore } from '@models/store.js';

import PokemonDetails from './pokemonDetailsCard';

const Details: PageComponent = () => {
  const { id } = useParams();
  const [state, dispatch] = useStore((store) => store);
  const command = useCommand((cmd) => cmd);

  const pokemon = useMemo(() => state?.pokemons?.pokemons?.find((o) => o.id.toString() === id), [state, id]);

  useEffect(() => {
    if (!state?.pokemons?.pokemons) {
      dispatch(command.pokemons.load()).catch((err: unknown) => {
        console.error(err);
      });
    }
  }, [command.pokemons, dispatch, state?.pokemons?.pokemons]);

  return <PokemonDetails pokemon={pokemon} />;
};

Details.displayName = 'Pokemon Details';

export default Details;

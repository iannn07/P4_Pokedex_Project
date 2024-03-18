import React, { useEffect, useState } from 'react';

import { Card, Grid } from '@mui/material';

import getColorForType from '@components/custom/type-color/type-color';
import { pokemonsCommand } from '@models/pokemon/commands';
import type { Pokemons } from '@models/pokemon/types';
import { useCommand, useStore } from '@models/store';
import { trainerCommand } from '@models/trainer/commands';

import ButtonFilter from './ButtonFilter';
import DisplayCards from './DisplayCards';
import SearchBar from './SearchBar';

const Home = () => {
  const [term, setTerm] = useState('');
  const [filteredTerm, setFilteredTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [state, dispatch] = useStore((store) => store);
  const command = useCommand((cmd) => cmd);
  const [obtainedPokemons, setObtainedPokemons] = useState<number[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        // Get obtained Pokémon IDs from trainer activities

        const obtainedPokemonIds = state?.trainer?.activities
          ?.filter((activity) => activity.activity === 'Add')
          .map((activity) => activity.pokemon.id) ?? [];

        // Set obtainedPokemons state
        setObtainedPokemons(obtainedPokemonIds);
        // Load Pokemon data
        await dispatch(command.pokemons.load());
      } catch (err) {
        console.error(err);
      }
    };

    // Fetch Pokémon data and update obtainedPokemons when trainer state changes
    fetchPokemons();
  }, [command.pokemons, dispatch, state.trainer, setObtainedPokemons]);

  const filteredPokemons =
    state?.pokemons?.pokemons?.filter(
      (pokemon) => pokemon.pokemon.toLowerCase().includes(term.toLowerCase()) &&
        pokemon.type.toLowerCase().includes(filteredTerm.toLowerCase())
    ) ?? [];

  const submitHandler = (searchTerm: string) => {
    setTerm(searchTerm);
  };

  const handleFilter = (type: string) => {
    setFilteredTerm(type);
    setActiveFilter(type);
  };

  const obtainedId = (pokemonId: number) => obtainedPokemons.includes(pokemonId);

  const handleObtainPokemon = (pokemon: Pokemons) => {
    if (!obtainedId(pokemon.id)) {
      const data = {
        activity: 'Add',
        dateTime: new Date().toLocaleString(),
        pokemon: {
          ...pokemon,
          inInventory: true,
          isObtained: true
        }
      };

      const dataSync = {
        ...pokemon,
        inInventory: true,
        isObtained: true
      };

      dispatch(trainerCommand(data));
      dispatch(pokemonsCommand.edit(dataSync));
      dispatch(command.inventory.add(pokemon));
      setObtainedPokemons([...obtainedPokemons, pokemon.id]);
    }
  };

  return (
    <>
      <Grid
        container={true}
        spacing={6}
        sx={{
          alignItems: 'flex-start',
          flexDirection: { sm: 'row', xs: 'column' },
          mb: 6
        }}
      >
        <Grid item={true} sm={10} xs={6}>
          <Card sx={{ p: 2.5 }}>
            <SearchBar onSubmit={submitHandler} />
          </Card>
        </Grid>
        <Grid
          item={true}
          sm={2}
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
          xs={6}
        >
          <Card sx={{ width: '100%' }}>
            <ButtonFilter
              activeFilter={activeFilter}
              handleFilter={handleFilter} />
          </Card>
        </Grid>
      </Grid>
      <Grid container={true} spacing={6}>
        <DisplayCards
          filteredPokemons={filteredPokemons}
          getColorForType={getColorForType}
          handleObtainPokemon={handleObtainPokemon}
          obtainedPokemons={obtainedPokemons} />
      </Grid>
    </>
  );
};

Home.displayName = 'Home';

export default Home;

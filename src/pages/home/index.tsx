import { useEffect, useState } from 'react';

import { Card, Grid } from '@mui/material';

import getColorForType from '@components/custom/type-color/type-color';
import type { Pokemons } from '@models/pokemon/types';
import { useCommand, useStore } from '@models/store';
import { trainerCommand } from '@models/trainer/commands';

import DisplayCards from './DisplayCards';
import FilterButton from './FilterButton';
import SearchBar from './SearchBar';

const Home = () => {
  const [term, setTerm] = useState('');
  const [filteredTerm, setFilteredTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [state, dispatch] = useStore((store) => store.pokemons);
  const command = useCommand((cmd) => cmd);
  const [obtainedPokemons, setObtainedPokemons] = useState<number[]>([]);

  const filteredPokemons =
    state?.pokemons?.filter(
      (pokemons) => pokemons.pokemon.toLowerCase().includes(term.toLowerCase()) &&
        pokemons.type.toLowerCase().includes(filteredTerm.toLowerCase())
    ) ?? [];

  const submitHandler = (searchTerm: string) => {
    setTerm(searchTerm);
  };

  const handleFilter = (type: string) => {
    setFilteredTerm(type);
    setActiveFilter(type);
  };

  const isObtained = (pokemonId: number) => obtainedPokemons.includes(pokemonId);

  const handleObtainPokemon = (pokemon: Pokemons) => {
    if (!isObtained(pokemon.id)) {
      const data = {
        activity: 'Add',
        dateTime: new Date().toLocaleString(),
        pokemon
      };

      dispatch(trainerCommand(data));
      setObtainedPokemons([...obtainedPokemons, pokemon.id]);
    }
  };

  useEffect(() => {
    dispatch(command.pokemons.load()).catch((err) => {
      console.error(err);
    });
  }, [command.pokemons, dispatch]);

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
        <Grid item={true} sm={2} sx={{ display: 'flex', justifyContent: 'flex-end' }} xs={6}>
          <Card sx={{ width: '100%' }}>
            <FilterButton activeFilter={activeFilter} handleFilter={handleFilter} />
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

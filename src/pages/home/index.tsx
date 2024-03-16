import { useEffect, useState } from 'react';

import { Card, Grid } from '@mui/material';

import getColorForType from '@components/custom/type-color/type-color';
import { useCommand, useStore } from '@models/store.js';

import DisplayCards from './DisplayCards';
import SearchBar from './SearchBar';
import FilterButton from './filterButton';

const Home = () => {
  const [term, setTerm] = useState('');
  const [filteredTerm, setFilteredTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [obtainedPokemons, setObtainedPokemons] = useState<number[]>([]);
  const [state, dispatch] = useStore((store) => store.pokemons);
  const command = useCommand((cmd) => cmd);

  const filteredPokemons =
    state?.pokemons?.filter(
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

  const handleObtainPokemon = (pokemonId: number) => {
    if (!obtainedPokemons.includes(pokemonId)) {
      setObtainedPokemons([...obtainedPokemons, pokemonId]);
    }
  };

  useEffect(() => {
    dispatch(command.pokemons.load()).catch((err) => {
      console.error(err);
    });

    return () => {
      dispatch(command.pokemons.clear());
    };
  }, []);

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

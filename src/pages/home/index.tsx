import React, { useEffect, useState } from 'react';

import { Card, FormControl, Grid, MenuItem, Select } from '@mui/material';

import { useCommand, useStore } from '@models/store.js';

import DisplayCards from './DisplayCards';
import SearchBar from './SearchBar';

const Home = () => {
  const [term, setTerm] = useState('');
  const [filteredTerm, setFilteredTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
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

  useEffect(() => {
    dispatch(command.pokemons.load()).catch((err) => {
      console.error(err);
    });

    return () => {
      dispatch(command.pokemons.clear());
    };
  }, []);

  const getColorForType = (type: string) => {
    const hash = type
      .split('')
      .reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const hue = hash % 400;

    return `hsl(${hue}, 70%, 30%)`;
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
          <Card>
            <FormControl>
              <Select
                displayEmpty={true}
                sx={{ minWidth: '120px' }}
                value={activeFilter}
                onChange={(e) => handleFilter(e.target.value as string)}
              >
                <MenuItem value="">All Types</MenuItem>
                {[
                  'Dragon',
                  'Electric',
                  'Fighting',
                  'Fire',
                  'Flying',
                  'Ghost',
                  'Grass',
                  'Ground',
                  'Ice',
                  'Normal',
                  'Psychic',
                  'Rock',
                  'Water'
                ].map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Card>
        </Grid>
      </Grid>
      <Grid container={true} spacing={6}>
        <DisplayCards filteredPokemons={filteredPokemons} getColorForType={getColorForType} />
      </Grid>
    </>
  );
};

Home.displayName = 'Home';

export default Home;

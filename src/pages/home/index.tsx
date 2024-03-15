/* eslint-disable sort-keys */
/* eslint-disable no-console */
/* eslint-disable logical-assignment-operators */
/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react';
import { Form, Link } from 'react-router-dom';

import {
  Box,
  Button,
  CardContent,
  CardMedia,
  FormControl,
  Input,
  Select,
  Typography
} from '@mui/material';

import { Search } from '@nxweb/icons/tabler';
import type { PageComponent } from '@nxweb/react';

import { Card, Grid, MenuItem } from '@components/material.js';
import { useCommand, useStore } from '@models/store.js';

// Import { getPokemon } from '@api/clients/pokemons';

const Home: PageComponent = () => {
  const [term, setTerm] = useState('');
  const [filteredTerm, setFilteredTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [state, dispatch] = useStore((store) => store.pokemons);
  const command = useCommand((cmd) => cmd);

  const filteredPokemons = state?.pokemons?.filter((pokemon) => pokemon.pokemon.toLowerCase().includes(term.toLowerCase()) &&
  pokemon.type.toLowerCase().includes(filteredTerm.toLowerCase())) ?? [];

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (term === '') return alert('Please enter search term!');
    setTerm('');
  };

  const handleFilter = (type: string) => {
    setFilteredTerm(type);
    setActiveFilter(type);
  };

  useEffect(() => {
    dispatch(command.pokemons.load()).catch((err: unknown) => {
      console.error(err);
    });

    return () => {
      dispatch(command.pokemons.clear());
    };
  }, []);

  const getColorForType = (type: string) => {
    // Generate a consistent color based on the type
    const hash = type
      .split('')
      .reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const hue = hash % 400;

    return `hsl(${hue}, 70%, 30%)`; // Adjust saturation and lightness as needed
  };

  return (
    <>
      <Grid
        container={true}
        spacing={6}
        sx={{
          mb: 6,
          flexDirection: { xs: 'column', sm: 'row' }, // Column layout for mobile, row layout for other screen sizes
          alignItems: 'flex-start' // Align items at the start of the container
        }}
      >
        <Grid item={true} sm={10} xs={6}>
          <Card sx={{ p: 2.5 }}>
            <FormControl sx={{ width: '100%', m: 0, p: 0 }}>
              <Form onSubmit={submitHandler}>
                <Input
                  endAdornment={
                    <Button type="submit">
                      <Search />
                    </Button>
                  }
                  placeholder="Search Pokemon..."
                  sx={{ width: '100%' }}
                  type="text"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)} />
              </Form>
            </FormControl>
          </Card>
        </Grid>
        <Grid item={true} sm={2} sx={{ display: 'flex', justifyContent: 'flex-end' }} xs={6}>
          <Card>
            <FormControl>
              <Select
                displayEmpty={true}
                sx={{ minWidth: '120px' }}
                value={activeFilter}
                onChange={(e) => handleFilter(e.target.value as string)}
              >
                <MenuItem value="">All Types</MenuItem>
                {['Dragon', 'Electric', 'Fighting', 'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Psychic', 'Rock', 'Water'].map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
              </Select>
            </FormControl>
          </Card>
        </Grid>
      </Grid>
      <Grid container={true} spacing={6}>
        {filteredPokemons?.map((pokemon, index) => (
          <Grid item={true} key={index} md={3} sm={6} xs={12}>
            <Link
              style={{ textDecoration: 'none' }}
              to={`../pokemondetails/${pokemon.id}`}
            >
              <Card sx={{ p: 4 }}>
                <CardMedia
                  image={pokemon.image_url}
                  sx={{ height: '14rem', objectFit: 'contain', width: '100%' }} />
                <CardContent
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'center'
                  }}
                >
                  <Typography sx={{ fontWeight: 'bold', mb: 3 }} variant="h4">
                    {pokemon.pokemon}
                  </Typography>
                  <Box
                    sx={{
                      borderRadius: 8,
                      display: 'flex',
                      gap: 2,
                      height: 'auto'
                    }}
                  >
                    {pokemon.type.split('/').map((type: string) => (
                      <Box
                        key={type}
                        px={4}
                        py={1.5}
                        sx={{
                          backgroundColor: getColorForType(type),
                          borderRadius: 8,
                          display: 'flex',
                          gap: 8
                        }}
                      >
                        <Typography
                          sx={{
                            color: 'white',
                            fontSize: 10,
                            letterSpacing: 1.5
                          }}
                        >
                          {type.trim()}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <Button sx={{ mt: 6 }} variant="contained">
                    Add to Inventory
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

Home.displayName = 'Home';

export default Home;

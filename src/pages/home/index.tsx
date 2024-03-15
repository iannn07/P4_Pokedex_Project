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
  Typography
} from '@mui/material';

import { Search } from '@nxweb/icons/tabler';
import type { PageComponent } from '@nxweb/react';

import { Card, Grid } from '@components/material.js';
import { useCommand, useStore } from '@models/store.js';

// Import { getPokemon } from '@api/clients/pokemons';

const Home: PageComponent = () => {
  const [term, setTerm] = useState('');
  const [state, dispatch] = useStore((store) => store.pokemons);
  const command = useCommand((cmd) => cmd);

  const filteredPokemons = state?.pokemons?.filter((pokemon) => pokemon.pokemon.toLowerCase().includes(term.toLowerCase())) ?? [];

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (term === '') return alert('Please enter search term!');
    setTerm('');
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
      <Box
        sx={{
          backgroundColor: 'transparent',
          mb: 8,
          p: 4,
          border: '1px solid #2f3349',
          borderRadius: '5px'
        }}
      >
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
      </Box>
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

/* eslint-disable sort-keys */
/* eslint-disable @stylistic/js/linebreak-style */
/* eslint-disable react/display-name */
import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, CardContent, CardMedia, Typography } from '@mui/material';

import { Card, Grid } from '@components/material';
import type { Pokemons } from '@models/pokemon/types';

interface DisplayCardsProps {
  readonly filteredPokemons: Pokemons[]
  readonly getColorForType: (type: string) => string
  readonly obtainedPokemons: number[]
  readonly handleObtainPokemon: (pokemon: Pokemons) => void
}

const DisplayCards: React.FC<DisplayCardsProps> = ({ filteredPokemons, getColorForType, obtainedPokemons, handleObtainPokemon }) => {
  const isObtained = (pokemonId: number) => obtainedPokemons.includes(pokemonId);

  return (
    <>
      {filteredPokemons.map((pokemon) => (
        <Grid item key={pokemon.id} md={3} sm={6} xs={12}>
          <Link style={{ textDecoration: 'none' }} to={`../pokemondetails/${pokemon.id}`}>
            <Card sx={{ p: 4 }}>
              <CardMedia image={pokemon.image_url} sx={{ height: '14rem', objectFit: 'contain', width: '100%' }} />
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
                <Box sx={{ display: 'flex', gap: 2, height: 'auto' }}>
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
                      <Typography sx={{ color: 'white', fontSize: 10, letterSpacing: 1.5 }}>{type.trim()}</Typography>
                    </Box>
                  ))}
                </Box>
                <Button
                  disabled={isObtained(pokemon.id)}
                  sx={{ mt: 6, backgroundColor: isObtained(pokemon.id) ? '#ccc' : '' }}
                  variant="contained"
                  onClick={() => handleObtainPokemon(pokemon)}
                >
                  {isObtained(pokemon.id) ? 'Obtained' : 'Add to Inventory'}
                </Button>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </>
  );
};

export default DisplayCards;

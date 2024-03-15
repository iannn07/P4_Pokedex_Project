/* eslint-disable @stylistic/js/linebreak-style */
/* eslint-disable react/display-name */
import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, CardContent, CardMedia, Typography } from '@mui/material';

import { Card, Grid } from '@components/material.js';

interface Pokemon {
  id: number
  image_url: string
  pokemon: string
  type: string
}

interface DisplayCardsProps {
  readonly filteredPokemons: Pokemon[]
  readonly getColorForType: (type: string) => string
}

const DisplayCards: React.FC<DisplayCardsProps> = ({ filteredPokemons, getColorForType }) => {
  return (
    <>
      {filteredPokemons.map((pokemon, index) => (
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
    </>
  );
};

export default DisplayCards;
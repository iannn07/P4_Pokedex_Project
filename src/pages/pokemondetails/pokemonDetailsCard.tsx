/* eslint-disable react/no-array-index-key */
/* eslint-disable sort-keys */
/* eslint-disable react/display-name */
/* eslint-disable @stylistic/js/linebreak-style */

import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';

import { ArrowBackUP, Point } from '@nxweb/icons/tabler';

import type { Pokemons } from '../../models/pokemon/types';

interface PokemonDetailsProps {
  readonly pokemon: Pokemons | undefined
}

const getColorForType = (type: string) => {
  // Generate a consistent color based on the type
  const hash = type
    .split('')
    .reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  const hue = hash % 400;

  return `hsl(${hue}, 70%, 30%)`; // Adjust saturation and lightness as needed
};

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemon }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {pokemon
        ? (
        <Card sx={{ width: '45%' }}>
          <CardHeader
            action={
              <ArrowBackUP
                height="32px"
                width="32px"
                onClick={() => navigate(-1)} />
            }
            subheader={
              <Box
                sx={{
                  borderRadius: 8,
                  display: 'flex',
                  gap: 2,
                  height: 'auto'
                }}
              >
                {pokemon.type.split('/').map((type) => (
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
            }
            title={pokemon?.pokemon} />
          <CardContent>
            <Grid container={true} spacing={6}>
              <Grid item={true} sm={7} xs={12}>
                <Typography variant="h1">{pokemon?.hitpoints}</Typography>
                <Typography sx={{ mb: 6, color: 'text.secondary' }}>
                  Total Hitpoints
                </Typography>
                <Grid container={true} spacing={6}>
                  <Grid item={true} sm={5} xs={12}>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Abilities :
                    </Typography>
                    <List>
                      {pokemon?.abilities.map((abilities, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <Point />
                          </ListItemIcon>
                          <ListItemText primary={abilities} />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                  {pokemon?.evolutions?.length > 0 && (
                    <Grid item={true} sm={5} xs={12}>
                      <Typography sx={{ color: 'text.secondary' }}>
                        Evolution :
                      </Typography>
                      <List>
                        {pokemon?.evolutions?.map((evolution, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <Point />
                            </ListItemIcon>
                            <ListItemText primary={evolution} />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  )}
                </Grid>
                <Typography sx={{ color: 'text.secondary' }}>
                  Can be obtained from :
                </Typography>
                <Typography variant="h4">{pokemon?.location}</Typography>
              </Grid>
              <Grid
                item={true}
                sm={5}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '30%'
                }}
                xs={12}
              >
                <CardMedia
                  alt={pokemon?.pokemon}
                  component="img"
                  image={pokemon?.image_url}
                  sx={{ height: '14rem', objectFit: 'fit', width: '100%' }} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        )
        : <CircularProgress />}
    </Box>
  );
};

export default PokemonDetails;

/* eslint-disable logical-assignment-operators */
/* eslint-disable react/jsx-key */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, CardContent, CardMedia, Typography } from '@mui/material';

import type { PageComponent } from '@nxweb/react';

import { Card, Grid } from '@components/material.js';
import { useCommand, useStore } from '@models/store.js';

const Home: PageComponent = () => {
  const [state, dispatch] = useStore((store) => store.pokemons);
  const command = useCommand((cmd) => cmd);

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
    const hash = type.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const hue = hash % 400;

    return `hsl(${hue}, 70%, 30%)`; // Adjust saturation and lightness as needed
  };

  return (
    <Grid container={true} spacing={6}>
      {state?.pokemons?.map((data, index) => (
        <Grid item={true} key={index} md={3} sm={6} xs={12}>
          <Link
            style={{ textDecoration: 'none' }}
            to={`../pokemondetails/${data.id}`}
          >
            <Card sx={{ p: 4 }}>
              <CardMedia
                image={data.image_url}
                sx={{ height: '14rem', objectFit: 'contain', width: '100%' }}
              />
              <CardContent
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  justifyContent: 'center',
                }}
              >
                <Typography sx={{ fontWeight: 'bold', mb: 3 }} variant="h4">
                  {data.pokemon}
                </Typography>
                <Box
                  sx={{
                    borderRadius: 8,
                    display: 'flex',
                    gap: 2,
                    height: 'auto',
                  }}
                >
                  {data.type.split('/').map((type) => (
                    <Box
                      key={type}
                      px={4}
                      py={1.5}
                      sx={{
                        backgroundColor: getColorForType(type),
                        borderRadius: 8,
                        display: 'flex',
                        gap: 8,
                      }}
                    >
                      <Typography
                        sx={{
                          color: 'white',
                          fontSize: 10,
                          letterSpacing: 1.5,
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
  );
};

Home.displayName = 'Home';

export default Home;

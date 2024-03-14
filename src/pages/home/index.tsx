/* eslint-disable react/jsx-key */
import { useEffect } from 'react';

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

  return (
    <Grid container={true} spacing={6}>
      {state?.pokemons?.map((data) => (
        <Grid item={true} md={3} sm={6} xs={12}>
          <Card sx={{ p: 4 }}>
            <CardMedia image={data.image_url} sx={{ height: '14rem', objectFit: 'contain', width: '100%' }} />
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
                {data.pokemon}
              </Typography>
              <Box
                sx={{ borderRadius: 8, display: 'flex', gap: 2, height: 'auto' }}
              >
                {data.type.split('/').map((type) => (
                  <Box
                    px={4}
                    py={1.5}
                    sx={{ backgroundColor: '#4f4f4f', borderRadius: 8, display: 'flex', gap: 8 }}
                  >
                    <Typography sx={{ color: 'white', fontSize: 10, letterSpacing: 1.5 }}>
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
        </Grid>
      ))}
    </Grid>
  );
};

Home.displayName = 'Home';

export default Home;

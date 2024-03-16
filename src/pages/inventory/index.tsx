/* eslint-disable logical-assignment-operators */
/* eslint-disable react/jsx-key */
import { useEffect } from 'react';

import { Box, CardContent, CardMedia, Typography } from '@mui/material';

import type { PageComponent } from '@nxweb/react';

import getColorForType from '@components/custom/type-color/type-color';
import { Card, Grid } from '@components/material.js';
import { useCommand, useStore } from '@models/store.js';

const Inventory: PageComponent = () => {
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
    <>
      <h1>Inventory</h1>
      <Box sx={{ overflowX: 'scroll' }}>
        <Grid container={true} spacing={6} sx={{ display: 'flex', flexWrap: 'nowrap' }}>
          {state?.pokemons?.map((data) => (
            <Grid item={true} md={3}>
              <Box>
                <Card sx={{ p: 10, width: '16rem' }}>
                  <CardMedia image={data.image_url} sx={{ height: '12rem', objectFit: 'contain', width: '100%' }} />
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
                          key={type}
                          px={4}
                          py={1.5}
                          sx={{ backgroundColor: getColorForType(type), borderRadius: 8, display: 'flex', gap: 8 }}
                        >
                          <Typography sx={{ color: 'white', fontSize: 10, letterSpacing: 1.5 }}>
                            {type.trim()}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

Inventory.displayName = 'Inventory';

export default Inventory;

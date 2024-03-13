import { useEffect, useState } from 'react';

import type { PageComponent } from '@nxweb/react';

import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography
} from '@components/material.js';
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

  // If you encounter "Unexpected console statement", kindly ignore it. It's just a warning
  console.log(state);

  return (
    <Grid container={true} spacing={6}>
      <h1>Inventory Page</h1>
      <Grid item={true} xs={12}>
        <Card>
          <CardHeader title="Kick start your project 🚀" />
          <CardContent>
            <Typography sx={{ mb: 2 }}>
              All the best for your new project.
            </Typography>
            <Typography>
              Please make sure to read our Template Documentation to understand
              where to go from here and how to use our template.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item={true} xs={12}>
        <Card>
          <CardHeader title="ACL and JWT 🔒" />
          <CardContent>
            <Typography sx={{ mb: 2 }}>
              Access Control (ACL) and Authentication (JWT) are the two main
              security features of our template and are implemented in the
              starter-kit as well.
            </Typography>
            <Typography>
              Please read our Authentication and ACL Documentations to get more
              out of them.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

Home.displayName = 'Home';

export default Home;

import { useEffect, useState } from 'react';

import type { PageComponent } from '@nxweb/react';

import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from '@components/material.js';
import { useCommand, useStore } from '@models/store.js';

const Home: PageComponent = () => {
  const [state, dispatch] = useStore((store) => store.pokemons);
  const command = useCommand((cmd) => cmd);
  // If you encounter "setId is assigned a value but never used", kindly ignore it. It's just a warning
  const [id, setId] = useState<number | null>(null);
  const theme = useTheme();

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
      <h1>Test API</h1>
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

      {/* !! Delete the following !! */}
      {/* API Result Display */}
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Pokemon Name</TableCell>
              <TableCell>Pokemon Type</TableCell>
              <TableCell>Pokemon Abilities</TableCell>
              <TableCell>Pokemon Hit Points</TableCell>
              <TableCell>Pokemon Evolution</TableCell>
              <TableCell>Pokemon Location</TableCell>
              <TableCell>image_url</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state?.pokemon?.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  '&:last-child td, &:last-child th': {
                    border: 0
                  },
                  backgroundColor: id === row.id ? theme.palette.divider : 'inherit'
                }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.pokemon}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.abilities}</TableCell>
                <TableCell>{row.hitpoints}</TableCell>
                <TableCell>{row.evolutions}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.image_url}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

Home.displayName = 'Home';

export default Home;

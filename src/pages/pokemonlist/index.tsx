import { useEffect, useState } from 'react';

import type { PageComponent } from '@nxweb/react';

import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
      <h1>Pokemon List</h1>
      {/* !! Delete the following !! */}
      {/* API Result Display */}
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Pokemon</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state?.pokemons?.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  '&:last-child td, &:last-child th': {
                    border: 0
                  },
                  backgroundColor:
                    id === row.id ? theme.palette.divider : 'inherit'
                }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>
                  <img alt="" src={row.image_url} />
                </TableCell>
                <TableCell>{row.pokemon}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.location}</TableCell>
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

/* eslint-disable logical-assignment-operators */
/* eslint-disable react/jsx-key */
import { useEffect } from 'react';

import {
  Box,
  CardContent,
  CardMedia,
  Container,
  Typography
} from '@mui/material';

import type { PageComponent } from '@nxweb/react';

import getColorForType from '@components/custom/type-color/type-color';
import { Card, Grid } from '@components/material.js';
import { useCommand, useStore } from '@models/store.js';

import InventoryCard from './inventoryCard';

const Inventory: PageComponent = () => {
  const [state, dispatch] = useStore((store) => store.inventory);
  const command = useCommand((cmd) => cmd);

  /*
   * UseEffect(() => {
   *   dispatch(command.pokemons.load()).catch((err: unknown) => {
   *     console.error(err);
   *   });
   */

  /*
   *   return () => {
   *     dispatch(command.pokemons.clear());
   *   };
   * }, []);
   */

  return (
    <>
      <h1>Inventory</h1>

      {!state?.inventory || state?.inventory.length === 0
        ? (
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            height: '85%',
            justifyContent: 'center'
          }}
        >
          <h3>No Pokemon Obtained</h3>
        </Box>
        )
        : <InventoryCard inventory={state.inventory} />}
    </>
  );
};

Inventory.displayName = 'Inventory';

export default Inventory;

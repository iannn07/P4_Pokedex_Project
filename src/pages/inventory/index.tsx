/* eslint-disable logical-assignment-operators */
/* eslint-disable react/jsx-key */

import { Box } from '@mui/material';

import type { PageComponent } from '@nxweb/react';

import { useStore } from '@models/store.js';

import InventoryCard from './inventoryCard';

const Inventory: PageComponent = () => {
  const [state] = useStore((store) => store.inventory);

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

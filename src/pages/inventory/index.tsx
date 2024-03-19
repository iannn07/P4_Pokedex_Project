/* eslint-disable sort-keys */
/* eslint-disable logical-assignment-operators */
/* eslint-disable react/jsx-key */

import { Link } from 'react-router-dom';

import { Box, Button, Card, CardContent, Typography } from '@mui/material';

import { FishHook } from '@nxweb/icons/tabler';
import type { PageComponent } from '@nxweb/react';

import { useStore } from '@models/store';

import InventoryCard from './inventoryCard';

const Inventory: PageComponent = () => {
  const [state] = useStore((store) => store.inventory);

  return (
    <>
      <h1>Inventory</h1>

      {!state?.inventory || state?.inventory.length === 0
        ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              width: '50%'
            }}
          >
            <CardContent>
              <Typography sx={{ textAlign: 'center' }} variant="h5">
                No Pokemon Obtained
              </Typography>
              <Link to="../home">
                <Button sx={{ m: 10, height: '50px' }} variant="contained">
                  <FishHook height="32px" width="32px" />
                  Catch Pokemon Here :D
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Box>
        )
        : <InventoryCard inventory={state.inventory} />}
    </>
  );
};

Inventory.displayName = 'Inventory';

export default Inventory;

/* eslint-disable sort-keys */
/* eslint-disable react/display-name */
import React from 'react';
import { Link } from 'react-router-dom';

import {
  Box,
  Button,
  Card,
  CardContent,
  Typography
} from '@mui/material';

import { FishHook } from '@nxweb/icons/tabler';

import { useStore } from '@models/store';

import TrainerTable from './TrainerTable';

const TrainerPage = () => {
  const [state] = useStore((store) => store);
  const activities = state?.trainer?.activities || [];

  return (
    <>
      <h1>Trainer Log</h1>
      {!state?.trainer?.activities ||
      state?.trainer?.activities.length === 0
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
                  Start your activities by catching pokemon first :3
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Box>
        )
        : <TrainerTable activities={activities} />}
    </>
  );
};

export default TrainerPage;

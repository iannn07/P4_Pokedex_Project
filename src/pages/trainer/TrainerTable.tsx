/* eslint-disable @stylistic/js/linebreak-style */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/display-name */
import React from 'react';

import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';

import type { TrainerActivity } from '@models/trainer/types';

interface TrainerTableProps {
  readonly activities: TrainerActivity[]
}

const TrainerTable: React.FC<TrainerTableProps> = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return (
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            height: '50vh',
            justifyContent: 'center'
          }}
        >
          <Typography sx={{ textAlign: 'center' }}>No Activities</Typography>
        </Box>
    );
  }

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Pokemon</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Activity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activities.map((trainer, index) => {
            // Determine color and displayed text based on activity type
            let colors = '';
            let text = '';
            switch (trainer.activity) {
              case 'Add':
                text = 'Added to inventory';
                colors = '#00af7b';
                break;
              case 'Evolve':
                text = 'Pokemon has evolved';
                colors = '#ff9f43';
                break;
              case 'Remove':
                text = 'Removed from inventory';
                colors = '#ea5455';
                break;
              case 'Create':
                text = 'Added to pokemon list';
                colors = '#00af7b';
                break;
              case 'Update':
                text = 'Updated to pokemon list';
                colors = '#ff9f43';
                break;
              case 'Delete':
                text = 'Deleted from pokemon list';
                colors = '#ea5455';
                break;

              default:
                break;
            }

            // Split dateTime string into separate date and time components
            const [date, time] = trainer.dateTime.split(', ');

            return (
              <TableRow key={index}>
                <TableCell>
                  <Typography sx={{ fontWeight: 'bold', mb: 3 }}>
                    {trainer.pokemon.pokemon.toUpperCase()}
                  </Typography>
                </TableCell>
                <TableCell>{date}</TableCell>
                <TableCell>{time}</TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color: colors,
                      fontWeight: 'bold',
                      mb: 3
                    }}
                  >
                    {text.toUpperCase()}
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};

export default TrainerTable;

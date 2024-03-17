/* eslint-disable @stylistic/js/linebreak-style */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/display-name */
import React from 'react';

import {
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
    return <div>No activities to display</div>;
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
          {activities.map((activity, index) => {
            // Determine color based on activity type
            let colors = '';
            if (activity.activity) {
              if (activity.activity.includes('Add')) {
                colors = 'green';
              } else if (activity.activity.includes('Evolve')) {
                colors = 'orange';
              } else if (activity.activity.includes('Remove')) {
                colors = 'red';
              }
            }

            // Split dateTime string into separate date and time components
            const [date, time] = activity.dateTime.split(', ');

            return (
              <TableRow key={index}>
                <TableCell>
                  <Typography sx={{ fontWeight: 'bold', mb: 3 }}>
                    {activity.pokemon.pokemon.toUpperCase()}
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
                    {activity.activity ? activity.activity.toUpperCase() : ''}
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

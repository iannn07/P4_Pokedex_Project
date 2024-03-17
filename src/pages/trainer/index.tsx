/* eslint-disable react/display-name */
import React from 'react';

import { useStore } from '@models/store';

import TrainerTable from './TrainerTable';

const TrainerPage = () => {
  const [state] = useStore((store) => store);
  const activities = state?.trainer?.activities || [];

  return (
    <>
      <h1>Trainer Log</h1>
      <TrainerTable activities={activities} />
    </>
  );
};

export default TrainerPage;

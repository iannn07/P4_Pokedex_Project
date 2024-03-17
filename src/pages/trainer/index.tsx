/* eslint-disable react/display-name */
import { useStore } from '@models/store';
import type { TrainerActivity } from '@models/trainer/types';

import TrainerTable from './TrainerTable';

const TrainerPage = () => {
  const [state] = useStore((store) => store);
  const activities: TrainerActivity[] = state?.trainer?.activities || [];

  return (
    <>
      <h1>Trainer Log</h1>
      <TrainerTable activities={activities} />
    </>
  );
};

export default TrainerPage;

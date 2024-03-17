import type { TrainerAction, TrainerActivity } from './types';

const trainerCommand = (activity: TrainerActivity): TrainerAction => ({
  payload: activity,
  type: 'ADD_TRAINER_ACTIVITY'
});

export { trainerCommand };

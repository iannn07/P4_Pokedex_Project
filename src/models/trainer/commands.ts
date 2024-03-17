import type { TrainerAction, TrainerActivity } from './types';

export const trainerCommand = (activity: TrainerActivity): TrainerAction => ({
  payload: activity,
  type: 'ADD_TRAINER_ACTIVITY'
});

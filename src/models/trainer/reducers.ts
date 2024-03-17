import type { TrainerAction, TrainerModel } from './types';

export const initialTrainerState: TrainerModel = {
  activities: []
};

export const trainerReducer = (state = initialTrainerState, action: TrainerAction): TrainerModel => {
  switch (action.type) {
    case 'ADD_TRAINER_ACTIVITY':
      return {
        ...state,
        activities: [...state.activities, action.payload]
      };

    default:
      return state;
  }
};

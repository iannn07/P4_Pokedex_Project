import type { TrainerAction, TrainerActivity, TrainerModel } from './types';

const initialTrainerState: TrainerModel = {
  activities: []
};

const trainerReducer = (state = initialTrainerState, action: TrainerAction): TrainerModel => {
  switch (action.type) {
    case 'ADD_TRAINER_ACTIVITY':
      return {
        ...state,
        activities: [...state.activities, action.payload as TrainerActivity]
      };

    default:
      return state;
  }
};

export { trainerReducer, initialTrainerState };

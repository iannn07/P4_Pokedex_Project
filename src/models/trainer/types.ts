import type { inventoryPokemons } from '@models/inventory/types';

interface TrainerActivity {
  activity: string
  dateTime: string
  pokemon: inventoryPokemons
}

interface TrainerModel {
  activities: TrainerActivity[]
}

interface TrainerAction {
  payload: TrainerActivity
  type: 'ADD_TRAINER_ACTIVITY'
}

export type { TrainerActivity, TrainerModel, TrainerAction };

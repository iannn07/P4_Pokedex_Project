import type { InventoryPokemons } from '@models/inventory/types';

interface TrainerActivity {
  activity: string
  dateTime: string
  pokemon: InventoryPokemons
}

interface TrainerModel {
  activities: TrainerActivity[]
}

interface TrainerAction {
  payload: TrainerActivity
  type: 'ADD_TRAINER_ACTIVITY'
}

export type { TrainerActivity, TrainerModel, TrainerAction };

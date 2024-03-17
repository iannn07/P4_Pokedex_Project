import type { Pokemons } from '@models/pokemon/types';

interface TrainerActivity {
  activity: string
  dateTime: string
  pokemon: Pokemons
}

interface TrainerModel {
  activities: TrainerActivity[]
}

interface TrainerAction {
  payload: TrainerActivity
  type: 'ADD_TRAINER_ACTIVITY'
}

export type { TrainerActivity, TrainerModel, TrainerAction };

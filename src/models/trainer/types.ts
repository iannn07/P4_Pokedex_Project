import type { Pokemons } from '@models/pokemon/types';

export interface TrainerActivity {
  activity: string
  dateTime: string
  pokemon: Pokemons
}

export interface TrainerModel {
  activities: TrainerActivity[]
}

export interface TrainerAction {
  payload: TrainerActivity
  type: 'ADD_TRAINER_ACTIVITY'
}

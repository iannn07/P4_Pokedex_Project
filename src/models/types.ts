import type { PokeListAction, PokeListModel } from './pokeListCRUD/types';
import type { PokemonsAction, PokemonsModel } from './pokemon/types';
import type { TrainerAction, TrainerModel } from './trainer/types';

export interface RootModel {
  pokeList?: PokeListModel
  pokemons?: PokemonsModel
  trainer?: TrainerModel
}

export type RootAction = PokeListAction | PokemonsAction | TrainerAction;

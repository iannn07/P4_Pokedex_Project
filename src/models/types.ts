import type { InventoryPokemonsAction, InventoryPokemonsModel } from './inventory/types';
import type { PokemonsAction, PokemonsModel } from './pokemon/types';
import type { TrainerAction, TrainerModel } from './trainer/types';

export interface RootModel {
  inventory?: InventoryPokemonsModel
  pokemons?: PokemonsModel
  trainer?: TrainerModel
}

export type RootAction = InventoryPokemonsAction | PokemonsAction | TrainerAction;

import type { InventoryPokemonsAction, InventoryPokemonsModel } from './inventory/types';
import type { PokeListAction, PokeListModel } from './pokeListCRUD/types';
import type { PokemonsAction, PokemonsModel } from './pokemon/types';
import type { TrainerAction, TrainerModel } from './trainer/types';

export interface RootModel {
  inventory?: InventoryPokemonsModel
  pokeList?: PokeListModel
  pokemons?: PokemonsModel
  trainer?: TrainerModel
}

export type RootAction = InventoryPokemonsAction | PokeListAction | PokemonsAction | TrainerAction;

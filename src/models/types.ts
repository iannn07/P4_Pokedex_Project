import type { inventoryPokemonsAction, inventoryPokemonsModel } from './inventory/types';
import type { PokeListAction, PokeListModel } from './pokeListCRUD/types';
import type { PokemonsAction, PokemonsModel } from './pokemon/types';
import type { TrainerAction, TrainerModel } from './trainer/types';

export interface RootModel {
  inventory?: inventoryPokemonsModel
  pokeList?: PokeListModel
  pokemons?: PokemonsModel
  trainer?: TrainerModel
}

export type RootAction = inventoryPokemonsAction &
PokeListAction &
PokemonsAction &
TrainerAction;

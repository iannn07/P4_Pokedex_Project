import type { PokeListAction, PokeListModel } from './pokeListCRUD/types';
import type { PokemonsAction, PokemonsModel } from './pokemon/types';

export interface RootModel {
  pokeList?: PokeListModel
  pokemons?: PokemonsModel
}

export type RootAction = PokeListAction | PokemonsAction;

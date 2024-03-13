import type { PokemonsAction, PokemonsModel } from './pokemon/types';
import type { ProductsModel } from './products/types';

export interface RootModel {
  pokemons?: PokemonsModel
  products?: ProductsModel
}

export type RootAction = PokemonsAction;

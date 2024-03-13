import type { PokemonsAction, PokemonsModel } from './pokemon/types';

export interface RootModel {
  pokemons?: PokemonsModel
}

export type RootAction = PokemonsAction;

import { PokemonsActionType } from './types';

import type { PokemonsAction, PokemonsModel } from './types';

const pokemonReducer = (
  state: PokemonsModel = {},
  action: Readonly<PokemonsAction>
): PokemonsModel => {
  switch (action.type) {
    case PokemonsActionType.Load:
      return { ...state, ...action.value };
    case PokemonsActionType.Clear:
      return {};

    default:
      return state;
  }
};

export { pokemonReducer };

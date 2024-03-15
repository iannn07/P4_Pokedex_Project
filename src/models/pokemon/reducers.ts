import { PokemonsActionType } from './types.js';

import type { PokemonsAction, PokemonsModel } from './types.js';

const pokemonsReducer = (
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

export { pokemonsReducer };

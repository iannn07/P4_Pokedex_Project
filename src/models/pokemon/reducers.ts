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
    case PokemonsActionType.Delete: {
      return {
        ...state,
        pokemons: state.pokemons?.filter(
          (pokemon) => pokemon.id !== action.value
        )
      };
    }

    default:
      return state;
  }
};

export { pokemonsReducer };

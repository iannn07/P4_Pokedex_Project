import { PokeListActionType } from './types.js';

import type { PokeListAction, PokeListModel } from './types.js';

const pokemonsReducer = (
  state: PokeListModel = {},
  action: Readonly<PokeListAction>
): PokeListModel => {
  switch (action.type) {
    case PokeListActionType.CLEAR:
      return {};
    case PokeListActionType.ADD_POKEMON:
      return { ...state, ...action.value };
    case PokeListActionType.EDIT_POKEMON:
      return { ...state, ...action.value };
    case PokeListActionType.DELETE_POKEMON:
      return { ...state };

    default:
      return state;
  }
};

export { pokemonsReducer };

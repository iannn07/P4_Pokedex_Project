/* eslint-disable import/exports-last */
import { PokeListActionType } from './types.js';

import type { PokeListAction, PokeListModel } from './types.js';

export const initialState = {
  pokemons: []
};

const pokeListReducer = (
  state: PokeListModel = initialState,
  action: Readonly<PokeListAction>
): PokeListModel => {
  switch (action.type) {
    case PokeListActionType.ADD_POKEMON: {
      const updatedPokemons = action.payload?.pokemons || [];
      const pokemons = state.pokemons || [];

      return {
        ...state,
        pokemons: [...pokemons, ...updatedPokemons]
      };
    }

    default:
      return state;
  }
};

export { pokeListReducer };

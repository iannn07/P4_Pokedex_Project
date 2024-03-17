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
      const newPokemons = action.payload?.pokemons || [];
      const pokemons = state.pokemons || [];

      return {
        ...state,
        pokemons: [...pokemons, ...newPokemons]
      };
    }
    case PokeListActionType.DELETE_POKEMON: {
      return {
        ...state,
        pokemons: state.pokemons?.filter(
          (pokemon) => pokemon.id !== action.payload
        )
      };
    }
    case PokeListActionType.EDIT_POKEMON: {
      const editedPokemon = action.payload;
      if (editedPokemon) {
        return {
          ...state,
          pokemons: state.pokemons?.map((pokemon) => (pokemon.id === editedPokemon.id ? editedPokemon : pokemon))
        };
      }

      return state;
    }

    default:
      return state;
  }
};

export { pokeListReducer };

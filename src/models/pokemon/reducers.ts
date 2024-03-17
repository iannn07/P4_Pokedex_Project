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
    case PokemonsActionType.Edit: {
      const editedPokemon = action.value;
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

export { pokemonsReducer };

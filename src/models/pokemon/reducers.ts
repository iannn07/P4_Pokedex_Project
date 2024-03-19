import { PokemonsActionType } from './types.js';

import type { Pokemons, PokemonsAction, PokemonsModel } from './types.js';

const pokemonsReducer = (
  state: PokemonsModel = {},
  action: Readonly<PokemonsAction>
): PokemonsModel => {
  switch (action.type) {
    case PokemonsActionType.Load: {
      if (!state.pokemons) {
        return {
          ...state,
          ...action.payload
        };
      }

      const filteredPokemon: Pokemons[] | undefined = state.pokemons?.map(
        (pokemon) => {
          const updatedPokemon = action.payload?.pokemons?.find(
            (newPokemon) => newPokemon.id === pokemon.id
          );

          if (updatedPokemon) {
            return {
              ...updatedPokemon,
              inInventory: pokemon.inInventory,
              isObtained: pokemon.isObtained
            };
          }

          return pokemon;
        }
      );

      return {
        ...state,
        ...filteredPokemon
      };
    }
    case PokemonsActionType.Clear:
      return {};
    case PokemonsActionType.Delete: {
      return {
        ...state,
        pokemons: state.pokemons?.filter(
          (pokemon) => pokemon.id !== action.payload
        )
      };
    }
    case PokemonsActionType.Edit: {
      const editedPokemon = action.payload;
      if (editedPokemon) {
        return {
          ...state,
          pokemons: state.pokemons?.map((pokemon) => (pokemon.id === editedPokemon.id
            ? { ...pokemon, ...editedPokemon }
            : pokemon))
        };
      }

      return state;
    }

    default:
      return state;
  }
};

export { pokemonsReducer };

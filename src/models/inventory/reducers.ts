/* eslint-disable multiline-comment-style */
import { inventoryPokemonsActionType } from './types.js';

import type {
  inventoryPokemons,
  inventoryPokemonsAction,
  inventoryPokemonsModel
} from './types.js';

const inventoryPokemonsReducer = (
  state: inventoryPokemonsModel = {},
  action: Readonly<inventoryPokemonsAction>
): inventoryPokemonsModel => {
  switch (action.type) {
    case inventoryPokemonsActionType.Add: {
      if (!action.value) {
        throw new Error('action.value missing in ADD action');
      }

      const pokemon = action.value;

      const filteredPokemon: inventoryPokemons[] | undefined = state.inventory?.filter(
        (obtainedPokemon) => obtainedPokemon !== pokemon
      );

      const itemExists: boolean | undefined = state.inventory?.some(
        (obtainedPokemon) => obtainedPokemon === pokemon
      );
      if (itemExists) {
        throw new Error('Pokemon already in the inventory');
      }

      pokemon.date = new Date().toLocaleString();

      return {
        ...state,
        inventory: filteredPokemon
          ? [pokemon, ...filteredPokemon]
          : [pokemon]
      };
    }
    case inventoryPokemonsActionType.Remove: {
      if (!action.value) {
        throw new Error('action.value missing in REMOVE action');
      }

      const pokemon = action.value;

      const filteredPokemon: inventoryPokemons[] | undefined = state.inventory?.filter(
        (obtainedPokemon) => obtainedPokemon !== pokemon
      );

      return {
        ...state,
        inventory: filteredPokemon ? [...filteredPokemon] : []
      };
    }
    case inventoryPokemonsActionType.Evolve: {
      if (!action.evolve && !action.pokemon) {
        throw new Error('action.value missing in EVOLVE action');
      }

      const evolvedPokemon: inventoryPokemons = action.evolve;
      const currentPokemon: inventoryPokemons = action.pokemon;

      const filteredPokemon: inventoryPokemons[] | undefined = state.inventory?.filter(
        (obtainedPokemon) => obtainedPokemon !== currentPokemon
      );
      if (filteredPokemon === undefined) {
        throw new Error('pokemon not in EVOLVE action');
      }

      evolvedPokemon.date = new Date().toLocaleString();

      return {
        ...state,
        inventory: filteredPokemon
          ? [evolvedPokemon, ...filteredPokemon]
          : []
      };
    }
    // Case inventoryPokemonsActionType.Load:
    //   return { ...state, ...action.value };
    case inventoryPokemonsActionType.Clear:
      return {};

    default:
      return state;
  }
};

export { inventoryPokemonsReducer };

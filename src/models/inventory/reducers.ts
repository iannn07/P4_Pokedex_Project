/* eslint-disable multiline-comment-style */
import { InventoryPokemonsActionType } from './types.js';

import type {
  InventoryPokemons,
  InventoryPokemonsAction,
  InventoryPokemonsModel
} from './types.js';

const inventoryReducer = (
  state: InventoryPokemonsModel = {},
  action: Readonly<InventoryPokemonsAction>
): InventoryPokemonsModel => {
  switch (action.type) {
    case InventoryPokemonsActionType.AddInventory: {
      if (!action.value) {
        throw new Error('action.value missing in ADD action');
      }

      const pokemon = action.value;

      const filteredPokemon: InventoryPokemons[] | undefined =
        state.inventory?.filter(
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
        inventory: filteredPokemon ? [pokemon, ...filteredPokemon] : [pokemon]
      };
    }
    case InventoryPokemonsActionType.RemoveInventory: {
      if (!action.value) {
        throw new Error('action.value missing in REMOVE action');
      }

      const pokemon = action.value;

      const filteredPokemon: InventoryPokemons[] | undefined =
        state.inventory?.filter(
          (obtainedPokemon) => obtainedPokemon.pokemon !== pokemon.pokemon
        );

      return {
        ...state,
        inventory: filteredPokemon ? [...filteredPokemon] : []
      };
    }
    case InventoryPokemonsActionType.EditInventory: {
      if (!action.value) {
        throw new Error('action.value missing in Edit action');
      }

      const editedPokemon = action.value;
      if (editedPokemon) {
        return {
          ...state,
          inventory: state.inventory?.map((pokemon) => (pokemon.id === editedPokemon.id ? editedPokemon : pokemon))
        };
      }

      return state;
    }
    case InventoryPokemonsActionType.EvolveInventory: {
      if (!action.evolve && !action.pokemon) {
        throw new Error('action.value missing in EVOLVE action');
      }

      const evolvedPokemon: InventoryPokemons = action.evolve;
      const currentPokemon: InventoryPokemons = action.pokemon;

      const filteredPokemon: InventoryPokemons[] | undefined =
        state.inventory?.filter(
          (obtainedPokemon) => obtainedPokemon !== currentPokemon
        );

      if (filteredPokemon === undefined) {
        throw new Error('pokemon not in EVOLVE action');
      }

      const evolvePokemonExists: boolean | undefined = state.inventory?.some(
        (obtainedPokemon) => obtainedPokemon.pokemon === evolvedPokemon.pokemon
      );
      if (evolvePokemonExists) {
        throw new Error('Evolved Pokemon already in the inventory');
      }

      evolvedPokemon.date = new Date().toLocaleString();

      return {
        ...state,
        inventory: filteredPokemon ? [evolvedPokemon, ...filteredPokemon] : []
      };
    }
    case InventoryPokemonsActionType.ClearInventory:
      return {};

    default:
      return state;
  }
};

export { inventoryReducer };

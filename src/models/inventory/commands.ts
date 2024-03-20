/* eslint-disable capitalized-comments */
/* eslint-disable multiline-comment-style */
import type { Command } from '@nxweb/core';

// Import { getPokemon } from '@api/clients/pokemons.js';
import type { RootModel } from '@models/types.js';

import { InventoryPokemonsActionType } from './types.js';

import type { InventoryPokemons, InventoryPokemonsAction } from './types.js';

const inventoryCommand = {
  addInventory: (value: InventoryPokemons): InventoryPokemonsAction => {
    return {
      type: InventoryPokemonsActionType.AddInventory,
      value
    };
  },
  clearInventory: (): InventoryPokemonsAction => {
    return {
      type: InventoryPokemonsActionType.ClearInventory
    };
  },
  editInventory: (value: InventoryPokemons): InventoryPokemonsAction => {
    return {
      type: InventoryPokemonsActionType.EditInventory,
      value
    };
  },
  evolveInventory: (
    pokemon: InventoryPokemons,
    evolve: InventoryPokemons
  ): InventoryPokemonsAction => {
    return {
      evolve,
      pokemon,
      type: InventoryPokemonsActionType.EvolveInventory
    };
  },

  removeInventory: (value: InventoryPokemons): InventoryPokemonsAction => {
    return {
      type: InventoryPokemonsActionType.RemoveInventory,
      value
    };
  }
} satisfies Command<RootModel, InventoryPokemonsAction>;

export { inventoryCommand };

/* eslint-disable capitalized-comments */
/* eslint-disable multiline-comment-style */
import type { Command } from '@nxweb/core';

// Import { getPokemon } from '@api/clients/pokemons.js';
import type { RootModel } from '@models/types.js';

import { inventoryPokemonsActionType } from './types.js';

import type {
  inventoryPokemons,
  inventoryPokemonsAction
} from './types.js';

const inventoryCommand = {
  add: (value: inventoryPokemons): inventoryPokemonsAction => {
    return {
      type: inventoryPokemonsActionType.Add,
      value
    };
  },
  clear: (): inventoryPokemonsAction => {
    return {
      type: inventoryPokemonsActionType.Clear,
    };
  },
  evolve: (
    pokemon: inventoryPokemons,
    evolve: inventoryPokemons
  ): inventoryPokemonsAction => {
    return {
      evolve,
      pokemon,
      type: inventoryPokemonsActionType.Evolve
    };
  },
  // load: () => {
  //   return async (dispatch) => {
  //     try {
  //       // Const res = await getPokemon(token, options);

  //       // Here's the error solution for now
  //       const apiUrl = 'https://dummyapi.online/api/pokemon';
  //       const res = await fetch(apiUrl).then((res) => res.json());

  //       if (res) {
  //         const value: PokemonsModel = {
  //           pokemons: res,
  //         };

  //         dispatch({
  //           type: PokemonsActionType.Load,
  //           value,
  //         });
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  // },
  remove: (value: inventoryPokemons): inventoryPokemonsAction => {
    return {
      type: inventoryPokemonsActionType.Remove,
      value
    };
  },
} satisfies Command<RootModel, inventoryPokemonsAction>;

export { inventoryCommand };

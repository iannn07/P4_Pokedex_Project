import type { Command } from '@nxweb/core';

// Import { getPokemon } from '@api/clients/pokemons.js';
import type { RootModel } from '@models/types.js';

import { PokemonsActionType } from './types.js';

import type { PokemonsAction, PokemonsModel } from './types.js';

const pokemonsCommand = {
  clear: (): PokemonsAction => {
    return {
      type: PokemonsActionType.Clear
    };
  },
  load: () => {
    return async (dispatch) => {
      try {
        // Const res = await getPokemon(token, options);

        // Here's the error solution for now
        const apiUrl = 'https://dummyapi.online/api/pokemon';
        const res = await fetch(apiUrl).then((res) => res.json());

        if (res) {
          const value: PokemonsModel = {
            pokemons: res
          };

          dispatch({
            type: PokemonsActionType.Load,
            value
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
  }
} satisfies Command<RootModel, PokemonsAction>;

export { pokemonsCommand };

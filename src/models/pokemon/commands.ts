/* eslint-disable sort-keys */
import type { Command } from '@nxweb/core';

// Import { getPokemon } from '@api/clients/pokemons.js';
import type { RootModel } from '@models/types.js';

import { PokemonsActionType } from './types.js';

import type { Pokemons, PokemonsAction, PokemonsModel } from './types.js';

const pokemonsCommand = {
  add: (pokemon: PokemonsModel): PokemonsAction => {
    return {
      type: PokemonsActionType.Add,
      payload: pokemon
    };
  },
  clear: (): PokemonsAction => {
    return {
      type: PokemonsActionType.Clear
    };
  },
  delete: (id: number): PokemonsAction => {
    return {
      type: PokemonsActionType.Delete,
      payload: id
    };
  },
  edit: (pokemon: Pokemons): PokemonsAction => {
    return {
      type: PokemonsActionType.Edit,
      payload: pokemon
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
          const payload: PokemonsModel = {
            pokemons: res
          };

          dispatch({
            type: PokemonsActionType.Load,
            payload
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
  }
} satisfies Command<RootModel, PokemonsAction>;

export { pokemonsCommand };

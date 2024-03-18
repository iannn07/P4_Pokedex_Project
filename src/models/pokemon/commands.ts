/* eslint-disable sort-keys */
import type { Command } from '@nxweb/core';

// Import { getPokemon } from '@api/clients/pokemons.js';
import type { RootModel } from '@models/types.js';

import { PokemonsActionType } from './types.js';

import type { Pokemons, PokemonsAction, PokemonsModel } from './types.js';

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
  },
  delete: (id: number): PokemonsAction => {
    return {
      type: PokemonsActionType.Delete,
      payload: id
    };
  },
  edit: (pokemon: Pokemons): PokemonsAction => {
    return {
      payload: pokemon,
      type: PokemonsActionType.Edit
    };
  }
} satisfies Command<RootModel, PokemonsAction>;

export { pokemonsCommand };

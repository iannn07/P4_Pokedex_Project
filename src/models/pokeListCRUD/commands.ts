/* eslint-disable sort-keys */
import type { Command } from '@nxweb/core';

// Import { getPokemon } from '@api/clients/pokemons.js';
import type { RootModel } from '@models/types.js';

import { PokeListActionType } from './types.js';

import type { PokeList, PokeListAction, PokeListModel } from './types.js';

const pokeListCommand = {
  addPokemon: (value: PokeListModel): PokeListAction => {
    return {
      type: PokeListActionType.ADD_POKEMON,
      payload: value
    };
  },
  deletePokemon: (value: number): PokeListAction => {
    return {
      type: PokeListActionType.DELETE_POKEMON,
      payload: value
    };
  },
  editPokemon: (value: PokeList): PokeListAction => {
    return {
      type: PokeListActionType.EDIT_POKEMON,
      payload: value
    };
  }
} satisfies Command<RootModel, PokeListAction>;

export { pokeListCommand };

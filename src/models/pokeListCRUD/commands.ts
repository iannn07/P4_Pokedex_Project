import type { Command } from '@nxweb/core';

// Import { getPokemon } from '@api/clients/pokemons.js';
import type { RootModel } from '@models/types.js';

import { PokeListActionType } from './types.js';

import type { PokeListAction, PokeListModel } from './types.js';

const pokeListCommand = {
  addPokemon: (value: PokeListModel): PokeListAction => {
    return {
      type: PokeListActionType.ADD_POKEMON,
      value
    };
  },
  clear: (): PokeListAction => {
    return {
      type: PokeListActionType.CLEAR
    };
  },
  deletePokemon: (): PokeListAction => {
    return {
      type: PokeListActionType.DELETE_POKEMON
    };
  },
  editPokemon: (value?: PokeListModel): PokeListAction => {
    return {
      type: PokeListActionType.EDIT_POKEMON,
      value
    };
  }
} satisfies Command<RootModel, PokeListAction>;

export { pokeListCommand };

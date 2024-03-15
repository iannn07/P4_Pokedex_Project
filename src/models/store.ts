import { combineReducers, createStore } from '@nxweb/core';
import {
  createCommandHook,
  createDispatchHook,
  createStoreHook,
  createStoreProvider
} from '@nxweb/react';

import { pokeListCommand } from './pokeListCRUD/commands.js';
import { pokemonsCommand } from './pokemon/commands.js';
import { pokemonsReducer } from './pokemon/reducers.js';

import type { RootAction, RootModel } from './types.js';

// ** Init reducers
const rootReducer = combineReducers({
  pokemons: pokemonsReducer
});

// ** Init models
const rootModel: RootModel = {
  pokeList: {},
  pokemons: {}
};

// ** Init commands
const rootCommand = {
  pokeList: pokeListCommand,
  pokemons: pokemonsCommand
};

// ** Create store
export const store = createStore(rootReducer, rootModel);

// ** Create store provider
export const StoreProvider = createStoreProvider(store);

// ** Create store hook
export const useStore = createStoreHook<RootModel, RootAction>();

// ** Create command hook
export const useCommand = createCommandHook(rootCommand);

// ** Create dispatch hook
export const useDispatch = createDispatchHook<RootModel, RootAction>();

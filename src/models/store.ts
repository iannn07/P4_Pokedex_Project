/* eslint-disable sort-keys */
import { combineReducers, createStore } from '@nxweb/core';
import {
  createCommandHook,
  createDispatchHook,
  createStoreHook,
  createStoreProvider
} from '@nxweb/react';

import { inventoryCommand } from './inventory/commands.js';
import { inventoryReducer } from './inventory/reducers.js';
import { pokemonsCommand } from './pokemon/commands.js';
import { pokemonsReducer } from './pokemon/reducers.js';
import { trainerCommand } from './trainer/commands.js';
import { initialTrainerState, trainerReducer } from './trainer/reducers.js';

import type { RootAction, RootModel } from './types.js';

// ** Init reducers
const rootReducer = combineReducers({
  inventory: inventoryReducer,
  pokemons: pokemonsReducer,
  trainer: trainerReducer
});

// ** Init models
const rootModel: RootModel = {
  inventory: {},
  trainer: initialTrainerState,
  pokemons: {}
};

// ** Init commands
const rootCommand = {
  inventory: inventoryCommand,
  trainer: trainerCommand,
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

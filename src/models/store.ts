/* eslint-disable sort-keys */
import { combineReducers, createStore } from '@nxweb/core';
import {
  createCommandHook,
  createDispatchHook,
  createStoreHook,
  createStoreProvider
} from '@nxweb/react';

import { pokeListCommand } from './pokeListCRUD/commands.js';
import { initialState, pokeListReducer } from './pokeListCRUD/reducers.js';
import { pokemonsCommand } from './pokemon/commands.js';
import { pokemonsReducer } from './pokemon/reducers.js';
import { trainerCommand } from './trainer/commands.js';
import { initialTrainerState, trainerReducer } from './trainer/reducers.js';

import type { RootAction, RootModel } from './types.js';

// ** Init reducers
const rootReducer = combineReducers({
  pokemons: pokemonsReducer,
  pokeList: pokeListReducer,
  trainer: trainerReducer
});

// ** Init models
const rootModel: RootModel = {
  pokeList: initialState,
  trainer: initialTrainerState,
  pokemons: {}
};

// ** Init commands
const rootCommand = {
  pokeList: pokeListCommand,
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

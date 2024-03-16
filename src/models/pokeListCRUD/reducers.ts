/* eslint-disable import/exports-last */
import { PokeListActionType } from './types.js';

import type { PokeListAction, PokeListModel } from './types.js';

export const initialState = {
  id: 0,
  pokemons: []
};

const pokeListReducer = (
  state: PokeListModel = initialState,
  action: Readonly<PokeListAction>
): PokeListModel => {
  switch (action.type) {
    case PokeListActionType.ADD_POKEMON: {
      const newPokemons = action.payload?.pokemons || [];
      const pokemons = state.pokemons || [];

      return {
        ...state,
        pokemons: [...pokemons, ...newPokemons]
      };
    }
    case PokeListActionType.EDIT_POKEMON: {
      const updatedPokemons = action.payload?.pokemons || [];
      const pokemons = state.pokemons || [];
      const targetPokemon = pokemons.find(
        (pokemon) => pokemon.id === action.payload?.id
      );

      updatedPokemons.forEach((updatedPokemon) => {
        if (targetPokemon) {
          targetPokemon.abilities = updatedPokemon.abilities;
          targetPokemon.evolutions = updatedPokemon.evolutions;
          targetPokemon.hitpoints = updatedPokemon.hitpoints;
          targetPokemon.location = updatedPokemon.location;
          targetPokemon.pokemon = updatedPokemon.pokemon;
          targetPokemon.type = updatedPokemon.type;
        }
      });

      return {
        ...state,
        pokemons: [...pokemons, ...updatedPokemons]
      };
    }
    case PokeListActionType.DELETE_POKEMON: {
      const targetPokemon = state.pokemons?.find(
        (pokemon) => pokemon.id === action.payload
      );
      if (targetPokemon) {
        targetPokemon.abilities = [];
        targetPokemon.evolutions = [];
        targetPokemon.hitpoints = 0;
        targetPokemon.location = '';
        targetPokemon.pokemon = '';
        targetPokemon.type = '';
      }

      return {
        ...state,
        pokemons: state.pokemons?.filter(
          (pokemon) => pokemon.id !== action.payload
        )
      };
    }

    default:
      return state;
  }
};

export { pokeListReducer };

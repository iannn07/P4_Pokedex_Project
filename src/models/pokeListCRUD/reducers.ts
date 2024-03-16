/* eslint-disable import/exports-last */
import { PokeListActionType } from './types.js';

import type { PokeListAction, PokeListModel } from './types.js';

export const initialState = {
  // id: 0,
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
    case PokeListActionType.DELETE_POKEMON: {
      return {
        ...state,
        pokemons: state.pokemons?.filter(
          (pokemon) => pokemon.id !== action.payload
        )
      };
    }

    /*
     * Case PokeListActionType.EDIT_POKEMON: {
     *   const updatedPokemons =
     *     {
     *       action.payload?.abilities,
     *       action.payload?.evolutions,
     *       action.payload?.hitpoints,
     *       action.payload?.location,
     *       action.payload?.pokemon,
     *       action.payload?.type,
     *     } || [];
     *   const targetPokemon = state.pokemons?.find(
     *     (pokemon) => pokemon.id === action.payload
     *   );
     */

    /*
     *   if (targetPokemon) {
     *     targetPokemon.abilities = updatedPokemons.abilities;
     *     targetPokemon.evolutions = updatedPokemons.evolutions;
     *     targetPokemon.hitpoints = updatedPokemons.hitpoints;
     *     targetPokemon.location = updatedPokemons.location;
     *     targetPokemon.pokemon = updatedPokemons.pokemon;
     *     targetPokemon.type = updatedPokemons.type;
     *   }
     */

    /*
     *   return {
     *     ...state,
     *     pokemons: state.pokemons?.filter(
     *       (pokemon) => pokemon.id !== action.payload
     *     ),
     *   };
     * }
     */

    default:
      return state;
  }
};

export { pokeListReducer };

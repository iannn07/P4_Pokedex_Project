import type { FetchURLOptions } from '@nxweb/core';

import type { Pokemons } from '@models/pokemon/types.js';

import { API, apiURL } from '../base.js';

interface pokemonAPIResponse {
  pokemon: Pokemons[]
}

export const endpoint = 'pokemon';

export const getPokemon = async (
  token: string,
  options?: Readonly<FetchURLOptions>
) => {
  const url = apiURL(endpoint, options);
  const { data } = await API(
    token /* +uncomment to mock: , undefined, true */
  ).get(url.toString());

  const response = data as pokemonAPIResponse;

  return response.pokemon;
};

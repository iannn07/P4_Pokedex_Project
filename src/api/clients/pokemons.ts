import type { FetchURLOptions } from '@nxweb/core';

import type { Pokemons } from '@models/pokemon/types.js';

import { pokemonAPI, pokemonApiURL } from '../base.js';

interface pokemonAPIResponse {
  pokemon: Pokemons[]
}

export const endpoint = 'pokemon';

export const getPokemon = async (
  options?: Readonly<FetchURLOptions>
) => {
  const url = pokemonApiURL(endpoint, options);
  const { data } = await pokemonAPI().get(url.toString());

  const response = data as pokemonAPIResponse;

  return response.pokemon;
};

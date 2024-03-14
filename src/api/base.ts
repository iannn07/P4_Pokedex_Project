import { compact, createFetch, createFetchURL } from '@nxweb/core';
import type { FetchURLOptions } from '@nxweb/core';

import { apiMock } from './mock.js';

export const apiURL = (
  endpoint: string,
  options: Readonly<FetchURLOptions> = {}
) => {
  return createFetchURL(
    endpoint,
    compact({
      ...options,
      get baseURL() {
        return options.baseURL ?? window.NX.env.apiURL;
      }
    })
  );
};

export const API = (
  token: string,
  type: string = 'Bearer' as const,
  mocked: boolean = false
) => {
  const fetch = createFetch({
    get baseURL() {
      return window.NX.env.apiURL;
    },
    headers: compact({
      authorization: [type, token].filter(Boolean).join(' ')
    })
  });

  return mocked ? apiMock(fetch) : fetch;
};

export const pokemonApiURL = (
  endpoint: string,
  options: Readonly<FetchURLOptions> = {}
) => createFetchURL(endpoint, {
  baseURL: window.NX.env.pokemonAPI,
  ...options
});

export const pokemonAPI = () => createFetch({
  baseURL: window.NX?.env?.pokemonAPI
});

import {
  Accessible,
  Backpack,
  Pokeball,
  SmartHome
} from '@nxweb/icons/tabler';

import type { HorizontalNavItemsType } from '@layouts/types.js';

export const navigation: readonly HorizontalNavItemsType[] = [
  {
    icon: <SmartHome />,
    id: 'home',
    link: '/home',
    text: 'Home'
  },
  {
    icon: <Backpack />,
    id: 'inventory',
    link: '/inventory',
    text: 'Inventory'
  },
  {
    icon: <Pokeball />,
    id: 'pokemon-list',
    link: '/pokemonlist',
    text: 'Pokemon List'
  },
  {
    icon: <Accessible />,
    id: 'trainer-log',
    link: '/trainer',
    text: 'Trainer Log'
  }
];

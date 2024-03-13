import {
  File,
  Lock,
  Mail,
  Shield,
  SmartHome,
  Backpack,
  Pokeball,
} from "@nxweb/icons/tabler";

import type { HorizontalNavItemsType } from '@layouts/types.js';

export const navigation: readonly HorizontalNavItemsType[] = [
  {
    icon: <SmartHome />,
    id: "home",
    link: "/home",
    text: "Home",
  },
  {
    icon: <Backpack />,
    id: "inventory",
    link: "/inventory",
    text: "Inventory",
  },
  {
    icon: <Pokeball />,
    id: "pokemon-list",
    link: "/pokemonlist",
    text: "Pokemon List",
  },
];

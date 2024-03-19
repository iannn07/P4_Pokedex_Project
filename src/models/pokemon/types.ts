/* eslint-disable @typescript-eslint/member-ordering */
interface Pokemons {
  abilities: string[]
  date?: string
  evolutions: string[]
  hitpoints: number
  id: number
  image_url: string
  inInventory?: boolean
  isObtained?: boolean
  location: string
  pokemon: string
  type: string
}

// Page Model
interface PokemonsModel {
  pokemons?: Pokemons[]
}

enum PokemonsActionType {
  Add = 'pokemons-add',
  Clear = 'pokemons-clear',
  Delete = 'pokemons-delete',
  Edit = 'pokemons-edit',
  Load = 'pokemons-load'
}

type PokemonsAction = {
  type: PokemonsActionType.Add
  payload?: PokemonsModel
} | {
  type: PokemonsActionType.Clear
} | {
  type: PokemonsActionType.Delete
  payload?: number
} | {
  type: PokemonsActionType.Edit
  payload?: Pokemons
} | {
  type: PokemonsActionType.Load
  payload?: PokemonsModel
};

export { PokemonsActionType };
export type { PokemonsModel, PokemonsAction, Pokemons };

/* eslint-disable @typescript-eslint/member-ordering */
interface Pokemons {
  abilities: string[]
  date?: string
  evolutions: string[]
  hitpoints: number
  id: number
  image_url: string
  inInventory: boolean
  isObtained: boolean
  location: string
  pokemon: string
  type: string
}

// Page Model
interface PokemonsModel {
  pokemons?: Pokemons[]
}

enum PokemonsActionType {
  Load = 'pokemons-load',
  Clear = 'pokemons-clear',
  Delete = 'pokemons-delete',
  Edit = 'pokemons-edit'
}

type PokemonsAction = {
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

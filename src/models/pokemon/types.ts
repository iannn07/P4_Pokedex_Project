interface Pokemons {
  abilities: string[]
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
  Load = 'pokemons-load',
  Clear = 'pokemons-clear',
  Delete = 'pokemons-delete',
  Edit = 'pokemons-edit'
}

type PokemonsAction = {
  payload?: number
  type: PokemonsActionType.Delete
} | {
  payload?: Pokemons
  type: PokemonsActionType.Edit
} | {
  payload?: PokemonsModel
  type: PokemonsActionType.Load
} | {
  type: PokemonsActionType.Clear
};

export { PokemonsActionType };
export type { PokemonsModel, PokemonsAction, Pokemons };

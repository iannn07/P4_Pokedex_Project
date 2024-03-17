interface Pokemons {
  abilities: string[]
  evolutions: string[]
  hitpoints: number
  id: number
  image_url?: string
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
  value?: number
} | {
  type: PokemonsActionType.Edit
  value?: Pokemons
} | {
  type: PokemonsActionType.Load
  value?: PokemonsModel
};

export { PokemonsActionType };
export type { PokemonsModel, PokemonsAction, Pokemons };

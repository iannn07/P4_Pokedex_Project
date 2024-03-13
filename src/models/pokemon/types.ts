interface Pokemons {
  abilities: string[]
  evolutions: string[]
  hitpoints: number
  id: number
  image_url: string
  location: string
  pokemon: string
  type: string
}

// Page Model
interface PokemonsModel {
  pokemon?: Pokemons[]
}

enum PokemonsActionType {
  Load = 'pokemon-load',
  Clear = 'pokemon-clear'
}

type PokemonsAction = {
  type: PokemonsActionType.Clear
} | {
  type: PokemonsActionType.Load
  value?: PokemonsModel
};

export { PokemonsActionType };
export type { PokemonsModel, PokemonsAction, Pokemons };

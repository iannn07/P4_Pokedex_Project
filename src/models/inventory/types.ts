/* eslint-disable multiline-comment-style */
interface inventoryPokemons {
  abilities: string[]
  date?: string
  evolutions: string[]
  hitpoints: number
  id: number
  image_url?: string
  location: string
  pokemon: string
  type: string
}

// Page Model
interface inventoryPokemonsModel {
  inventory?: inventoryPokemons[]
}

enum inventoryPokemonsActionType {
  Add = 'inventory-pokemons-add',
  Remove = 'inventory-pokemons-remove',
  Evolve = 'inventory-pokemons-evolve',
  // Load = 'inventory-pokemons-load',
  Clear = 'inventory-pokemons-clear'
}

type inventoryPokemonsAction =
  | {
    evolve: inventoryPokemons
    pokemon: inventoryPokemons
    type: inventoryPokemonsActionType.Evolve
  }
  | {
    type: inventoryPokemonsActionType.Add
    value: inventoryPokemons
  }
  | {
    type: inventoryPokemonsActionType.Clear
  }
  // | {
  //   type: inventoryPokemonsActionType.Load
  //   value: inventoryPokemonsModel
  // }
  | {
    type: inventoryPokemonsActionType.Remove
    value: inventoryPokemons
  };

export { inventoryPokemonsActionType };
export type { inventoryPokemonsModel, inventoryPokemonsAction, inventoryPokemons };

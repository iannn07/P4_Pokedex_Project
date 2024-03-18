/* eslint-disable multiline-comment-style */
interface InventoryPokemons {
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
interface InventoryPokemonsModel {
  inventory?: InventoryPokemons[]
}

enum InventoryPokemonsActionType {
  AddInventory = 'AddInventory',
  RemoveInventory = 'RemoveInventory',
  EvolveInventory = 'EvolveInventory',
  ClearInventory = 'ClearInventory'
}

type InventoryPokemonsAction =
  | {
    evolve: InventoryPokemons
    pokemon: InventoryPokemons
    type: InventoryPokemonsActionType.EvolveInventory
  }
  | {
    type: InventoryPokemonsActionType.AddInventory
    value: InventoryPokemons
  }
  | {
    type: InventoryPokemonsActionType.ClearInventory
  }
  | {
    type: InventoryPokemonsActionType.RemoveInventory
    value: InventoryPokemons
  };

export { InventoryPokemonsActionType };
export type {
  InventoryPokemonsModel,
  InventoryPokemonsAction,
  InventoryPokemons
};

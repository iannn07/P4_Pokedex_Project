/* eslint-disable multiline-comment-style */
interface InventoryPokemons {
  abilities: string[]
  date?: string
  evolutions: string[]
  hitpoints: number
  id: number
  image_url: string
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
  ClearInventory = 'ClearInventory',
  EditInventory = 'EditInventory'
}

type InventoryPokemonsAction =
  {
    evolve: InventoryPokemons
    pokemon: InventoryPokemons
    type: InventoryPokemonsActionType.EvolveInventory
  } | {
    type: InventoryPokemonsActionType.AddInventory
    value: InventoryPokemons
  } | {
    type: InventoryPokemonsActionType.ClearInventory
  } | {
    type: InventoryPokemonsActionType.EditInventory
    value: InventoryPokemons
  } | {
    type: InventoryPokemonsActionType.RemoveInventory
    value: InventoryPokemons
  };

export { InventoryPokemonsActionType };
export type {
  InventoryPokemonsModel,
  InventoryPokemonsAction,
  InventoryPokemons
};

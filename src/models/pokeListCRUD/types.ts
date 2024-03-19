/* eslint-disable @typescript-eslint/member-ordering */
interface PokeList {
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
interface PokeListModel {
  pokemons?: PokeList[]
}

enum PokeListActionType {
  ADD_POKEMON = 'ADD_POKEMON',
  EDIT_POKEMON = 'EDIT_POKEMON',
  DELETE_POKEMON = 'DELETE_POKEMON',
  LOAD_POKEMON = 'LOAD_POKEMON',
  CLEAR_POKEMON = 'CLEAR_POKEMON'
}

type PokeListAction = {
  type: PokeListActionType.ADD_POKEMON
  payload?: PokeListModel
} | {
  type: PokeListActionType.CLEAR_POKEMON
} | {
  type: PokeListActionType.DELETE_POKEMON
  payload?: number
} | {
  type: PokeListActionType.EDIT_POKEMON
  payload?: PokeList
} | {
  type: PokeListActionType.LOAD_POKEMON
  payload?: PokeListModel
};

export { PokeListActionType };
export type { PokeListModel, PokeListAction, PokeList };

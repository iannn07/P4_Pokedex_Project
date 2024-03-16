/* eslint-disable @typescript-eslint/member-ordering */
interface PokeList {
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
interface PokeListModel {
  id: number
  pokemons?: PokeList[]
}

enum PokeListActionType {
  ADD_POKEMON = 'ADD_POKEMON',
  EDIT_POKEMON = 'EDIT_POKEMON',
  DELETE_POKEMON = 'DELETE_POKEMON',
  SHOW_POKEMON = 'SHOW_POKEMON'
}

type PokeListAction = {
  type: PokeListActionType.ADD_POKEMON
  payload?: PokeListModel
} | {
  type: PokeListActionType.DELETE_POKEMON
  payload?: number
} | {
  type: PokeListActionType.EDIT_POKEMON
  payload?: PokeListModel
};

export { PokeListActionType };
export type { PokeListModel, PokeListAction, PokeList };

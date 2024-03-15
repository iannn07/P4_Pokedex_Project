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
  pokemons?: PokeList[]
}

enum PokeListActionType {
  ADD_POKEMON = 'ADD_POKEMON',
  EDIT_POKEMON = 'EDIT_POKEMON',
  DELETE_POKEMON = 'DELETE_POKEMON',
  CLEAR = 'CLEAR'
}

type PokeListAction = {
  type: PokeListActionType.ADD_POKEMON
  value: PokeListModel
} | {
  type: PokeListActionType.CLEAR
} | {
  type: PokeListActionType.DELETE_POKEMON
} | {
  type: PokeListActionType.EDIT_POKEMON
  value?: PokeListModel
};

export { PokeListActionType };
export type { PokeListModel, PokeListAction, PokeList };

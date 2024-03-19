/* eslint-disable @stylistic/js/linebreak-style */
interface PokemonProps {
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

export default PokemonProps;

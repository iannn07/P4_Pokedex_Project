/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint sort-keys: 0 */
import type { FormEventHandler } from 'react';

import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  Slide
} from '@mui/material';

import {
  Accessible,
  Category,
  ChevronsUP,
  MapPin,
  Pokeball,
  World
} from '@nxweb/icons/tabler';

import CustomTextField from '@components/custom/text-field/text-field';
import { Typography } from '@components/material.js';
import type { Pokemons, PokemonsAction } from '@models/pokemon/types';
import { useCommand } from '@models/store.js';

import type PokemonProps from '../pokemonProps';

interface props {
  /*
   * Readonly pokeAPIState: PokemonsModel | undefined
   */
  readonly pokeAPIDispatch: React.Dispatch<PokemonsAction>
  readonly setShowEditAPICard: React.Dispatch<React.SetStateAction<boolean>>
  readonly showEditAPICard: boolean
  readonly pokemon: PokemonProps
  readonly setPokemon: React.Dispatch<React.SetStateAction<PokemonProps>>
}

const EditPokemonsAPI = ({
  pokeAPIDispatch,
  setShowEditAPICard,
  showEditAPICard,
  pokemon,
  setPokemon
}: props) => {
  const command = useCommand((cmd) => cmd);

  const handleEditToggleCard = () => {
    setShowEditAPICard(!showEditAPICard);
  };

  const handleEditAPIPokemon: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setPokemon({
      image_url: '',
      abilities: [] as string[],
      evolutions: [] as string[],
      hitpoints: 0,
      id: 0,
      location: '',
      pokemon: '',
      type: ''
    });

    const data: Pokemons = {
      ...pokemon
    };

    pokeAPIDispatch(command.pokemons.edit(data));
  };

  return (
    <>
      {/* Edit Card */}
      <Dialog open={showEditAPICard} sx={{ overflow: 'hidden' }} onClose={handleEditToggleCard}>
        <Slide
          direction="up"
          in={showEditAPICard}
          mountOnEnter={true}
          style={{ overflow: 'hidden' }}
          unmountOnExit={true}
        >
          <Card sx={{ mb: 5 }}>
            <DialogTitle
              component="div"
              sx={{
                textAlign: 'center',
                px: (theme) => [
                  `${theme.spacing(5)} !important`,
                  `${theme.spacing(15)} !important`
                ],
                pt: (theme) => [
                  `${theme.spacing(8)} !important`,
                  `${theme.spacing(12.5)} !important`
                ]
              }}
            >
              <Typography sx={{ mb: 2 }} variant="h3">
                Edit Pokemon API
              </Typography>
            </DialogTitle>
            <DialogContent
              sx={{
                px: (theme) => [
                  `${theme.spacing(5)} !important`,
                  `${theme.spacing(15)} !important`
                ],
                pb: (theme) => [
                  `${theme.spacing(8)} !important`,
                  `${theme.spacing(12.5)} !important`
                ]
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  textAlign: 'center',
                  alignItems: 'center',
                  flexDirection: 'column'
                }}
              >
                <Box>
                  <form onSubmit={handleEditAPIPokemon}>
                    <Grid container={true} spacing={5}>
                      <Grid item={true} xs={12}>
                        <CustomTextField
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <World />
                              </InputAdornment>
                            )
                          }}
                          error={!pokemon.image_url}
                          fullWidth={true}
                          helperText={
                            !pokemon.image_url
                              ? 'Pokemon Image URL is required'
                              : ''
                          }
                          label="Pokemon Image URL"
                          required={true}
                          value={pokemon.image_url}
                          onChange={(e) => setPokemon({
                            ...pokemon,
                            image_url: e.target.value
                          })} />
                      </Grid>
                      <Grid item={true} xs={12}>
                        <CustomTextField
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Pokeball />
                              </InputAdornment>
                            )
                          }}
                          error={!pokemon.pokemon}
                          fullWidth={true}
                          helperText={
                            !pokemon.pokemon ? 'Pokemon name is required' : ''
                          }
                          label="Pokemon Name"
                          required={true}
                          value={pokemon.pokemon}
                          onChange={(e) => setPokemon({ ...pokemon, pokemon: e.target.value })} />
                      </Grid>
                      <Grid item={true} xs={12}>
                        <CustomTextField
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Category />
                              </InputAdornment>
                            )
                          }}
                          error={!pokemon.type}
                          fullWidth={true}
                          helperText={!pokemon.type ? 'Type is required' : ''}
                          label="Type"
                          required={true}
                          value={pokemon.type}
                          onChange={(e) => setPokemon({ ...pokemon, type: e.target.value })} />
                      </Grid>
                      <Grid item={true} xs={12}>
                        <CustomTextField
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <MapPin />
                              </InputAdornment>
                            )
                          }}
                          error={!pokemon.location}
                          fullWidth={true}
                          helperText={
                            !pokemon.location ? 'Location is required' : ''
                          }
                          label="Location"
                          required={true}
                          value={pokemon.location}
                          onChange={(e) => setPokemon({ ...pokemon, location: e.target.value })} />
                      </Grid>
                      <Grid item={true} xs={12}>
                        <CustomTextField
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Accessible />
                              </InputAdornment>
                            )
                          }}
                          fullWidth={true}
                          label="Abilities"
                          value={pokemon.abilities.join(',')}
                          onChange={(e) => setPokemon({
                            ...pokemon,
                            abilities: e.target.value.split(',')
                          })} />
                      </Grid>
                      <Grid item={true} xs={12}>
                        <CustomTextField
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <ChevronsUP />
                              </InputAdornment>
                            )
                          }}
                          fullWidth={true}
                          label="Evolution"
                          value={pokemon.evolutions.join(',')}
                          onChange={(e) => setPokemon({
                            ...pokemon,
                            evolutions: e.target.value.split(',')
                          })} />
                      </Grid>
                      <Box
                        sx={{
                          mt: 4,
                          mx: 'auto',
                          width: '100%',
                          maxWidth: 360,
                          display: 'flex',
                          alignItems: 'center',
                          flexDirection: 'column'
                        }}
                      >
                        <Box>
                          <Button
                            disabled={
                              !pokemon.image_url ||
                              !pokemon.pokemon ||
                              !pokemon.type ||
                              !pokemon.location
                            }
                            sx={{ mr: 2 }}
                            type="submit"
                            variant="contained"
                            onClick={handleEditToggleCard}
                          >
                            Edit Pokemon
                          </Button>
                          <Button
                            color="secondary"
                            type="reset"
                            variant="tonal"
                            onClick={handleEditToggleCard}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  </form>
                </Box>
              </Box>
            </DialogContent>
          </Card>
        </Slide>
      </Dialog>
    </>
  );
};

EditPokemonsAPI.displayName = 'EditPokemonsAPI';

export default EditPokemonsAPI;

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
  Slide,
  Stack
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
import type { InventoryPokemonsAction } from '@models/inventory/types';
import type { Pokemons, PokemonsAction } from '@models/pokemon/types';
import { useCommand } from '@models/store.js';
import { trainerCommand } from '@models/trainer/commands';
import type { TrainerAction } from '@models/trainer/types';

import type PokemonProps from '../pokemonProps';

interface props {
  readonly dispatch: React.Dispatch<
  InventoryPokemonsAction | PokemonsAction | TrainerAction
  >
  readonly setShowEditCard: React.Dispatch<React.SetStateAction<boolean>>
  readonly showEditCard: boolean
  readonly pokemon: PokemonProps
  readonly setPokemon: React.Dispatch<React.SetStateAction<PokemonProps>>
}

const EditPokemonsList = ({
  dispatch,
  setShowEditCard,
  showEditCard,
  pokemon,
  setPokemon
}: props) => {
  const command = useCommand((cmd) => cmd);

  const handleEditToggleCard = () => {
    setShowEditCard(!showEditCard);
  };

  const handleEditPokemon: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const data: Pokemons = {
      ...pokemon
    };

    const updateTrainerLog = {
      activity: 'Update',
      dateTime: new Date().toLocaleString(),
      pokemon
    };

    dispatch(trainerCommand(updateTrainerLog));
    dispatch(command.inventory.editInventory(data));
    dispatch(command.pokemons.edit(data));
  };

  return (
    <>
      {/* Edit Card */}
      <Dialog
        open={showEditCard}
        onClose={handleEditToggleCard}
      >
        <Slide
          direction="up"
          in={showEditCard}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <Card sx={{ height: '100%', overflow: 'auto' }}>
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
                  <form onSubmit={handleEditPokemon}>
                    <Grid container={true} spacing={5}>
                      <Grid item={true} xs={12}>
                        <Stack
                          gap={5}
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
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
                          {pokemon.image_url
                            ? (
                            <img
                              alt={pokemon.pokemon}
                              height={150}
                              src={pokemon.image_url}
                              style={{ borderRadius: '5px' }}
                              width={150} />
                            )
                            : null}
                        </Stack>
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

EditPokemonsList.displayName = 'EditPokemonsList';

export default EditPokemonsList;

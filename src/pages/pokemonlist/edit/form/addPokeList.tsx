/* eslint-disable react-hooks/exhaustive-deps */
/* eslint sort-keys: 0 */
import type { FormEventHandler } from 'react';
import { useState } from 'react';

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
import type { PokemonsModel } from '@models/pokemon/types';
import { useCommand, useStore } from '@models/store.js';

import type PokemonProps from '../pokemonProps';

interface props {
  readonly setShowCard: React.Dispatch<React.SetStateAction<boolean>>
  readonly showCard: boolean
}

const AddPokeList = ({
  setShowCard,
  showCard
}: props) => {
  const [state, dispatch] = useStore((store) => store);
  const command = useCommand((cmd) => cmd);

  const [pokemon, setPokemon] = useState<PokemonProps>({
    image_url: '',
    inInventory: false,
    isObtained: false,
    abilities: [] as string[],
    evolutions: [] as string[],
    hitpoints: Math.round(Math.random() * 10000),
    id: 51,
    location: '',
    pokemon: '',
    type: ''
  });

  const dispatchNewPokemon = (data: PokemonsModel) => {
    dispatch(command.pokemons.add(data));
  };

  const handleNewPokemon: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const pokemonsID = state?.pokemons?.pokemons?.length;

    setPokemon({
      ...pokemon,
      image_url: '',
      pokemon: '',
      type: '',
      location: '',
      hitpoints: Math.round(Math.random() * 10000),
      id: pokemonsID ? pokemonsID + 2 : 51
    });

    const data: PokemonsModel = {
      pokemons: [pokemon]
    };

    dispatchNewPokemon(data);
  };

  const handleToggleCard = () => {
    setShowCard(!showCard);
  };

  return (
    <>
      {/* ADD */}
      <Dialog
        open={showCard}
        onClose={handleToggleCard}
      >
        <Slide
          direction="up"
          in={showCard}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <Card sx={{ height: '100%' }}>
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
                Add New Pokemon
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
                  <form onSubmit={handleNewPokemon}>
                    <Grid container={true} spacing={5}>
                      <Grid item={true} xs={12}>
                        <Stack gap={5} sx={{ display: 'flex', alignItems: 'center' }}>
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
                            placeholder="www.pikachu.com"
                            required={true}
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
                            !pokemon.pokemon ? 'Pokemon Name is required' : ''
                          }
                          label="Pokemon Name"
                          placeholder="Pikachu"
                          required={true}
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
                          placeholder="Electric"
                          required={true}
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
                          placeholder="Madiun"
                          required={true}
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
                          placeholder="Abilities"
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
                          placeholder="Evolution"
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
                            onClick={handleToggleCard}
                          >
                            Add Pokemon
                          </Button>
                          <Button
                            color="secondary"
                            type="reset"
                            variant="tonal"
                            onClick={handleToggleCard}
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

AddPokeList.displayName = 'AddPokeList';

export default AddPokeList;

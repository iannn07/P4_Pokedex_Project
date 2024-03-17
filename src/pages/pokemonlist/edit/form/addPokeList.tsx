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
  InputAdornment
} from '@mui/material';

import {
  Accessible,
  Category,
  ChevronsUP,
  MapPin,
  Pokeball
} from '@nxweb/icons/tabler';

import CustomTextField from '@components/custom/text-field/text-field';
import { Typography } from '@components/material.js';
import type { PokeListAction, PokeListModel } from '@models/pokeListCRUD/types';
import { useCommand } from '@models/store.js';

import type PokemonProps from '../pokemonProps';

interface props {
  readonly pokeLISTDispatch: React.Dispatch<PokeListAction>
  readonly pokeLISTState: PokeListModel | undefined
  readonly setShowCard: React.Dispatch<React.SetStateAction<boolean>>
  readonly showCard: boolean
}

const AddPokeList = ({
  pokeLISTDispatch,
  pokeLISTState,
  setShowCard,
  showCard
}: props) => {
  const command = useCommand((cmd) => cmd);

  const [pokemon, setPokemon] = useState<PokemonProps>({
    abilities: [] as string[],
    evolutions: [] as string[],
    hitpoints: 0,
    id: 0,
    location: '',
    pokemon: '',
    type: ''
  });

  const handleNewPokemon: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const pokeListID = pokeLISTState?.pokemons?.length;

    setPokemon({
      ...pokemon,
      id: pokeListID ? pokeListID + 1 : 1
    });

    const data: PokeListModel = {
      pokemons: [pokemon]
    };

    pokeLISTDispatch(command.pokeList.addPokemon(data));
  };

  const handleToggleCard = () => {
    setShowCard(!showCard);
  };

  return (
    <>
      {/* ADD */}
      <Dialog open={showCard} onClose={handleToggleCard}>
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
                      <CustomTextField
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Pokeball />
                            </InputAdornment>
                          )
                        }}
                        fullWidth={true}
                        label="Pokemon Name"
                        placeholder="Pikachu"
                        onChange={(e) => setPokemon({ ...pokemon, pokemon: e.target.value })}
                        required={true}
                        error={!pokemon.pokemon}
                        helperText={!pokemon.pokemon ? 'Pokemon Name is required' : ''} />
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
                        fullWidth={true}
                        label="Type"
                        placeholder="Electric"
                        onChange={(e) => setPokemon({ ...pokemon, type: e.target.value })}
                        required={true}
                        error={!pokemon.type}
                        helperText={!pokemon.type ? 'Type is required' : ''} />
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
                        fullWidth={true}
                        label="Location"
                        placeholder="Madiun"
                        onChange={(e) => setPokemon({ ...pokemon, location: e.target.value })}
                        required={true}
                        error={!pokemon.location}
                        helperText={!pokemon.location ? 'Location is required' : ''} />
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
                          type="submit"
                          variant="contained"
                          onClick={handleToggleCard}
                        >
                          Add Pokemon
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </form>
              </Box>
            </Box>
          </DialogContent>
        </Card>
      </Dialog>
    </>
  );
};

AddPokeList.displayName = 'AddPokeList';

export default AddPokeList;

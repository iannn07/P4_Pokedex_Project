/* eslint-disable react-hooks/exhaustive-deps */
/* eslint sort-keys: 0 */
import type { FormEventHandler } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  ArrowBackUP,
  Category,
  ChevronsUP,

  MapPin,
  Plus,
  Pokeball

} from '@nxweb/icons/tabler';
import type { PageComponent } from '@nxweb/react';

import CustomTextField from '@components/custom/text-field/text-field';
import { Typography } from '@components/material.js';
import type { PokeListModel } from '@models/pokeListCRUD/types';
import { useCommand, useStore } from '@models/store.js';

import PokeListTable from './PokeListTable/pokeListTable';

const EditPokemonList: PageComponent = () => {
  const [pokeLISTState, pokeLISTDispatch] = useStore((store) => store.pokeList);
  const [showCard, setShowCard] = useState<boolean>(false);
  const [showEditCard, setShowEditCard] = useState<boolean>(false);
  const command = useCommand((cmd) => cmd);

  const [pokemon, setPokemon] = useState({
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

    const data: PokeListModel = {
      pokemons: [pokemon]
    };

    setPokemon({
      abilities: [] as string[],
      evolutions: [] as string[],
      hitpoints: Math.round(Math.random() * 1000),
      id: Math.round(Math.random() * 1000),
      location: '',
      pokemon: '',
      type: ''
    });

    pokeLISTDispatch(command.pokeList.addPokemon(data));
  };

  /*
   * UNDER MAINTENANCE
   * const handleEditPokemon: FormEventHandler<HTMLFormElement> = (e) => {
   *   e.preventDefault();
   */

  /*
   *   const data: PokeListModel = {
   *     id: Math.round(Math.random() * 1000),
   *     pokemons: [pokemon]
   *   };
   */

  /*
   *   setPokemon({
   *     abilities: [] as string[],
   *     evolutions: [] as string[],
   *     hitpoints: Math.round(Math.random() * 1000),
   *     id: Math.round(Math.random() * 1000),
   *     location: '',
   *     pokemon: '',
   *     type: ''
   *   });
   */

  /*
   *   // pokeLISTDispatch(command.pokeList.editPokemon(data));
   * };
   */

  const handleToggleCard = () => {
    setShowCard(!showCard);
  };

  const handleEditToggleCard = () => {
    setShowEditCard(!showEditCard);
  };

  const navigate = useNavigate();

  return (
    <>
      <h1>Edit Pokemon List</h1>
      <Box
        sx={{
          mb: 8,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography
          sx={{
            color: 'error.main',
            p: 2,
            borderRadius: 1,
            border: '2px solid',
            borderColor: 'error.main'
          }}
          variant="subtitle1"
        >
          NOTE: This is a temporary list
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Button
            sx={{ height: '50px' }}
            variant="outlined"
            onClick={() => navigate(-1)}
          >
            Go Back
            <ArrowBackUP height="32px" width="32px" />
          </Button>
          <Button
            sx={{ height: '50px' }}
            variant="contained"
            onClick={handleToggleCard}
          >
            <Plus height="32px" width="32px" />
            Add New Pokemon
          </Button>
        </Box>
      </Box>

      {/* CRUD */}
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
                        fullWidth={true}
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
                        fullWidth={true}
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
                        required={true}
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
                        required={true}
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
                      <Box
                        className="demo-space-x"
                        sx={{ '& > :last-child': { mr: '0 !important' } }}
                      >
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
      <Dialog open={showEditCard} onClose={handleEditToggleCard}>
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
              Edit Pokemon
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
                <form onSubmit={handleEditToggleCard}>
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
                        fullWidth={true}
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
                        fullWidth={true}
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
                        required={true}
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
                        required={true}
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
                      <Box
                        className="demo-space-x"
                        sx={{ '& > :last-child': { mr: '0 !important' } }}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          onClick={handleEditToggleCard}
                        >
                          Edit Pokemon
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

      {/* PokeListTable */}
      <PokeListTable
        pokeLISTDispatch={pokeLISTDispatch}
        pokeLISTState={pokeLISTState}
        setShowEditCard={setShowEditCard}
        showEditCard={showEditCard} />
    </>
  );
};

EditPokemonList.displayName = 'EditPokemonList';

export default EditPokemonList;

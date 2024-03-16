/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint sort-keys: 0 */
import type { FormEventHandler } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Card,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';

import {
  Accessible,
  ArrowBackUP,
  Category,
  ChevronsUP,
  Edit,
  MapPin,
  Plus,
  Pokeball,
  Trash
} from '@nxweb/icons/tabler';
import type { PageComponent } from '@nxweb/react';

import CustomTextField from '@components/custom/text-field/text-field';
import getColorForType from '@components/custom/type-color/type-color';
import { Typography } from '@components/material.js';
import type { PokeListModel } from '@models/pokeListCRUD/types';
import { useCommand, useStore } from '@models/store.js';

import { handleEditPokemon } from './editHandler';

const EditPokemonList: PageComponent = () => {
  const [pokeAPIState, pokeAPIDispatch] = useStore((store) => store.pokemons);
  const [pokeLISTState, pokeLISTDispatch] = useStore((store) => store.pokeList);
  const [showCard, setShowCard] = useState<boolean>(false);
  const command = useCommand((cmd) => cmd);

  const [pokemon, setPokemon] = useState({
    abilities: [] as string[],
    evolutions: [] as string[],
    hitpoints: Math.round(Math.random() * 1000),
    id: Math.round(Math.random() * 1000),
    location: '',
    pokemon: '',
    type: ''
  });

  const handleNewPokemon: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const data: PokeListModel = {
      id: Math.round(Math.random() * 1000),
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

  const handleDeletePokemon = (data: number) => {
    pokeLISTDispatch(command.pokeList.deletePokemon(data));
  };

  const handleToggleCard = () => {
    setShowCard(!showCard);
  };

  useEffect(() => {
    pokeAPIDispatch(command.pokemons.load()).catch((err: unknown) => {
      console.error(err);
    });

    return () => {
      pokeAPIDispatch(command.pokemons.clear());
    };
  }, []);

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
                        <Button type="submit" variant="contained" onClick={handleToggleCard}>
                          Add Pokemon
                        </Button>
                        <Button color="secondary" type="reset" variant="tonal" onClick={handleToggleCard}>
                          Discard Pokemon
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
      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pokemon Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Abilities</TableCell>
              <TableCell>Evolution</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pokeAPIState?.pokemons?.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  '&:last-child td, &:last-child th': {
                    border: 0
                  }
                }}
              >
                <TableCell component="th" scope="row">
                  {row.pokemon}
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      borderRadius: 8,
                      display: 'flex',
                      gap: 2,
                      height: 'auto'
                    }}
                  >
                    <Stack gap={2}>
                      {(row.type.split('/') as string[]).map((type) => (
                        <Box
                          key={type}
                          px={4}
                          py={1.5}
                          sx={{
                            backgroundColor: getColorForType(type),
                            borderRadius: 8,
                            display: 'flex',
                            gap: 8
                          }}
                        >
                          <Typography
                            sx={{
                              color: 'white',
                              fontSize: 10,
                              letterSpacing: 1.5
                            }}
                          >
                            {type.trim()}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </TableCell>
                <TableCell sx={{ width: 200, textWrap: 'wrap' }}>
                  {row.location}
                </TableCell>
                <TableCell>
                  <ul>
                    {row.abilities.map((ability, index) => <li key={index}>{ability}</li>)}
                  </ul>
                </TableCell>
                <TableCell>
                  <ul>
                    {row.evolutions.map((evo, index) => <li key={index}>{evo}</li>)}
                  </ul>
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', gap: 5 }}>
                    <Button color="warning" variant="contained">
                      <Edit
                        size={20}
                        onClick={() => handleEditPokemon(row.id)} />
                    </Button>
                    <Button color="error" variant="contained">
                      <Trash
                        size={20}
                        onClick={() => handleDeletePokemon(row.id)} />
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {pokeLISTState?.pokemons?.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  '&:last-child td, &:last-child th': {
                    border: 0
                  }
                }}
              >
                <TableCell component="th" scope="row">
                  {row.pokemon}
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      borderRadius: 8,
                      display: 'flex',
                      gap: 2,
                      height: 'auto'
                    }}
                  >
                    <Stack gap={2}>
                      {(row.type.split('/') as string[]).map((type) => (
                        <Box
                          key={type}
                          px={4}
                          py={1.5}
                          sx={{
                            backgroundColor: getColorForType(type),
                            borderRadius: 8,
                            display: 'flex',
                            gap: 8
                          }}
                        >
                          <Typography
                            sx={{
                              color: 'white',
                              fontSize: 10,
                              letterSpacing: 1.5
                            }}
                          >
                            {type.trim()}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </TableCell>
                <TableCell sx={{ width: 200, textWrap: 'wrap' }}>
                  {row.location}
                </TableCell>
                <TableCell>
                  <ul>
                    {row.abilities.map((ability, index) => <li key={index}>{ability}</li>)}
                  </ul>
                </TableCell>
                <TableCell>
                  <ul>
                    {row.evolutions.map((evo, index) => <li key={index}>{evo}</li>)}
                  </ul>
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', gap: 5 }}>
                    <Button color="warning" variant="contained">
                      <Edit
                        size={20}
                        onClick={() => handleEditPokemon(row.id)} />
                    </Button>
                    <Button color="error" variant="contained">
                      <Trash
                        size={20}
                        onClick={() => handleDeletePokemon(row.id)} />
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};

EditPokemonList.displayName = 'EditPokemonList';

export default EditPokemonList;

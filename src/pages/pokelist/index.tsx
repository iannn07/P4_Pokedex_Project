/* eslint-disable sort-keys */
/* eslint-disable logical-assignment-operators */
/* eslint-disable react/jsx-key */

import type { FormEventHandler } from 'react';
import { useState } from 'react';

import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';

import {
  Accessible,
  Bug,
  Category,
  ChevronsUP,
  Edit,
  MapPin,
  Pokeball,
  Trash
} from '@nxweb/icons/tabler';
import type { PageComponent } from '@nxweb/react';

import { Typography } from '@components/material.js';
import type { PokeListModel } from '@models/pokeListCRUD/types';
import { useCommand, useStore } from '@models/store';

import CustomTextField from '../../components/custom/text-field/text-field';

const PokeListCRUD: PageComponent = () => {
  const [state, dispatch] = useStore((store) => store.pokeList);
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

    dispatch(command.pokeList.addPokemon(data));
  };

  const handleEditPokemon = (data: number) => {
    console.log(data);
  };

  const handleDeletePokemon = (data: number) => {
    console.log(data);
  };

  return (
    <>
      <Bug style={{ fontSize: '40px' }} />
      <Box>
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
                      <Button type="submit" variant="contained">
                        Add Pokemon
                      </Button>
                      <Button color="secondary" type="reset" variant="tonal">
                        Discard Pokemon
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </form>
            </Box>
          </Box>
        </DialogContent>
      </Box>
      <Box>
        <Table>
          <TableHead>
            <TableRow sx={{ textAlign: 'center' }}>
              <TableCell>Pokemon</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Abilities</TableCell>
              <TableCell>Evolution</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state?.pokemons?.map((row) => (
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
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.abilities}</TableCell>
                <TableCell>{row.evolutions}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Button color="warning" sx={{ mr: 5 }} variant="contained">
                    <Edit size={20} onClick={() => handleDeletePokemon(row.id)} />
                  </Button>
                  <Button color="error" variant="contained">
                    <Trash size={20} onClick={() => handleEditPokemon(row.id)} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};

PokeListCRUD.displayName = 'PokeListCRUD';

export default PokeListCRUD;

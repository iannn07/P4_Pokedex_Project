/* eslint-disable react-hooks/exhaustive-deps */
/* eslint sort-keys: 0 */
import type { FormEventHandler } from 'react';
import { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Card,
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
  Category,
  ChevronsUP,
  Edit,
  MapPin,
  Pokeball,
  Trash
} from '@nxweb/icons/tabler';

import CustomTextField from '@components/custom/text-field/text-field';
import getColorForType from '@components/custom/type-color/type-color';
import { Typography } from '@components/material.js';
import type {
  PokeList,
  PokeListAction,
  PokeListModel
} from '@models/pokeListCRUD/types';
import { useCommand, useStore } from '@models/store.js';

interface props {
  /*
   * Readonly pokeAPIDispatch: React.Dispatch<PokemonsAction>
   * readonly pokeAPIState: PokemonsModel | undefined
   */
  readonly pokeLISTDispatch: React.Dispatch<PokeListAction>
  readonly pokeLISTState: PokeListModel | undefined
  readonly setShowEditCard: React.Dispatch<React.SetStateAction<boolean>>
  readonly showEditCard: boolean
}

const PokeListTable = ({
  pokeLISTDispatch,
  pokeLISTState,
  setShowEditCard,
  showEditCard
}: props) => {
  const [pokeAPIState, pokeAPIDispatch] = useStore((store) => store.pokemons);
  const [pokemon, setPokemon] = useState({});
  const command = useCommand((cmd) => cmd);

  const handleEditPokemon: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setPokemon({
      abilities: [] as string[],
      evolutions: [] as string[],
      hitpoints: 0,
      id: 0,
      location: '',
      pokemon: '',
      type: ''
    });
  };
  const handleDeleteAPIPokemon = (data: number) => {
    pokeAPIDispatch(command.pokemons.delete(data));
  };

  const handleDeletePokemon = (data: number) => {
    pokeLISTDispatch(command.pokeList.deletePokemon(data));
  };

  const handleEditToggleCard = () => {
    setShowEditCard(!showEditCard);
  };

  // Render Table
  useEffect(() => {
    pokeAPIDispatch(command.pokemons.load()).catch((err: unknown) => {
      console.error(err);
    });

    return () => {
      pokeAPIDispatch(command.pokemons.clear());
    };
  }, []);

  return (
    <>
      {/* Edit Card */}
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

      {/* Main Card Table */}
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
              <TableRow key={row.id}>
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
                      <Edit size={20} onClick={handleEditToggleCard} />
                    </Button>
                    <Button color="error" variant="contained">
                      <Trash
                        size={20}
                        onClick={() => handleDeleteAPIPokemon(row.id)} />
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {pokeLISTState?.pokemons?.map((row) => (
              <TableRow key={row.id}>
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
                      <Edit size={20} onClick={handleEditToggleCard} />
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

PokeListTable.displayName = 'PokeListTable';

export default PokeListTable;

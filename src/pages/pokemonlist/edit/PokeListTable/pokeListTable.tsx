/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint sort-keys: 0 */
import { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';

import { Edit, Trash } from '@nxweb/icons/tabler';

import getColorForType from '@components/custom/type-color/type-color';
import { Typography } from '@components/material.js';
import type {
  PokeList,
  PokeListAction,
  PokeListModel
} from '@models/pokeListCRUD/types';
import type { Pokemons } from '@models/pokemon/types';
import { useCommand, useStore } from '@models/store.js';

import EditPokeList from '../form/editPokeList';
import EditPokemonsAPI from '../form/editPokemonsAPI';

import type PokemonProps from '../pokemonProps';

interface props {
  /*
   * Readonly pokeAPIDispatch: React.Dispatch<PokemonsAction>
   * readonly pokeAPIState: PokemonsModel | undefined
   */
  readonly pokeLISTDispatch: React.Dispatch<PokeListAction>
  readonly pokeLISTState: PokeListModel | undefined
}

const PokeListTable = ({ pokeLISTDispatch, pokeLISTState }: props) => {
  const [pokeAPIState, pokeAPIDispatch] = useStore((store) => store.pokemons);
  const [showEditAPICard, setShowEditAPICard] = useState<boolean>(false);
  const [showEditCard, setShowEditCard] = useState<boolean>(false);
  const [pokemon, setPokemon] = useState<PokemonProps>({
    image_url: '',
    abilities: [] as string[],
    evolutions: [] as string[],
    hitpoints: 0,
    id: 0,
    location: '',
    pokemon: '',
    type: ''
  });
  const command = useCommand((cmd) => cmd);

  const handleEditAPIToggleCard = () => {
    setShowEditAPICard(!showEditAPICard);
  };

  const handleEditToggleCard = () => {
    setShowEditCard(!showEditCard);
  };

  const handleEditIDAPI = (data: Pokemons) => {
    handleEditAPIToggleCard();

    const updatedData: Pokemons = {
      ...data,
      id: data.id
    };

    setPokemon(updatedData);

    pokeAPIDispatch(command.pokemons.edit(updatedData));
  };

  const handleEditID = (data: PokeList) => {
    handleEditToggleCard();

    const updatedData: PokeList = {
      ...data,
      id: data.id
    };

    setPokemon(updatedData);

    pokeLISTDispatch(command.pokeList.editPokemon(updatedData));
  };

  const handleDeleteAPIPokemon = (data: number) => {
    pokeAPIDispatch(command.pokemons.delete(data));
  };

  const handleDeletePokemon = (data: number) => {
    pokeLISTDispatch(command.pokeList.deletePokemon(data));
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
      {/* Main Card Table */}
      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pokemon</TableCell>
              <TableCell>Name</TableCell>
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
                  <img
                    alt="Pokemon"
                    src={row.image_url}
                    style={{ maxWidth: '151.406px', maxHeight: '151.406px' }}
                    width="100%" />
                </TableCell>
                <TableCell>{row.pokemon}</TableCell>
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
                      <Edit size={20} onClick={() => handleEditIDAPI(row)} />
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
                  <img
                    alt="Pokemon"
                    src={row.image_url}
                    style={{ maxWidth: '151.406px', maxHeight: '151.406px' }}
                    width="100%" />
                </TableCell>
                <TableCell>{row.pokemon}</TableCell>
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
                      <Edit size={20} onClick={() => handleEditID(row)} />
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

      {/* Edit Card (API State) */}
      <EditPokemonsAPI
        pokeAPIDispatch={pokeAPIDispatch}
        pokemon={pokemon}
        setPokemon={setPokemon}
        setShowEditAPICard={setShowEditAPICard}
        showEditAPICard={showEditAPICard} />

      {/* Edit Card (New State) */}
      <EditPokeList
        pokeLISTDispatch={pokeLISTDispatch}
        pokemon={pokemon}
        setPokemon={setPokemon}
        setShowEditCard={setShowEditCard}
        showEditCard={showEditCard} />
    </>
  );
};

PokeListTable.displayName = 'PokeListTable';

export default PokeListTable;

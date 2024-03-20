/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint sort-keys: 0 */
import { useState } from 'react';

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
import type { InventoryPokemons, InventoryPokemonsAction } from '@models/inventory/types';
import type { Pokemons, PokemonsAction, PokemonsModel } from '@models/pokemon/types';
import { useCommand } from '@models/store.js';
import { trainerCommand } from '@models/trainer/commands';
import type { TrainerAction } from '@models/trainer/types';

import EditPokeList from '../form/editPokeList';

import type PokemonProps from '../pokemonProps';

interface props {
  readonly dispatch: React.Dispatch<InventoryPokemonsAction | PokemonsAction | TrainerAction>
  readonly state: PokemonsModel | undefined
}

const PokeListTable = ({ state, dispatch }: props) => {
  const [showEditCard, setShowEditCard] = useState<boolean>(false);
  const [pokemon, setPokemon] = useState<PokemonProps>({
    image_url: '',
    inInventory: false,
    isObtained: false,
    abilities: [] as string[],
    evolutions: [] as string[],
    hitpoints: 0,
    id: 0,
    location: '',
    pokemon: '',
    type: ''
  });
  const command = useCommand((cmd) => cmd);

  const handleEditToggleCard = () => {
    setShowEditCard(!showEditCard);
  };

  const handleEditID = (data: Pokemons) => {
    handleEditToggleCard();

    const updatedData: Pokemons = {
      ...data,
      id: data.id
    };

    setPokemon(updatedData);
    dispatch(command.inventory.editInventory(updatedData));
    dispatch(command.pokemons.edit(updatedData));
  };

  const handleDeletePokemon = (data: number, pokemon: InventoryPokemons) => {
    const updateTrainerLog = {
      activity: 'Delete',
      dateTime: new Date().toLocaleString(),
      pokemon
    };

    dispatch(trainerCommand(updateTrainerLog));
    dispatch(command.pokemons.delete(data));
    dispatch(command.inventory.removeInventory(pokemon));
  };

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
            {state?.pokemons?.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.isObtained
                    ? (
                    <img
                      alt="Pokemon"
                      src={row.image_url}
                      style={{ maxWidth: '151.406px', maxHeight: '151.406px' }}
                      width="100%" />
                    )
                    : (
                    <img
                      alt="Pokemon"
                      src={row.image_url}
                      style={{
                        maxWidth: '151.406px',
                        maxHeight: '151.406px',
                        filter: 'grayscale(100%)'
                      }}
                      width="100%" />
                    )}
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
                <TableCell sx={{ width: 200, textWrap: 'wrap' }}>
                  <ul>
                    {row.abilities.map((ability, index) => <li key={index}>{ability}</li>)}
                  </ul>
                </TableCell>
                <TableCell sx={{ width: 200, textWrap: 'wrap' }}>
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
                        onClick={() => handleDeletePokemon(row.id, row)} />
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Edit Card ( State) */}
      <EditPokeList
        dispatch={dispatch}
        pokemon={pokemon}
        setPokemon={setPokemon}
        setShowEditCard={setShowEditCard}
        showEditCard={showEditCard} />
    </>
  );
};

PokeListTable.displayName = 'PokeListTable';

export default PokeListTable;

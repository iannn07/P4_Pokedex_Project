/* eslint-disable react-hooks/exhaustive-deps */
/* eslint sort-keys: 0 */
import { useEffect } from 'react';

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
import type { PokeListAction, PokeListModel } from '@models/pokeListCRUD/types';
import { useCommand, useStore } from '@models/store.js';

interface props {
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
  const command = useCommand((cmd) => cmd);

  const handleDeleteAPIPokemon = (data: number) => {
    pokeAPIDispatch(command.pokemons.delete(data));
  };

  const handleDeletePokemon = (data: number) => {
    pokeLISTDispatch(command.pokeList.deletePokemon(data));
  };

  const handleEditToggleCard = () => {
    setShowEditCard(!showEditCard);
  };

  useEffect(() => {
    pokeAPIDispatch(command.pokemons.load()).catch((err: unknown) => {
      console.error(err);
    });

    return () => {
      pokeAPIDispatch(command.pokemons.clear());
    };
  }, []);

  return (
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
  );
};

PokeListTable.displayName = 'PokeListTable';

export default PokeListTable;

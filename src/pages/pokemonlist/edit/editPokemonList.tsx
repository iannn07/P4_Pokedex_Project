/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint sort-keys: 0 */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

import { ArrowBackUP, Edit, Plus, Trash } from '@nxweb/icons/tabler';
import type { PageComponent } from '@nxweb/react';

import { Typography } from '@components/material.js';
import { useCommand, useStore } from '@models/store.js';

import { handleDeletePokemon, handleEditPokemon } from './editHandler';

const EditPokemonList: PageComponent = () => {
  const [state, dispatch] = useStore((store) => store.pokemons);
  const command = useCommand((cmd) => cmd);

  const getColorForType = (type: string) => {
    // Generate a consistent color based on the type
    const hash = type
      .split('')
      .reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const hue = hash % 400;

    return `hsl(${hue}, 70%, 30%)`; // Adjust saturation and lightness as needed
  };

  useEffect(() => {
    dispatch(command.pokemons.load()).catch((err: unknown) => {
      console.error(err);
    });

    return () => {
      dispatch(command.pokemons.clear());
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
          <Button sx={{ height: '50px' }} variant="outlined" onClick={() => navigate(-1)}>
            Go Back
            <ArrowBackUP height="32px" width="32px" />
          </Button>
          <Button sx={{ height: '50px' }} variant="contained">
            <Plus height="32px" width="32px" />
            Add New Pokemon
          </Button>
        </Box>
      </Box>
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
                  <Button color="warning" sx={{ mr: 5 }} variant="contained">
                    <Edit
                      size={20}
                      onClick={() => handleEditPokemon(row.id)} />
                  </Button>
                  <Button color="error" variant="contained">
                    <Trash
                      size={20}
                      onClick={() => handleDeletePokemon(row.id)} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      {/* <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={openAddDialog}
        onClose={handleAddDialog}
      >
        <AddPokemonDialog
          handleAddDialog={handleAddDialog}
          onAddSubmit={onAddSubmit} />
      </Dialog> */}
    </>
  );
};

EditPokemonList.displayName = 'EditPokemonList';

export default EditPokemonList;

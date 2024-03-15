/* eslint-disable react-hooks/exhaustive-deps */
/* eslint sort-keys: 0 */
import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';

import { Box, Button, Card, Dialog, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import type { PageComponent } from '@nxweb/react';

import CustomToolbar from '@components/custom/table/data-grid/custom-toolbar';
import { Typography } from '@components/material.js';
import { useCommand, useStore } from '@models/store.js';

import AddPokemonDialog from './addDialog';
import DeletePokemonDialog from './deleteDialog';

import type { GridColDef, GridRowsProp } from '@mui/x-data-grid';

const PokemonList: PageComponent = () => {
  const [state, dispatch] = useStore((store) => store.pokemons);
  const command = useCommand((cmd) => cmd);

  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const handleAddDialog = () => {
    setOpenAddDialog(!openAddDialog);
  };

  const handleDeleteDialog = () => {
    setOpenDeleteDialog(!openDeleteDialog);
  };

  const onAddSubmit = (e: FormEvent<HTMLFormElement>) => {
    setOpenAddDialog(false);
    e.preventDefault();
  };

  const onDeleteSubmit = (e: FormEvent<HTMLFormElement>) => {
    setOpenDeleteDialog(false);
    e.preventDefault();
  };

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

  const rows: GridRowsProp = [
    ...state?.pokemons?.map((row, index) => ({
      id: index + 1, // Use the array index as the ID
      Pokemon: row.image_url,
      Name: row.pokemon,
      Type: row.type,
      Location: row.location,
      Abilities: row.abilities,
      Evolution: row.evolutions
    })) || []
  ];

  const columns: GridColDef[] = [
    {
      field: 'Pokemon',
      headerName: 'Pokemon',
      width: 200,
      renderCell: (params) => <img alt="Pokemon" src={params.value} style={{ width: '100%' }} />,
      sortable: false,
      filterable: false
    },
    { field: 'Name', headerName: 'Name', width: 150 },
    {
      field: 'Type',
      headerName: 'Type',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ borderRadius: 8, display: 'flex', gap: 2, height: 'auto' }}>
          <Stack gap={2}>
            {(params.value.split('/') as string[]).map((type) => (
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
                  sx={{ color: 'white', fontSize: 10, letterSpacing: 1.5 }}
                >
                  {type.trim()}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      )
    },
    { field: 'Location', headerName: 'Location', width: 400 },
    {
      field: 'Abilities',
      headerName: 'Abilities',
      width: 200,
      renderCell: (params) => (
        <ul>
          {(params.value as string[]).map((ability, index) => <li key={index}>{ability}</li>)}
        </ul>
      ),
      sortable: false,
      filterable: false
    },
    {
      field: 'Evolution',
      headerName: 'Evolution',
      width: 200,
      renderCell: (params) => (
        <ul>
          {(params.value as string[]).map((ability, index) => <li key={index}>{ability}</li>)}
        </ul>
      ),
      sortable: false,
      filterable: false
    }
  ];

  return (
    <>
      <h1>Pokemon List</h1>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ width: '50%' }}>
          <h3>Pokemon Add, Edit, Delete</h3>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Button sx={{ m: 2 }} variant="contained" onClick={handleAddDialog}>
            Add New Pokemon
          </Button>
          <Button
            color="error"
            sx={{ m: 2 }}
            variant="contained"
            onClick={handleDeleteDialog}
          >
            Delete All Pokemon
          </Button>
        </Box>
      </Box>
      <Card>
        <DataGrid
          autoHeight={true}
          columns={columns}
          disableColumnSelector={true}
          disableDensitySelector={true}
          getRowHeight={() => 'auto'}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 }
            }
          }}
          pageSizeOptions={[5, 10, 25]}
          rows={rows}
          slotProps={{
            baseButton: {
              size: 'medium',
              variant: 'outlined'
            }
          }}
          slots={{ toolbar: CustomToolbar }} />
      </Card>
      {openAddDialog
        ? (
        <Dialog
          fullWidth={true}
          maxWidth="sm"
          open={openAddDialog}
          onClose={handleAddDialog}
        >
          <AddPokemonDialog
            handleAddDialog={handleAddDialog}
            onAddSubmit={onAddSubmit} />
        </Dialog>
        )
        : (
        <Dialog
          fullWidth={true}
          maxWidth="sm"
          open={openDeleteDialog}
          onClose={handleDeleteDialog}
        >
          <DeletePokemonDialog
            handleDeleteDialog={handleDeleteDialog}
            onDeleteSubmit={onDeleteSubmit} />
        </Dialog>
        )}
    </>
  );
};

PokemonList.displayName = 'PokemonList';

export default PokemonList;

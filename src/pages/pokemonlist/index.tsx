/* eslint-disable react-hooks/exhaustive-deps */
/* eslint sort-keys: 0 */
import { Link } from 'react-router-dom';

import { Box, Button, Card, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { Edit } from '@nxweb/icons/tabler';
import type { PageComponent } from '@nxweb/react';

import CustomToolbar from '@components/custom/table/data-grid/custom-toolbar';
import getColorForType from '@components/custom/type-color/type-color';
import { Typography } from '@components/material.js';
import { store } from '@models/store.js';

import type { GridColDef, GridRowsProp } from '@mui/x-data-grid';

const PokemonList: PageComponent = () => {
  const state = store.getState();

  const rowsAPI: GridRowsProp = [
    ...state?.pokemons?.pokemons?.map((row) => ({
      id: row.id,
      Pokemon: row.image_url,
      Name: row.pokemon,
      Type: row.type,
      Location: row.location,
      Abilities: row.abilities,
      Evolution: row.evolutions
    })) || []
  ];

  const rowsState: GridRowsProp = [
    ...state?.pokeList?.pokemons?.map((row) => ({
      id: row.id,
      Pokemon: row.image_url,
      Name: row.pokemon,
      Type: row.type,
      Location: row.location,
      Abilities: row.abilities,
      Evolution: row.evolutions
    })) || []
  ];

  const rows: GridRowsProp = [...rowsAPI, ...rowsState];

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
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box sx={{ width: '50%' }}>
          <Typography variant="subtitle1">Find your Pokemon!</Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Link to="./edit/editPokemonList">
            <Button
              color="warning"
              sx={{ m: 2, height: '50px' }}
              variant="contained"
            >
              <Edit height="32px" width="32px" />
              Edit Pokemon List
            </Button>
          </Link>
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
    </>
  );
};

PokemonList.displayName = 'PokemonList';

export default PokemonList;

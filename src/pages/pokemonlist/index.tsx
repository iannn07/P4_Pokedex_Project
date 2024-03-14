/* eslint sort-keys: 0 */
import { useEffect } from 'react';

import { Box, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import type { PageComponent } from '@nxweb/react';

import { Grid, Typography } from '@components/material.js';
import { useCommand, useStore } from '@models/store.js';

import type { GridColDef, GridRowsProp } from '@mui/x-data-grid';

const Home: PageComponent = () => {
  const [state, dispatch] = useStore((store) => store.pokemons);
  const command = useCommand((cmd) => cmd);

  useEffect(() => {
    dispatch(command.pokemons.load()).catch((err: unknown) => {
      console.error(err);
    });

    return () => {
      dispatch(command.pokemons.clear());
    };
  }, []);

  const getColorForType = (type: string) => {
    // Generate a consistent color based on the type
    const hash = type
      .split('')
      .reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const hue = hash % 400;

    return `hsl(${hue}, 70%, 30%)`; // Adjust saturation and lightness as needed
  };

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
      <Grid container={true}>
        <DataGrid
          columns={columns}
          getRowHeight={() => 'auto'}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 }
            }
          }}
          pageSizeOptions={[5, 10, 25]}
          rows={rows}
          sx={{ m: 4 }} />
      </Grid>
    </>
  );
};

Home.displayName = 'Home';

export default Home;

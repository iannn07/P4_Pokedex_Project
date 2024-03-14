/* eslint-disable logical-assignment-operators */
/* eslint-disable react/jsx-key */

import { Card, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import type { PageComponent } from '@nxweb/react';

import CustomToolbar from '@components/custom/table/data-grid/custom-toolbar';

import type { GridColDef, GridRowsProp } from '@mui/x-data-grid';

const Admin: PageComponent = () => {
  const rows: GridRowsProp = [
    {
      id: 1,
      name: 'Cupcake'
    },
    {
      id: 2,
      name: 'Donut'
    },
    {
      id: 3,
      name: 'Eclair'
    },
    {
      id: 4,
      name: 'Frozen yoghurt'
    }
  ];

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 200
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 300
    }
  ];

  return (
    <>
      <h1>Components & Elements</h1>
      <Grid container={true} gap={5}>
        {/* Data Grid */}
        <Card sx={{ width: '500px' }}>
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
      </Grid>
    </>
  );
};

Admin.displayName = 'Admin';

export default Admin;

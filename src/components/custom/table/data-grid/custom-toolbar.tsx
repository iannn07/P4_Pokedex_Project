/* eslint-disable sort-keys */
import { Box } from '@mui/material';
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarQuickFilter
} from '@mui/x-data-grid';

const CustomToolbar = () => {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(2, 5, 4, 5)
      }}
    >
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
      <GridToolbarQuickFilter />
    </Box>
  );
};

CustomToolbar.displayName = 'CustomToolbar';
export default CustomToolbar;

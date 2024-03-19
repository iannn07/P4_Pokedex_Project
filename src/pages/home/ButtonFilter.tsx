/* eslint-disable @stylistic/js/linebreak-style */
/* eslint-disable react/display-name */
import React from 'react';

import { FormControl, MenuItem, Select } from '@mui/material';

import { store } from '@models/store';

interface FilterButtonProps {
  readonly activeFilter: string
  readonly handleFilter: (type: string) => void
}

const FilterButton: React.FC<FilterButtonProps> = ({
  activeFilter,
  handleFilter
}) => {
  const state = store.getState();
  const splitter = [
    ...state?.pokemons?.pokemons?.map((pokemon) => pokemon.type.split('/')) ?? []
  ];

  const types: string[] = [...new Set(splitter.flat())];

  return (
    <FormControl sx={{ width: '100%' }}>
      <Select
        displayEmpty={true}
        sx={{ width: '100%' }}
        value={activeFilter}
        onChange={(e) => handleFilter(e.target.value as string)}
      >
        <MenuItem value="">All Types</MenuItem>
        {types.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterButton;

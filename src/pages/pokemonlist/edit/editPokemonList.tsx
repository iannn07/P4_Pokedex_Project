/* eslint-disable react-hooks/exhaustive-deps */
/* eslint sort-keys: 0 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button
} from '@mui/material';

import {
  ArrowBackUP,
  Plus
} from '@nxweb/icons/tabler';
import type { PageComponent } from '@nxweb/react';

import { Typography } from '@components/material.js';
import { useStore } from '@models/store.js';

import PokeListTable from './PokeListTable/pokeListTable';
import AddPokeList from './form/addPokeList';

const EditPokemonList: PageComponent = () => {
  const [pokeLISTState, pokeLISTDispatch] = useStore((store) => store.pokeList);
  const [showCard, setShowCard] = useState<boolean>(false);
  const [showEditCard, setShowEditCard] = useState<boolean>(false);

  const handleToggleCard = () => {
    setShowCard(!showCard);
  };

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
          <Button
            sx={{ height: '50px' }}
            variant="outlined"
            onClick={() => navigate(-1)}
          >
            Go Back
            <ArrowBackUP height="32px" width="32px" />
          </Button>
          <Button
            sx={{ height: '50px' }}
            variant="contained"
            onClick={handleToggleCard}
          >
            <Plus height="32px" width="32px" />
            Add New Pokemon
          </Button>
        </Box>
      </Box>

      {/* Add Card */}
      <AddPokeList
        pokeLISTDispatch={pokeLISTDispatch}
        setShowCard={setShowCard}
        showCard={showCard} />

      {/* PokeListTable */}
      <PokeListTable
        pokeLISTDispatch={pokeLISTDispatch}
        pokeLISTState={pokeLISTState}
        setShowEditCard={setShowEditCard}
        showEditCard={showEditCard} />
    </>
  );
};

EditPokemonList.displayName = 'EditPokemonList';

export default EditPokemonList;
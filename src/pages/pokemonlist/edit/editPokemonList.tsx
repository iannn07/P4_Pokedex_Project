/* eslint-disable react-hooks/exhaustive-deps */
/* eslint sort-keys: 0 */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button } from '@mui/material';

import { ArrowBackUP, Plus } from '@nxweb/icons/tabler';
import type { PageComponent } from '@nxweb/react';

import { Typography } from '@components/material.js';
import { useCommand, useStore } from '@models/store.js';

import PokeListTable from './PokeListTable/pokeListTable';
import AddPokeList from './form/addPokeList';

const EditPokemonList: PageComponent = () => {
  const [state, dispatch] = useStore((store) => store);
  const [showCard, setShowCard] = useState<boolean>(false);
  const command = useCommand((cmd) => cmd);

  const handleToggleCard = () => {
    setShowCard(!showCard);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.pokemons?.pokemons) {
      dispatch(command.pokemons.load()).catch((err: unknown) => {
        console.error(err);
      });
    }
  }, [command.pokemons, dispatch, state?.pokemons?.pokemons]);

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
        setShowCard={setShowCard}
        showCard={showCard} />

      {/* PokeListTable */}
      <PokeListTable
        dispatch={dispatch}
        state={state?.pokemons} />
    </>
  );
};

EditPokemonList.displayName = 'EditPokemonList';

export default EditPokemonList;

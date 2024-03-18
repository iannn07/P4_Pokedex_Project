/* eslint-disable react/display-name */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

import { Card, Grid } from '@components/material';
import type { Pokemons } from '@models/pokemon/types';

interface DisplayCardsProps {
  readonly filteredPokemons: Pokemons[]
  readonly getColorForType: (type: string) => string
  readonly handleObtainPokemon: (pokemon: Pokemons) => void
  readonly obtainedPokemons: number[]
}

const DisplayCards: React.FC<DisplayCardsProps> = ({
  filteredPokemons,
  getColorForType,
  obtainedPokemons,
  handleObtainPokemon
}) => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemons | null>(null);

  const obtainedId = (pokemonId: number) => obtainedPokemons.includes(pokemonId);

  const handleAddToInventoryClick = (pokemon: Pokemons) => {
    if (!obtainedId(pokemon.id)) {
      setSelectedPokemon(pokemon);
    }
  };

  const handleCloseDialog = () => {
    setSelectedPokemon(null);
  };

  const handleConfirmAddToInventory = () => {
    if (selectedPokemon) {
      handleObtainPokemon(selectedPokemon);
      setSelectedPokemon(null);
    }
  };

  return (
    <>
      {filteredPokemons.map((pokemon) => (
        <Grid item={true} key={pokemon.id} md={3} sm={6} xs={12}>
          <Card sx={{ p: 4 }}>
            <Link style={{ textDecoration: 'none' }} to={`../pokemondetails/${pokemon.id}`}>
              <CardMedia image={pokemon.image_url} sx={{ height: '14rem', objectFit: 'contain', width: '100%' }} />
            </Link>
            <CardContent
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'center'
              }}
            >
              <Typography sx={{ fontWeight: 'bold', mb: 3 }} variant="h4">
                {pokemon.pokemon}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, height: 'auto' }}>
                {pokemon.type.split('/').map((type: string) => (
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
                    <Typography sx={{ color: 'white', fontSize: 10, letterSpacing: 1.5 }}>{type.trim()}</Typography>
                  </Box>
                ))}
              </Box>
              <Button
                disabled={obtainedId(pokemon.id)}
                sx={{ mt: 6 }}
                variant="contained"
                onClick={() => handleAddToInventoryClick(pokemon)}
              >
                {obtainedId(pokemon.id) ? 'Obtained' : 'Add to Inventory'}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Dialog open={!!selectedPokemon} onClose={handleCloseDialog}>
        <DialogTitle>
          Adding <Typography component="span" fontWeight="bold">{selectedPokemon?.pokemon}</Typography> to Inventory
        </DialogTitle>
        <DialogContent>
          Are you sure you want to add <Typography component="span" fontWeight="bold">{selectedPokemon?.pokemon}</Typography> to your inventory?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmAddToInventory}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DisplayCards;

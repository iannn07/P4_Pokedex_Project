/* eslint-disable sort-keys */
/* eslint-disable @stylistic/js/linebreak-style */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/display-name */
import React, { useState } from 'react';

import {
  Box,
  Button,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  List,
  Slide,
  Typography
} from '@mui/material';

import { ArrowRight, Trash } from '@nxweb/icons/tabler';

import getColorForType from '@components/custom/type-color/type-color';
import { Card, Grid } from '@components/material.js';
import type {
  InventoryPokemons,
  InventoryPokemonsModel
} from '@models/inventory/types';
import type { Pokemons } from '@models/pokemon/types';
import { useCommand, useStore } from '@models/store';
import { trainerCommand } from '@models/trainer/commands';

const InventoryCard: React.FC<InventoryPokemonsModel> = ({ inventory }) => {
  const [checked, setChecked] = useState<boolean[]>([]);
  const [state, dispatch] = useStore((store) => store);
  const command = useCommand((cmd) => cmd);

  const handleChange = (index: number) => {
    const newChecked = [...checked];
    if (newChecked[index]) {
      newChecked[index] = false;
    } else {
      newChecked[index] = true;
    }

    setChecked(newChecked);
  };

  const dispatchDataSyncInvent = (dataSync: InventoryPokemons) => {
    dispatch(command.pokemons.edit(dataSync));
  };

  const dispatchDataSyncEvolution = (dataSync: InventoryPokemons) => {
    dispatch(command.pokemons.edit(dataSync));
  };

  const handleEvolve = (
    pokemon: InventoryPokemons,
    evolution: InventoryPokemons,
    index: number
  ) => {
    const data = {
      activity: 'Evolve',
      dateTime: new Date().toLocaleString(),
      pokemon
    };

    const dataSyncInvent = {
      ...pokemon,
      inInventory: false,
      isObtained: true
    };

    const dataSyncEvolution = {
      ...evolution,
      inInventory: true,
      isObtained: true
    };

    dispatch(trainerCommand(data));
    handleChange(index);
    dispatch(command.inventory.evolveInventory(pokemon, evolution));

    dispatchDataSyncInvent(dataSyncInvent);
    dispatchDataSyncEvolution(dataSyncEvolution);
  };

  const handleRemove = (pokemon: InventoryPokemons) => {
    const data = {
      activity: 'Remove',
      dateTime: new Date().toLocaleString(),
      pokemon
    };

    const dataSyncInvent = {
      ...pokemon,
      inInventory: false,
      isObtained: true
    };

    dispatch(trainerCommand(data));
    dispatch(command.inventory.removeInventory(pokemon));

    dispatchDataSyncInvent(dataSyncInvent);
  };

  return (
    <Slide direction="up" in={true} mountOnEnter={true} unmountOnExit={true}>
      <Card sx={{ overflowX: 'auto' }}>
        <Grid
          container={true}
          spacing={6}
          sx={{
            alignItems: 'flex-start',
            display: 'flex',
            flexWrap: 'nowrap'
          }}
        >
          {inventory?.map((data, index) => (
            <Grid item={true} key={index}>
              <Box>
                <Card sx={{ p: 3 }}>
                  <CardHeader
                    action={
                      <Trash
                        cursor="pointer"
                        height="25px"
                        width="25px"
                        onClick={() => handleRemove(data)} />
                    } />

                  <Grid container={true} sx={{ flexWrap: 'nowrap' }}>
                    <Grid item={true} sx={{ width: '16rem' }}>
                      <CardMedia
                        component="img"
                        image={data.image_url}
                        sx={{
                          height: '10rem',
                          objectFit: 'contain'
                        }} />

                      <CardContent
                        sx={{
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Typography
                          sx={{ fontWeight: 'bold', mb: 3 }}
                          variant="h4"
                        >
                          {data.pokemon}
                        </Typography>

                        <Box
                          sx={{
                            borderRadius: 8,
                            display: 'flex',
                            gap: 2,
                            height: 'auto',
                            mb: 2
                          }}
                        >
                          {data.type.split('/').map((type) => (
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
                        </Box>
                        <Typography variant="h6">Obtained At</Typography>
                        <Typography sx={{ fontWeight: 'bold' }} variant="h6">
                          {data.date}
                        </Typography>
                        {!data?.evolutions
                          ?.map((evolution) => {
                            const evolutionExists: Pokemons | undefined =
                              state?.pokemons?.pokemons?.find(
                                (pokemon) => evolution === pokemon.pokemon
                              );
                            // eslint-disable-next-line no-eq-null
                            if (evolutionExists != null) return true;

                            return false;
                          })
                          .some(Boolean)
                          ? null
                          : (
                          <Button
                            disabled={false}
                            key={index}
                            sx={{ mt: 6 }}
                            variant="contained"
                            onClick={() => handleChange(index)}
                          >
                            Check Evolution <ArrowRight />
                          </Button>
                          )}
                      </CardContent>
                    </Grid>
                    <Collapse
                      in={checked[index]}
                      key={index}
                      orientation="horizontal"
                    >
                      <Grid item={true} sx={{ width: '8rem' }}>
                        <Typography sx={{ mb: 0 }} variant="h5">
                          Available Evolution :
                        </Typography>
                        {data?.evolutions?.length > 0 && (
                          <List>
                            {data?.evolutions?.map((evolution, indexEvo) => {
                              const evolutionExists: Pokemons | undefined =
                                state?.pokemons?.pokemons?.find(
                                  (pokemon) => pokemon.pokemon === evolution
                                );

                              const isDisabled = !evolutionExists;
                              if (!evolutionExists) return null;

                              return (
                                <Button
                                  disabled={isDisabled}
                                  key={indexEvo}
                                  sx={{ mt: 6 }}
                                  variant="contained"
                                  {...(evolutionExists && {
                                    onClick: () => handleEvolve(
                                      data,
                                      evolutionExists,
                                      index
                                    )
                                  })}
                                >
                                  {evolution}
                                </Button>
                              );
                            })}
                          </List>
                        )}
                      </Grid>
                    </Collapse>
                  </Grid>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Slide>
  );
};

export default InventoryCard;

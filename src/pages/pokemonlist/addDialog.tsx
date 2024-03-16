/* eslint-disable react-hooks/exhaustive-deps */
/* eslint sort-keys: 0 */
import { useEffect } from 'react';
import type { FormEvent } from 'react';

import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment
} from '@mui/material';

import { Accessible, Category, ChevronsUP, MapPin, Pokeball, Upload } from '@nxweb/icons/tabler';

import { Typography } from '@components/material.js';
import { useCommand, useStore } from '@models/store';

import CustomTextField from '../../components/custom/text-field/text-field';

interface AddPokemonDialogProps {
  handleAddDialog: () => void
  onAddSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const AddPokemonDialog: React.FC<AddPokemonDialogProps> = ({
  onAddSubmit,
  handleAddDialog
}) => {
  const [state, dispatch] = useStore((store) => store.pokemons);
  const command = useCommand((cmd) => cmd);

  useEffect(() => {
    dispatch(command.pokeList.addPokemon({}));
  }, []);

  return (
    <>
      <DialogTitle
        component="div"
        sx={{
          textAlign: 'center',
          px: (theme) => [
            `${theme.spacing(5)} !important`,
            `${theme.spacing(15)} !important`
          ],
          pt: (theme) => [
            `${theme.spacing(8)} !important`,
            `${theme.spacing(12.5)} !important`
          ]
        }}
      >
        <Typography sx={{ mb: 2 }} variant="h3">
          Add New Pokemon
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          px: (theme) => [
            `${theme.spacing(5)} !important`,
            `${theme.spacing(15)} !important`
          ],
          pb: (theme) => [
            `${theme.spacing(8)} !important`,
            `${theme.spacing(12.5)} !important`
          ]
        }}
      >
        <Box
          sx={{
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <Box>
            <form onSubmit={(e) => e.preventDefault()}>
              <Grid container={true} spacing={5}>
                <Grid item={true} xs={12}>
                  <CustomTextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Pokeball />
                        </InputAdornment>
                      )
                    }}
                    fullWidth={true}
                    label="Pokemon Name"
                    placeholder="Pikachu" />
                </Grid>
                <Grid item={true} xs={12}>
                  <CustomTextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Category />
                        </InputAdornment>
                      )
                    }}
                    fullWidth={true}
                    label="Type"
                    placeholder="Electric" />
                </Grid>
                <Grid item={true} xs={12}>
                  <CustomTextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MapPin />
                        </InputAdornment>
                      )
                    }}
                    fullWidth={true}
                    label="Location"
                    placeholder="Madiun" />
                </Grid>
                <Grid item={true} xs={12}>
                  <CustomTextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Accessible />
                        </InputAdornment>
                      )
                    }}
                    fullWidth={true}
                    label="Abilities"
                    placeholder="Abilities"
                    sx={{
                      '& .MuiInputBase-root.MuiFilledInput-root': {
                        alignItems: 'baseline'
                      }
                    }} />
                </Grid>
                <Grid item={true} xs={12}>
                  <CustomTextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ChevronsUP />
                        </InputAdornment>
                      )
                    }}
                    fullWidth={true}
                    label="Evolution"
                    placeholder="Evolution"
                    sx={{
                      '& .MuiInputBase-root.MuiFilledInput-root': {
                        alignItems: 'baseline'
                      }
                    }} />
                </Grid>
                <Grid item={true} xs={12}>
                  <Upload />
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
        <Box
          component="form"
          sx={{
            mt: 4,
            mx: 'auto',
            width: '100%',
            maxWidth: 360,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
          }}
          onSubmit={onAddSubmit}
        >
          <Box
            className="demo-space-x"
            sx={{ '& > :last-child': { mr: '0 !important' } }}
          >
            <Button type="submit" variant="contained">
              Add Pokemon
            </Button>
            <Button
              color="secondary"
              type="reset"
              variant="tonal"
              onClick={handleAddDialog}
            >
              Discard Pokemon
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </>
  );
};

AddPokemonDialog.displayName = 'AddPokemonDialog';

export default AddPokemonDialog;

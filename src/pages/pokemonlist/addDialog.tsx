/* eslint-disable react-hooks/exhaustive-deps */
/* eslint sort-keys: 0 */
import {  useEffect } from 'react';
import type { FormEvent } from 'react';

import { Box, Button, DialogContent, DialogTitle } from '@mui/material';

import { Typography } from '@components/material.js';
import { useCommand, useStore } from '@models/store';

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
        <Box>
          <p>Test Form</p>
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
              Create Permission
            </Button>
            <Button
              color="secondary"
              type="reset"
              variant="tonal"
              onClick={handleAddDialog}
            >
              Discard
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </>
  );
};

AddPokemonDialog.displayName = 'AddPokemonDialog';

export default AddPokemonDialog;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint sort-keys: 0 */
import type { FormEvent } from 'react';

import { Box, Button, Checkbox, DialogContent, DialogTitle, FormControlLabel } from '@mui/material';

import { Typography } from '@components/material.js';

interface AddPokemonDialogProps {
  handleDialogToggle: () => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const AddPokemonDialog: React.FC<AddPokemonDialogProps> = ({
  onSubmit,
  handleDialogToggle
}) => {
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
          Add New Permission
        </Typography>
        <Typography color="text.secondary">
          Permissions you may use and assign to your users.
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
          onSubmit={(e) => onSubmit(e)}
        >
          {/* <CustomTextField
            fullWidth
            sx={{ mb: 1 }}
            label="Permission Name"
            placeholder="Enter Permission Name"
          /> */}
          <Box sx={{ width: '100%', display: 'flex' }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Set as core permission" />
          </Box>
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
              onClick={handleDialogToggle}
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

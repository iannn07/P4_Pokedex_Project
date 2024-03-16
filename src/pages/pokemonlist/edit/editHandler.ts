/* eslint-disable react-hooks/rules-of-hooks */
import type { FormEvent } from 'react';
import { useState } from 'react';

export const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);

export const handleAddDialog = () => {
  setOpenAddDialog(!openAddDialog);
};

export const onAddSubmit = (e: FormEvent<HTMLFormElement>) => {
  setOpenAddDialog(true);
  e.preventDefault();
};

export const handleEditPokemon = (data: number) => {
  console.log(data);
};

export const handleDeletePokemon = (data: number) => {
  console.log(data);
};

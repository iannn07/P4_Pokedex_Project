import { ActionTypes } from '../constants/action-types';

interface ToggleDialogAction {
  type: ActionTypes.TOGGLE_DIALOG
}

export const toggleDialog = (): ToggleDialogAction => ({
  type: ActionTypes.TOGGLE_DIALOG
});

export type DialogAction = ToggleDialogAction;

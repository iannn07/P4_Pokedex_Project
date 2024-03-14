import type { ActionTypes } from '../action-types/action-types';

interface OpenDialogAction {
  payload: boolean
  type: ActionTypes.OPEN_DIALOG
}

interface CloseDialogAction {
  payload: boolean
  type: ActionTypes.CLOSE_DIALOG
}

export type DialogAction = CloseDialogAction | OpenDialogAction;

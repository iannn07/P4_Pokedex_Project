import type { Dispatch } from '@nxweb/core';

import { ActionTypes } from '../action-types/action-types';

import type { DialogAction } from '../actions/dialogAction';

export const openDialog = (open: boolean) => {
  return (dispatch: Dispatch<DialogAction>) => {
    dispatch({
      payload: open,
      type: ActionTypes.OPEN_DIALOG
    });
  };
};

export const closeDialog = (open: boolean) => {
  return (dispatch: Dispatch<DialogAction>) => {
    dispatch({
      payload: open,
      type: ActionTypes.CLOSE_DIALOG
    });
  };
};

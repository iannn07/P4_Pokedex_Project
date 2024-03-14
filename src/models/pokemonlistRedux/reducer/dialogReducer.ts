import { ActionTypes } from '../action-types/action-types';

import type { DialogAction } from '../actions/dialogAction';

interface AppState {
  open: boolean
}

const initialState: AppState = {
  open: false
};

const dialogReducer = (state = initialState, action: DialogAction) => {
  switch (action.type) {
    case ActionTypes.OPEN_DIALOG:
      return { ...state, open: true };
    case ActionTypes.CLOSE_DIALOG:
      return { ...state, open: false };

    default:
      return state;
  }
};

export default dialogReducer;

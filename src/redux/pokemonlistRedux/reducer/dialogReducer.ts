import { ActionTypes } from '../constants/action-types';

import type { DialogAction } from '../actions/dialogAction';

interface AppState {
  open: boolean
}

const initialState: AppState = {
  open: false
};

const dialogReducer = (state = initialState, action: DialogAction) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_DIALOG:
      return { ...state, open: !state.open };

    default:
      return state;
  }
};

export default dialogReducer;

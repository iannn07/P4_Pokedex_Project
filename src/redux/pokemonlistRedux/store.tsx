// store.ts

import { createStore } from 'redux';

// Define your initial state
interface AppState {
  open: boolean;
}

const initialState: AppState = {
  open: false,
};

// Define action types
enum ActionTypes {
  TOGGLE_DIALOG = 'TOGGLE_DIALOG',
}

// Define action creators
interface ToggleDialogAction {
  type: ActionTypes.TOGGLE_DIALOG;
}

export const toggleDialog = (): ToggleDialogAction => ({
  type: ActionTypes.TOGGLE_DIALOG,
});

// Create a reducer function
const rootReducer = (state = initialState, action: ToggleDialogAction): AppState => {
  switch (action.type) {
    case ActionTypes.TOGGLE_DIALOG:
      return { ...state, open: !state.open };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(rootReducer);

export default store;

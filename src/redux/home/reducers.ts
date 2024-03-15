/* eslint-disable @stylistic/js/linebreak-style */
import { ActionTypes } from './actionTypes';
import { SearchAction } from './actions';

interface AppState {
  open: boolean
  searchTerm: string | null // Add searchTerm to AppState
}

const initialState: AppState = {
  open: false,
  searchTerm: null // Initialize searchTerm to null
};

const searchReducer = (state = initialState, action: SearchAction) => {
  switch (action.type) {
    case ActionTypes.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload }; // Set searchTerm to the payload

    default:
      return state;
  }
};

export default searchReducer;

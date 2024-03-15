/* eslint-disable @stylistic/js/linebreak-style */
import { ActionTypes } from './actionTypes';

// Define action interfaces
interface SetSearchTermAction {
  type: ActionTypes.SET_SEARCH_TERM
  payload: string
}

// Action creator to set the search term
export const setSearchTerm = (term: string): SetSearchTermAction => ({
  type: ActionTypes.SET_SEARCH_TERM,
  payload: term
});

// Export the action type
export type SearchAction = SetSearchTermAction;

import createReducer from '../utils/createReducer';
import * as types from '../actionTypes/actionTypes';

const initialState = {
  searchResults: []
};

export default createReducer(initialState, {
  [types.LOAD_SEARCH_RESULT]: state => ({
    ...state,
  }),
  [types.LOAD_SEARCH_RESULT_SUCCESS]: (state, { payload: { searchResult } }) => ({
    ...state,
    searchResults: searchResult.results
  }),

});

export const SELECTORS = {
  getSearchResults: state => state.searchResults,
};

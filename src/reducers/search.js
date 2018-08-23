import createReducer from '../utils/createReducer';
import * as types from '../actionTypes/actionTypes';
import * as SearchActions from '../actions/searchActions';

const initialState = {
  searchResults: [],
};

export default createReducer(initialState, {
  [types.LOAD_SEARCH_RESULT]: state => ({
    ...state,
  }),
  [SearchActions.search.success]: (state, {payload: {searchResult}}) => ({
    ...state,
    searchResults: searchResult.results,
  }),
});

export const SELECTORS = {
  getSearchResults: state => state.searchResults,
};

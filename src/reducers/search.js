import createReducer from '../utils/createReducer';
import * as SearchActions from '../actions/searchActions';

const initialState = {
  searchResults: [],
};

export default createReducer(initialState, {
  [SearchActions.search.success]: (state, {payload: {searchResult}}) => ({
    ...state,
    searchResults: searchResult.results,
  }),
});

export const SELECTORS = {
  getSearchResults: state => state.searchResults,
};

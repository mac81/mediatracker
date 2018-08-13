import * as types from '../actionTypes/actionTypes';

export const loadSearchResult = query => ({
  type: types.LOAD_SEARCH_RESULT,
  payload: { query },
});

export const loadSearchResultRequest = query => ({
  type: types.LOAD_SEARCH_RESULT_REQUEST,
  payload: { query },
});

export const loadSearchResultSuccess = searchResult => ({
  type: types.LOAD_SEARCH_RESULT_SUCCESS,
  payload: { searchResult },
});

export const loadSearchResultFailure = error => ({
  type: types.LOAD_SEARCH_RESULT_FAILURE,
  payload: { error },
});
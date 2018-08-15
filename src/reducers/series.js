import createReducer from '../utils/createReducer';
import * as types from '../actionTypes/actionTypes';
import arrayToObject from '../utils/arrayToObject';

const initialState = {
  userSeries: null,
};

export default createReducer(initialState, {
  [types.LOAD_SERIES_DETAILS]: state => ({
    ...state,
  }),
  [types.LOAD_SERIES_DETAILS_REQUEST]: state => ({
    ...state,
    isLoading: true,
  }),
  [types.LOAD_SERIES_DETAILS_SUCCESS]: (state, {payload: {series}}) => ({
    ...state,
    isLoading: false,
    details: series.details,
    isAddedToWatchlist: series.isAddedToWatchlist,
  }),
  [types.LOAD_SEASON]: state => ({
    ...state,
  }),
  [types.LOAD_SEASON_REQUEST]: state => ({
    ...state,
    isLoading: true,
  }),
  [types.LOAD_SEASON_SUCCESS]: (state, {payload: {season}}) => ({
    ...state,
    isLoading: false,
    season,
  }),
  [types.LOAD_SEASON_COLLECTION_SUCCESS]: (state, {payload: {season}}) => ({
    ...state,
    isLoading: false,
    season: season,
  }),
  [types.LOAD_USER_SERIES_SUCCESS]: (state, {payload: {userSeries}}) => ({
    ...state,
    userSeries: arrayToObject(userSeries),
  }),
  [types.ADD_TO_WATCHLIST_SUCCESS]: (state, {payload: {userSeries}}) => ({
    ...state,
    isAddedToWatchlist: true,
  }),
  [types.REMOVE_FROM_WATCHLIST_SUCCESS]: (state, {payload: {userSeries}}) => ({
    ...state,
    isAddedToWatchlist: false,
  }),
});

export const SELECTORS = {
  getSeriesDetails: state => state.details,
  getAllSeriesCollection: state => state.userSeries,
  getUserSeries: (state, id) => state.userSeries[id],
  getSeason: state => state.season,
  getTrackedEpisodes: state => state.season && state.season.episodes,
  getIsLoading: state => state.isLoading,
  getIsAddedToWatchlist: state => state.isAddedToWatchlist,
};

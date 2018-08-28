import createReducer from '../utils/createReducer';
import * as types from '../actionTypes/actionTypes';
import arrayToObject from '../utils/arrayToObject';
import * as SeriesActions from '../actions/seriesActions';
import * as CollectionActions from '../actions/collectionActions';

const initialState = {};

export default createReducer(initialState, {
  [SeriesActions.fetchSeries.request]: state => ({
    ...state,
    isLoading: true,
  }),
  [SeriesActions.fetchSeries.success]: (state, {payload: {series, palette}}) => ({
    ...state,
    isLoading: false,
    details: series.details,
    palette,
  }),
  [SeriesActions.fetchSeason.request]: state => ({
    ...state,
    isLoading: true,
  }),
  [SeriesActions.fetchSeason.success]: (state, {payload: {season}}) => ({
    ...state,
    isLoading: false,
    season,
  }),
  [SeriesActions.fetchSeriesWithLatestSeason.success]: (state, {payload: {series, season}}) => ({
    ...state,
    isLoading: false,
    details: series.details,
    season,
  }),
  [CollectionActions.addSeriesToCollection.success]: state => ({
    ...state,
    details: {
      ...state.details,
      isInCollection: true,
    },
  }),
  [CollectionActions.removeSeriesFromCollection.success]: state => ({
    ...state,
    details: {
      ...state.details,
      isInCollection: false,
    },
  }),
});

export const SELECTORS = {
  getSeriesDetails: state => state.details,
  getSeason: state => state.season,
  getPalette: state => state.palette,
  getIsLoading: state => state.isLoading,
};

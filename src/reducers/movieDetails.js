import createReducer from '../utils/createReducer';
import * as types from '../actionTypes/actionTypes';

const initialState = {};

export default createReducer(initialState, {
  [types.LOAD_MOVIE_DETAILS]: state => ({
    ...state,
  }),
  [types.LOAD_MOVIE_DETAILS_SUCCESS]: (state, {payload: {movie}}) => ({
    ...state,
    details: movie,
  }),
});

export const SELECTORS = {
  getMovieDetails: state => state.details,
};

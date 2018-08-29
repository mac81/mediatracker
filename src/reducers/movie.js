import createReducer from '../utils/createReducer';
import * as MovieActions from '../actions/movieActions';

const initialState = {};

export default createReducer(initialState, {
  [MovieActions.fetchMovie.success]: (state, {payload: {movie}}) => ({
    ...state,
    details: {
      ...movie.details,
      ['media_type']: 'movie',
    },
  }),
});

export const SELECTORS = {
  getMovieDetails: state => state && state.details,
};

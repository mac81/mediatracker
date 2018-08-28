import {createRoutine} from 'redux-saga-routines';

export const fetchMovie = createRoutine('FETCH_MOVIE');

// import * as types from '../actionTypes/actionTypes';

// export const loadMovieDetails = id => ({
//   type: types.LOAD_MOVIE_DETAILS,
//   payload: { id },
// });

// export const loadMovieDetailsRequest = id => ({
//   type: types.LOAD_MOVIE_DETAILS_REQUEST,
//   payload: { id },
// });

// export const loadMovieDetailsSuccess = movie => ({
//   type: types.LOAD_MOVIE_DETAILS_SUCCESS,
//   payload: { movie },
// });

// export const loadMovieDetailsFailure = error => ({
//   type: types.LOAD_MOVIE_DETAILS_FAILURE,
//   payload: { error },
// });

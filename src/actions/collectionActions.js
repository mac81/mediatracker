import {createRoutine} from 'redux-saga-routines';

export const fetchUserCollection = createRoutine('FETCH_USER_COLLECTION');

export const addMovieToCollection = createRoutine('ADD_MOVIE_TO_COLLECTION');
export const removeMovieFromCollection = createRoutine('REMOVE_MOVIE_FROM_COLLECTION');

export const addSeriesToCollection = createRoutine('ADD_SERIES_TO_COLLECTION');
export const removeSeriesFromCollection = createRoutine('REMOVE_SERIES_FROM_COLLECTION');
export const addEpisode = createRoutine('ADD_EPISODE');
export const removeEpisode = createRoutine('REMOVE_EPISODE');

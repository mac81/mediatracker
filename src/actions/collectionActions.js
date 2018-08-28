import {createRoutine} from 'redux-saga-routines';

export const fetchUserCollection = createRoutine('FETCH_USER_COLLECTION');
export const addSeriesToCollection = createRoutine('ADD_SERIES_TO_COLLECTION');
export const removeSeriesFromCollection = createRoutine('REMOVE_SERIES_FROM_COLLECTION');

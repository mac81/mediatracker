import {createRoutine} from 'redux-saga-routines';

export const fetchSeries = createRoutine('FETCH_SERIES');
export const fetchSeason = createRoutine('FETCH_SEASON');
export const fetchSeriesWithLatestSeason = createRoutine('FETCH_SERIES_WITH_LATEST_SEASON');

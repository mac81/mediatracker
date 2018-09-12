import {createRoutine} from 'redux-saga-routines';

export const fetchSeries = createRoutine('FETCH_SERIES');
export const fetchSeason = createRoutine('FETCH_SEASON');
export const fetchSeriesWithLatestSeason = createRoutine('FETCH_SERIES_WITH_LATEST_SEASON');

export const addEpisode = createRoutine('ADD_EPISODE');
export const removeEpisode = createRoutine('REMOVE_EPISODE');

export const addAllEpisodes = createRoutine('ADD_ALL_EPISODES');
export const removeAllEpisodes = createRoutine('REMOVE_ALL_EPISODES');

export const addAllSeasonEpisodes = createRoutine('ADD_ALL_SEASON_EPISODES');
export const removeAllSeasonEpisodes = createRoutine('REMOVE_ALL_SEASON_EPISODES');

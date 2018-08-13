import * as types from '../actionTypes/actionTypes';

/************
## DETAILS ##
************/

export const loadSeriesDetails = id => ({
  type: types.LOAD_SERIES_DETAILS,
  payload: {id},
});

export const loadSeriesDetailsRequest = id => ({
  type: types.LOAD_SERIES_DETAILS_REQUEST,
  payload: {id},
});

export const loadSeriesDetailsSuccess = series => ({
  type: types.LOAD_SERIES_DETAILS_SUCCESS,
  payload: {series},
});

export const loadSeriesDetailsFailure = error => ({
  type: types.LOAD_SERIES_DETAILS_FAILURE,
  payload: {error},
});

/***********
## SEASON ##
***********/

export const loadSeason = (id, seasonNumber) => ({
  type: types.LOAD_SEASON,
  payload: {id, seasonNumber},
});

export const loadSeasonRequest = (id, seasonNumber) => ({
  type: types.LOAD_SEASON_REQUEST,
  payload: {id, seasonNumber},
});

export const loadSeasonSuccess = season => ({
  type: types.LOAD_SEASON_SUCCESS,
  payload: {season},
});

export const loadSeasonFailure = error => ({
  type: types.LOAD_SEASON_FAILURE,
  payload: {error},
});

/**********************
## SEASON COLLECTION ##
**********************/

export const loadSeasonCollection = (id, seasonNumber) => ({
  type: types.LOAD_SEASON_COLLECTION,
  payload: {id, seasonNumber},
});

export const loadSeasonCollectionRequest = (id, seasonNumber) => ({
  type: types.LOAD_SEASON_COLLECTION_REQUEST,
  payload: {id, seasonNumber},
});

export const loadSeasonCollectionSuccess = season => ({
  type: types.LOAD_SEASON_COLLECTION_SUCCESS,
  payload: {season},
});

export const loadSeasonCollectionFailure = error => ({
  type: types.LOAD_SEASON_COLLECTION_FAILURE,
  payload: {error},
});

/****************
## USER SERIES ##
****************/

export const loadUserSeries = () => ({
  type: types.LOAD_USER_SERIES,
});

export const loadUserSeriesRequest = () => ({
  type: types.LOAD_USER_SERIES_REQUEST,
});

export const loadUserSeriesSuccess = userSeries => ({
  type: types.LOAD_USER_SERIES_SUCCESS,
  payload: {userSeries},
});

export const loadUserSeriesFailure = error => ({
  type: types.LOAD_USER_SERIES_FAILURE,
  payload: {error},
});

/*********************
## ADD TO WATCHLIST ##
*********************/

export const addToWatchlist = id => ({
  type: types.ADD_TO_WATCHLIST,
  payload: {id},
});

export const addToWatchlistRequest = () => ({
  type: types.ADD_TO_WATCHLIST_REQUEST,
});

export const addToWatchlistSuccess = series => ({
  type: types.ADD_TO_WATCHLIST_SUCCESS,
  payload: {series},
});

export const addToWatchlistFailure = error => ({
  type: types.ADD_TO_WATCHLIST_FAILURE,
  payload: {error},
});

/**************************
## REMOVE FROM WATCHLIST ##
**************************/

export const removeFromWatchlist = id => ({
  type: types.REMOVE_FROM_WATCHLIST,
  payload: {id},
});

export const removeFromWatchlistRequest = () => ({
  type: types.REMOVE_FROM_WATCHLIST_REQUEST,
});

export const removeFromWatchlistSuccess = series => ({
  type: types.REMOVE_FROM_WATCHLIST_SUCCESS,
  payload: {series},
});

export const removeFromWatchlistFailure = error => ({
  type: types.REMOVE_FROM_WATCHLIST_FAILURE,
  payload: {error},
});

/*****************************
## ADD EPISODE TO WATCHLIST ##
*****************************/

export const addEpisode = (id, episodeId) => ({
  type: types.ADD_EPISODE,
  payload: {id, episodeId},
});

export const addEpisodeRequest = () => ({
  type: types.ADD_EPISODE_REQUEST,
});

export const addEpisodeSuccess = episode => ({
  type: types.ADD_EPISODE_SUCCESS,
  payload: {episode},
});

export const addEpisodeFailure = error => ({
  type: types.ADD_EPISODE_FAILURE,
  payload: {error},
});

/********************************
## REMOVE EPISODE TO WATCHLIST ##
********************************/

export const removeEpisode = (id, episodeId) => ({
  type: types.REMOVE_EPISODE,
  payload: {id, episodeId},
});

export const removeEpisodeRequest = () => ({
  type: types.REMOVE_EPISODE_REQUEST,
});

export const removeEpisodeSuccess = episode => ({
  type: types.REMOVE_EPISODE_SUCCESS,
  payload: {episode},
});

export const removeEpisodeFailure = error => ({
  type: types.REMOVE_EPISODE_FAILURE,
  payload: {error},
});

import {delay} from 'redux-saga';
import {call, put, take, takeLatest, takeEvery, select, fork} from 'redux-saga/effects';
import {SELECTORS} from '../reducers';
import * as types from '../actionTypes/actionTypes';
import * as SeriesActions from '../actions/seriesActions';
import {
  getSeriesDetailsApi,
  getSeasonApi,
  getUserSeriesApi,
  addToWatchlistApi,
  removeFromWatchlistApi,
  addEpisodeApi,
  removeEpisodeApi,
  getSeasonCollectionApi,
} from '../api/series';

function* tvs() {
  yield takeLatest(types.LOAD_SERIES_DETAILS, loadSeriesDetailsSaga);
  yield takeLatest(types.LOAD_SEASON, loadSeasonSaga);
  yield takeLatest(types.LOAD_SEASON_COLLECTION, loadSeasonCollectionSaga);
  yield takeLatest(types.LOAD_USER_SERIES, loadUserSeriesSaga);
  yield takeLatest(types.ADD_TO_WATCHLIST, addToWatchlistSaga);
  yield takeLatest(types.REMOVE_FROM_WATCHLIST, removeFromWatchlistSaga);
  yield takeLatest(types.ADD_EPISODE, addEpisodeSaga);
  yield takeLatest(types.REMOVE_EPISODE, removeEpisodeSaga);
}

function* loadSeriesDetailsSaga({payload: {id}}) {
  yield fork(loadSeriesDetails, id);
}

function* loadSeasonSaga({payload: {id, seasonNumber}}) {
  yield fork(loadSeason, id, seasonNumber);
}

function* loadSeasonCollectionSaga({payload: {id, seasonNumber}}) {
  yield fork(loadSeasonCollection, id, seasonNumber);
}

function* addToWatchlistSaga({payload: {id}}) {
  yield fork(addToWatchlist, id);
}

function* removeFromWatchlistSaga({payload: {id}}) {
  yield fork(removeFromWatchlist, id);
}

function* addEpisodeSaga({payload: {id, episodeId}}) {
  yield fork(addEpisode, id, episodeId);
}

function* removeEpisodeSaga({payload: {id, episodeId}}) {
  yield fork(removeEpisode, id, episodeId);
}

function* loadUserSeriesSaga() {
  yield put(SeriesActions.loadUserSeriesRequest());
  try {
    const userSeries = yield call(getUserSeriesApi);
    yield put(SeriesActions.loadUserSeriesSuccess(userSeries));
  } catch (error) {
    console.log(error);
    yield put(SeriesActions.loadUserSeriesFailure(error));
  }
}

function* loadSeriesDetails(id) {
  yield put(SeriesActions.loadSeriesDetailsRequest(id));
  try {
    const series = yield call(getSeriesDetailsApi, id);
    yield put(SeriesActions.loadSeriesDetailsSuccess(series));
  } catch (error) {
    console.log(error);
    yield put(SeriesActions.loadSeriesDetailsFailure(error));
  }
}

function* loadSeason(id, seasonNumber) {
  yield put(SeriesActions.loadSeasonRequest(id, seasonNumber));
  try {
    const season = yield call(getSeasonApi, id, seasonNumber);
    yield put(SeriesActions.loadSeasonSuccess(season));
  } catch (error) {
    console.log(error);
    yield put(SeriesActions.loadSeasonFailure(error));
  }
}

function* loadSeasonCollection(id, seasonNumber) {
  yield put(SeriesActions.loadSeasonCollectionRequest(id, seasonNumber));
  try {
    const season = yield call(getSeasonCollectionApi, id, seasonNumber);
    yield put(SeriesActions.loadSeasonCollectionSuccess(season));
  } catch (error) {
    console.log(error);
    yield put(SeriesActions.loadSeasonCollectionFailure(error));
  }
}

function* addToWatchlist(id) {
  yield put(SeriesActions.addToWatchlistRequest(id));
  try {
    const series = yield call(addToWatchlistApi, id);
    yield put(SeriesActions.addToWatchlistSuccess(series));
  } catch (error) {
    console.log(error);
    yield put(SeriesActions.addToWatchlistFailure(error));
  }
}

function* removeFromWatchlist(id) {
  yield put(SeriesActions.removeFromWatchlistRequest(id));
  try {
    const series = yield call(removeFromWatchlistApi, id);
    yield put(SeriesActions.removeFromWatchlistSuccess(series));
  } catch (error) {
    console.log(error);
    yield put(SeriesActions.removeFromWatchlistFailure(error));
  }
}

function* addEpisode(id, episodeId) {
  yield put(SeriesActions.addEpisodeRequest(id));
  try {
    const episode = yield call(addEpisodeApi, id, episodeId);
    yield put(SeriesActions.addEpisodeSuccess(episode));
  } catch (error) {
    console.log(error);
    yield put(SeriesActions.addEpisodeFailure(error));
  }
}

function* removeEpisode(id, episodeId) {
  yield put(SeriesActions.removeEpisodeRequest(id));
  try {
    const episode = yield call(removeEpisodeApi, id, episodeId);
    yield put(SeriesActions.removeEpisodeSuccess(episode));
  } catch (error) {
    console.log(error);
    yield put(SeriesActions.removeEpisodeFailure(error));
  }
}

export default tvs;

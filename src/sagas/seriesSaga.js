import {call, put, takeLatest, fork} from 'redux-saga/effects';
import * as SeriesActions from '../actions/seriesActions';
import {getSeriesApi, getSeasonApi, addEpisodeApi, removeEpisodeApi, addAllEpisodesApi} from '../api/series';
import * as Vibrant from 'node-vibrant';

const getPalette = series => {
  return Vibrant.from(`https://image.tmdb.org/t/p/w1280/${series.details.poster_path}`)
    .getPalette()
    .then(palette => {
      return palette;
    });
};

function* tvs() {
  yield takeLatest(SeriesActions.fetchSeries, fetchSeriesSaga);
  yield takeLatest(SeriesActions.fetchSeason, fetchSeasonSaga);
  yield takeLatest(SeriesActions.fetchSeriesWithLatestSeason, fetchSeriesWithLatestSeasonSaga);
  yield takeLatest(SeriesActions.addEpisode, addEpisodeSaga);
  yield takeLatest(SeriesActions.removeEpisode, removeEpisodeSaga);
  yield takeLatest(SeriesActions.addAllEpisodes, addAllEpisodesSaga);
}

function* fetchSeriesSaga({payload: {id}}) {
  yield fork(fetchSeries, id);
}

function* fetchSeasonSaga({payload: {id, seasonNumber}}) {
  yield fork(fetchSeason, id, seasonNumber);
}

function* fetchSeriesWithLatestSeasonSaga({payload: {id}}) {
  yield fork(fetchSeriesWithLatestSeason, id);
}

function* fetchSeries(id) {
  yield put(SeriesActions.fetchSeries.request(id));
  try {
    const series = yield call(getSeriesApi, id);
    const palette = yield call(getPalette, series);

    yield put(SeriesActions.fetchSeries.success({series, palette}));
  } catch (error) {
    console.log(error);
    yield put(SeriesActions.fetchSeries.failure(error));
  }
}

function* fetchSeason(id, seasonNumber) {
  yield put(SeriesActions.fetchSeason.request(id, seasonNumber));
  try {
    const season = yield call(getSeasonApi, id, seasonNumber);
    yield put(SeriesActions.fetchSeason.success({season}));
  } catch (error) {
    console.log(error);
    yield put(SeriesActions.fetchSeason.failure(error));
  }
}

function* fetchSeriesWithLatestSeason(id) {
  yield put(SeriesActions.fetchSeriesWithLatestSeason.request(id));
  try {
    const series = yield call(getSeriesApi, id);
    const palette = yield call(getPalette, series);
    const season = yield call(getSeasonApi, id, series.details.number_of_seasons);

    yield put(SeriesActions.fetchSeriesWithLatestSeason.success({series, palette, season}));
  } catch (error) {
    console.log(error);
    yield put(SeriesActions.fetchSeriesWithLatestSeason.failure(error));
  }
}

/***********************
 * ADD EPISODE
 **********************/

function* addEpisodeSaga({payload: {seriesId, episodeId, seasonNumber}}) {
  yield fork(addEpisode, seriesId, episodeId, seasonNumber);
}

function* addEpisode(seriesId, episodeId, seasonNumber) {
  yield put(SeriesActions.addEpisode.request(episodeId));
  try {
    yield call(addEpisodeApi, seriesId, episodeId, seasonNumber);
    yield put(SeriesActions.addEpisode.success({seriesId, episodeId}));
  } catch (error) {
    console.log(error);
    yield put(SeriesActions.addEpisode.failure(error));
  }
}

/***********************
 * REMOVE EPISODE
 **********************/

function* removeEpisodeSaga({payload: {seriesId, episodeId}}) {
  yield fork(removeEpisode, seriesId, episodeId);
}

function* removeEpisode(seriesId, episodeId) {
  yield put(SeriesActions.removeEpisode.request(episodeId));
  try {
    yield call(removeEpisodeApi, seriesId, episodeId);
    console.log(seriesId, episodeId);
    yield put(SeriesActions.removeEpisode.success({seriesId, episodeId}));
  } catch (error) {
    console.log(error);
    yield put(SeriesActions.removeEpisode.failure(error));
  }
}

/***********************
 * ADD ALL EPISODES
 **********************/

function* addAllEpisodesSaga({payload: {seriesId}}) {
  yield fork(addAllEpisodes, seriesId);
}

function* addAllEpisodes(seriesId) {
  yield put(SeriesActions.addAllEpisodes.request(seriesId));
  try {
    yield call(addAllEpisodesApi, seriesId);
    yield put(SeriesActions.addAllEpisodes.success({seriesId}));
  } catch (error) {
    console.log(error);
    yield put(SeriesActions.addAllEpisodes.failure(error));
  }
}

export default tvs;

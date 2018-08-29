import {call, put, takeLatest, fork} from 'redux-saga/effects';
import * as SeriesActions from '../actions/seriesActions';
import {getSeriesApi, getSeasonApi} from '../api/series';
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

export default tvs;

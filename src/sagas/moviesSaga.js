import { delay } from 'redux-saga';
import { call, put, take, takeLatest, takeEvery, select, fork } from 'redux-saga/effects';
import { SELECTORS } from '../reducers';
import * as types from '../actionTypes/actionTypes';
import * as MovieActions from '../actions/movieActions';
import { getMovieDetailsApi } from '../api/movie';

function* movies() {
  yield takeLatest(types.LOAD_MOVIE_DETAILS, loadMovieDetailsSaga);
}

function* loadMovieDetailsSaga({ payload: { id } }) {
  yield fork(loadMovieDetails, id);
}

function* loadMovieDetails(id) {
  yield put(MovieActions.loadMovieDetailsRequest(id));
  try {
    const movie = yield call(getMovieDetailsApi, id);
    yield put(MovieActions.loadMovieDetailsSuccess(movie));
  } catch (error) {
    console.log(error);
    yield put(MovieActions.loadMovieDetailsFailure(error));
  }
}

export default movies;
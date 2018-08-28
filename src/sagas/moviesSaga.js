import {call, put, takeLatest, fork} from 'redux-saga/effects';
import * as MovieActions from '../actions/movieActions';
import {getMovieApi} from '../api/movie';

function* movies() {
  yield takeLatest(MovieActions.fetchMovie, fetchMovieSaga);
}

function* fetchMovieSaga({payload: {id}}) {
  yield fork(fetchMovie, id);
}

function* fetchMovie(id) {
  yield put(MovieActions.fetchMovie.request(id));
  try {
    const movie = yield call(getMovieApi, id);
    yield put(MovieActions.fetchMovie.success({movie}));
  } catch (error) {
    console.log(error);
    yield put(MovieActions.fetchMovie.failure(error));
  }
}

export default movies;

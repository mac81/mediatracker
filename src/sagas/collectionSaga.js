import {call, put, takeLatest, fork} from 'redux-saga/effects';
import * as CollectionActions from '../actions/collectionActions';
import {
  getUserCollectionApi,
  addMovieToCollectionApi,
  addSeriesToCollectionApi,
  removeSeriesFromCollectionApi,
  addEpisodeApi,
  removeEpisodeApi,
} from '../api/collection';

function* collection() {
  yield takeLatest(CollectionActions.fetchUserCollection, fetchUserCollectionSaga);
  yield takeLatest(CollectionActions.addMovieToCollection, addMovieToCollectionSaga);
  yield takeLatest(CollectionActions.addSeriesToCollection, addSeriesToCollectionSaga);
  yield takeLatest(CollectionActions.removeSeriesFromCollection, removeSeriesFromCollectionSaga);
  // yield takeLatest(CollectionActions.addEpisode, addEpisodeSaga);
  // yield takeLatest(CollectionActions.removeEpisode, removeEpisodeSaga);
}

/***********************
 * FETCH USER COLLECTION
 **********************/

function* fetchUserCollectionSaga() {
  yield fork(fetchUserCollection);
}

function* fetchUserCollection() {
  yield put(CollectionActions.fetchUserCollection.request());
  try {
    const collection = yield call(getUserCollectionApi);
    yield put(CollectionActions.fetchUserCollection.success({collection}));
  } catch (error) {
    console.log(error);
    yield put(CollectionActions.fetchUserCollection.failure(error));
  }
}

/***********************
 * ADD MOVIE
 **********************/

function* addMovieToCollectionSaga({payload: {id, title}}) {
  yield fork(addMovieToCollection, id, title);
}

function* addMovieToCollection(id, title) {
  yield put(CollectionActions.addMovieToCollection.request(id));
  try {
    const movie = yield call(addMovieToCollectionApi, id, title);
    yield put(CollectionActions.addMovieToCollection.success({movie}));
  } catch (error) {
    console.log(error);
    yield put(CollectionActions.addMovieToCollection.failure(error));
  }
}

/***********************
 * ADD SERIES
 **********************/

function* addSeriesToCollectionSaga({payload: {id, name}}) {
  yield fork(addSeriesToCollection, id, name);
}

function* addSeriesToCollection(id, name) {
  yield put(CollectionActions.addSeriesToCollection.request(id));
  try {
    const series = yield call(addSeriesToCollectionApi, id, name);
    yield put(CollectionActions.addSeriesToCollection.success({series}));
  } catch (error) {
    console.log(error);
    yield put(CollectionActions.addSeriesToCollection.failure(error));
  }
}

/***********************
 * REMOVE SERIES
 **********************/

function* removeSeriesFromCollectionSaga({payload: {id}}) {
  yield fork(removeSeriesFromCollection, id);
}

function* removeSeriesFromCollection(id) {
  yield put(CollectionActions.removeSeriesFromCollection.request(id));
  try {
    yield call(removeSeriesFromCollectionApi, id);
    yield put(CollectionActions.removeSeriesFromCollection.success());
  } catch (error) {
    console.log(error);
    yield put(CollectionActions.removeSeriesFromCollection.failure(error));
  }
}

// /***********************
//  * ADD EPISODE
//  **********************/

// function* addEpisodeSaga({payload: {seriesId, episodeId, seasonNumber}}) {
//   yield fork(addEpisode, seriesId, episodeId, seasonNumber);
// }

// function* addEpisode(seriesId, episodeId, seasonNumber) {
//   yield put(CollectionActions.addEpisode.request(episodeId));
//   try {
//     yield call(addEpisodeApi, seriesId, episodeId, seasonNumber);
//     yield put(CollectionActions.addEpisode.success({seriesId, episodeId}));
//   } catch (error) {
//     console.log(error);
//     yield put(CollectionActions.addEpisode.failure(error));
//   }
// }

// /***********************
//  * REMOVE EPISODE
//  **********************/

// function* removeEpisodeSaga({payload: {seriesId, episodeId}}) {
//   yield fork(removeEpisode, seriesId, episodeId);
// }

// function* removeEpisode(seriesId, episodeId) {
//   yield put(CollectionActions.removeEpisode.request(episodeId));
//   try {
//     yield call(removeEpisodeApi, seriesId, episodeId);
//     console.log(seriesId, episodeId);
//     yield put(CollectionActions.removeEpisode.success({seriesId, episodeId}));
//   } catch (error) {
//     console.log(error);
//     yield put(CollectionActions.removeEpisode.failure(error));
//   }
// }

export default collection;

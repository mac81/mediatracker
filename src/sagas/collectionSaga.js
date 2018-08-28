import {call, put, takeLatest, fork} from 'redux-saga/effects';

import * as CollectionActions from '../actions/collectionActions';
import {getUserCollectionApi, addSeriesToCollectionApi, removeSeriesFromCollectionApi} from '../api/collection';

function* search() {
  yield takeLatest(CollectionActions.fetchUserCollection, fetchUserCollectionSaga);
  yield takeLatest(CollectionActions.addSeriesToCollection, addSeriesToCollectionSaga);
  yield takeLatest(CollectionActions.removeSeriesFromCollection, removeSeriesFromCollectionSaga);
}

function* fetchUserCollectionSaga() {
  yield fork(fetchUserCollection);
}

function* addSeriesToCollectionSaga({payload: {id, name}}) {
  yield fork(addSeriesToCollection, id, name);
}

function* removeSeriesFromCollectionSaga({payload: {id}}) {
  yield fork(removeSeriesFromCollection, id);
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

export default search;
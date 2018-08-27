import {call, put, takeLatest, fork} from 'redux-saga/effects';

import * as CollectionActions from '../actions/collectionActions';
import {getUserCollectionApi} from '../api/collection';

function* search() {
  yield takeLatest(CollectionActions.fetchUserCollection, fetchUserCollectionSaga);
}

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

export default search;

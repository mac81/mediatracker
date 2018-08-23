import {call, put, takeLatest, fork} from 'redux-saga/effects';

import * as SearchActions from '../actions/searchActions';
import {getSearchResultApi} from '../api/search';

function* search() {
  yield takeLatest(SearchActions.search, loadSearchResultSaga);
}

function* loadSearchResultSaga({payload: {query}}) {
  yield fork(loadSearchResult, query);
}

function* loadSearchResult(query) {
  yield put(SearchActions.search.request(query));
  try {
    const searchResult = yield call(getSearchResultApi, query);
    yield put(SearchActions.search.success({searchResult}));
  } catch (error) {
    console.log(error);
    yield put(SearchActions.search.failure(error));
  }
}

export default search;

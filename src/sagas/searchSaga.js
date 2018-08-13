import { delay } from 'redux-saga';
import { call, put, take, takeLatest, takeEvery, select, fork } from 'redux-saga/effects';
import { SELECTORS } from '../reducers';
import * as types from '../actionTypes/actionTypes';
import * as SearchActions from '../actions/searchActions';
import { getSearchResultApi } from '../api/search';
// import * as NavigationActions from '../actions/NavigationActions';
// import {loadTemplate, loadTemplateQuestions} from './templates';
// import {stdLib} from '../utils/widgetProps';

function* search() {
  yield takeLatest(types.LOAD_SEARCH_RESULT, loadSearchResultSaga);
}

function* loadSearchResultSaga({ payload: { query } }) {
  yield fork(loadSearchResult, query);
}

function* loadSearchResult(query) {
  yield put(SearchActions.loadSearchResultRequest(query));
  try {
    const searchResult = yield call(getSearchResultApi, query);
    yield put(SearchActions.loadSearchResultSuccess(searchResult));
  } catch (error) {
    console.log(error);
    yield put(SearchActions.loadSearchResultFailure(error));
  }
}

export default search;
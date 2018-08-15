import {call, put, take, takeLatest, takeEvery, select, fork} from 'redux-saga/effects';
import * as types from '../actionTypes/actionTypes';
import * as UserActions from '../actions/userActions';
import {userLoginApi} from '../api/user';

const netlifyIdentity = require('netlify-identity-widget');

function* user() {
  yield takeLatest(types.USER_LOGIN, userLoginSaga);
  yield takeLatest(types.USER_SIGNUP, userSignupSaga);
}

function* userSignupSaga() {
  netlifyIdentity.open('signup');
}

function* userLoginSaga({payload: {username, password}}) {
  yield fork(userLogin, username, password);
}

function* userLogin(username, password) {
  yield put(UserActions.userLoginRequest());
  try {
    const user = yield call(userLoginApi, username, password);
    sessionStorage.setItem('token', user.token);
    yield put(UserActions.userLoginSuccess(user));
  } catch (error) {
    console.log(error);
    yield put(UserActions.userLoginFailure(error));
  }
}

export default user;

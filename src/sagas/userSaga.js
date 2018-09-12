import {takeLatest} from 'redux-saga/effects';
import * as UserActions from '../actions/userActions';

const netlifyIdentity = require('netlify-identity-widget');

function* user() {
  yield takeLatest(UserActions.login, userLoginSaga);
  yield takeLatest(UserActions.logout, userLogoutSaga);
  yield takeLatest(UserActions.signup, userSignupSaga);
}

function* userLoginSaga() {
  yield netlifyIdentity.open('login');
}

function* userLogoutSaga() {
  netlifyIdentity.logout();
}

function* userSignupSaga() {
  yield netlifyIdentity.open('signup');
}

export default user;

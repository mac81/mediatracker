import * as types from '../actionTypes/actionTypes';

export const setUser = user => ({
  type: types.SET_USER,
  payload: {user},
});

/**********
## LOGIN ##
**********/

export const userLogin = (username, password) => ({
  type: types.USER_LOGIN,
  payload: {username, password},
});

export const userLoginRequest = () => ({
  type: types.USER_LOGIN_REQUEST,
});

export const userLoginSuccess = user => ({
  type: types.USER_LOGIN_SUCCESS,
  payload: {user},
});

export const userLoginFailure = error => ({
  type: types.USER_LOGIN_FAILURE,
  payload: {error},
});

export const userSignup = () => ({
  type: types.USER_SIGNUP,
});

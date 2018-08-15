import createReducer from '../utils/createReducer';
import * as types from '../actionTypes/actionTypes';
import arrayToObject from '../utils/arrayToObject';

const initialState = {};

export default createReducer(initialState, {
  [types.SET_USER]: (state, {payload: {user}}) => ({
    ...state,
    user,
  }),
});

export const SELECTORS = {
  getUser: state => state.user,
};

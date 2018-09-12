import createReducer from '../utils/createReducer';
import * as UserActions from '../actions/userActions';

const initialState = {};

export default createReducer(initialState, {
  [UserActions.setUser]: (state, {payload: {user}}) => ({
    ...state,
    user,
  }),
  [UserActions.logout]: state => ({
    ...state,
    user: null,
  }),
});

export const SELECTORS = {
  getUser: state => state.user,
};

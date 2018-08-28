import createReducer from '../utils/createReducer';
import * as CollectionActions from '../actions/collectionActions';

const initialState = {
  series: [],
  movies: [],
};

export default createReducer(initialState, {
  [CollectionActions.fetchUserCollection.success]: (state, {payload: {collection}}) => ({
    ...state,
    series: [...collection.series],
  }),
});

export const SELECTORS = {
  getUserCollection: state => state,
  getIsSeriesInCollection: (state, id) => state.series && state.series.find(series => series.id === id),
};

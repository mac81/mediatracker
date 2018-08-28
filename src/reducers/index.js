import {combineReducers} from 'redux';
import search, {SELECTORS as SEARCH_SELECTORS} from './search';
import movie, {SELECTORS as MOVIE_SELECTORS} from './movie';
import series, {SELECTORS as SERIES_SELECTORS} from './series';
import user, {SELECTORS as USER_SELECTORS} from './user';
import collection, {SELECTORS as COLLECTION_SELECTORS} from './collection';

const rootReducer = combineReducers({
  search,
  movie,
  series,
  user,
  collection,
});

const bindSelectors = (stateSelector, selectors) => {
  const boundSelectors = {};
  Object.keys(selectors).forEach(key => {
    const selector = selectors[key];
    boundSelectors[key] = (state, ...rest) => selector(stateSelector(state), ...rest);
  });
  return boundSelectors;
};

export const SELECTORS = {
  SEARCH: bindSelectors(state => state.search, SEARCH_SELECTORS),
  MOVIE: bindSelectors(state => state.movie, MOVIE_SELECTORS),
  SERIES: bindSelectors(state => state.series, SERIES_SELECTORS),
  USER: bindSelectors(state => state.user, USER_SELECTORS),
  COLLECTION: bindSelectors(state => state.collection, COLLECTION_SELECTORS),
};

export default rootReducer;

import {combineReducers} from 'redux';
import search, {SELECTORS as SEARCH_SELECTORS} from './search';
import movieDetails, {SELECTORS as MOVIE_DETAILS_SELECTORS} from './movieDetails';
import series, {SELECTORS as SERIES_SELECTORS} from './series';

const rootReducer = combineReducers({
  search,
  movieDetails,
  series,
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
  MOVIE_DETAILS: bindSelectors(state => state.movieDetails, MOVIE_DETAILS_SELECTORS),
  SERIES: bindSelectors(state => state.series, SERIES_SELECTORS),
};

export default rootReducer;

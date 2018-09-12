import createReducer from '../utils/createReducer';
import * as SeriesActions from '../actions/seriesActions';
import * as CollectionActions from '../actions/collectionActions';

const initialState = {};

function updateObjectInArray(array, action) {
  return array.map((item, index) => {
    if (index !== action.index) {
      // This isn't the item we care about - keep it as-is
      return item;
    }

    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      ...action.item,
    };
  });
}

export default createReducer(initialState, {
  [SeriesActions.fetchSeries.request]: state => ({
    ...state,
    isLoading: true,
  }),
  [SeriesActions.fetchSeries.success]: (state, {payload: {series, palette}}) => ({
    ...state,
    isLoading: false,
    details: series.details,
    palette,
  }),
  [SeriesActions.fetchSeason.request]: state => ({
    ...state,
    isLoading: true,
  }),
  [SeriesActions.fetchSeason.success]: (state, {payload: {season}}) => ({
    ...state,
    isLoading: false,
    season,
  }),
  [SeriesActions.fetchSeriesWithLatestSeason.success]: (state, {payload: {series, palette, season}}) => ({
    ...state,
    isLoading: false,
    details: series.details,
    palette,
    season,
  }),
  [CollectionActions.addSeriesToCollection.success]: state => ({
    ...state,
    details: {
      ...state.details,
      isInCollection: true,
    },
  }),
  [CollectionActions.removeSeriesFromCollection.success]: state => ({
    ...state,
    details: {
      ...state.details,
      isInCollection: false,
    },
  }),
  [SeriesActions.addEpisode.success]: (state, {payload: {seriesId, episodeId}}) => {
    const index = state.season.episodes.findIndex(episode => episodeId === episode.id);
    return {
      ...state,
      season: {
        ...state.season,
        episodes: updateObjectInArray(state.season.episodes, {index, item: {watched: true}}),
      },
    };
  },
  [SeriesActions.removeEpisode.success]: (state, {payload: {seriesId, episodeId}}) => {
    const index = state.season.episodes.findIndex(episode => episodeId === episode.id);
    return {
      ...state,
      season: {
        ...state.season,
        episodes: updateObjectInArray(state.season.episodes, {index, item: {watched: false}}),
      },
    };
  },
});

export const SELECTORS = {
  getSeriesDetails: state => state.details,
  getSeason: state => state.season,
  getPalette: state => state.palette,
  getIsLoading: state => state.isLoading,
};

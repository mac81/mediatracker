import createReducer from '../utils/createReducer';
import * as CollectionActions from '../actions/collectionActions';
import update from 'immutability-helper';

const initialState = {
  series: [],
  movies: [],
};

export default createReducer(initialState, {
  [CollectionActions.fetchUserCollection.success]: (state, {payload: {collection}}) => ({
    ...state,
    ...collection,
  }),
  [CollectionActions.addEpisode.success]: (state, {payload: {seriesId, episodeId}}) => {
    const index = state.series.findIndex(series => series.id === seriesId);

    const updatedSeries = update(state.series, {
      [index]: index =>
        update(index, {
          episodes: episodes => update(episodes || [], {$push: [episodeId]}),
        }),
    });

    return {
      ...state,
      series: updatedSeries,
    };
  },
  [CollectionActions.removeEpisode.success]: (state, {payload: {seriesId, episodeId}}) => {
    const seriesIndex = state.series.findIndex(series => series.id === seriesId);
    const episodeIndex = state.series[seriesIndex].episodes.findIndex(episode => episode === episodeId);

    const updatedSeries = update(state.series, {
      [seriesIndex]: series =>
        update(series, {
          episodes: episodes => update(episodes, {$splice: [[episodeIndex, 1]]}),
        }),
    });

    return {
      ...state,
      series: updatedSeries,
    };
  },
});

export const SELECTORS = {
  getUserCollection: state => state,
  getIsSeriesInCollection: (state, id) => state.series && state.series.find(series => series.id === id),
};

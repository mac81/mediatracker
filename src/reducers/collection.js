import createReducer from '../utils/createReducer';
import * as CollectionActions from '../actions/collectionActions';
import update from 'immutability-helper';

const initialState = {
  series: [],
  movies: [],
  episodes: [],
};

export default createReducer(initialState, {
  [CollectionActions.fetchUserCollection.success]: (state, {payload: {collection}}) => ({
    ...state,
    ...collection,
  }),
  // [CollectionActions.addEpisode.success]: (state, {payload: {seriesId, episodeId}}) => {
  //   // const index = state.series.findIndex(series => series.id === seriesId);

  //   // const updatedSeries = update(state.series, {
  //   //   [index]: index =>
  //   //     update(index, {
  //   //       watched_episodes: episodes => update(episodes || [], {$push: [episodeId]}),
  //   //     }),
  //   // });

  //   return {
  //     ...state,
  //     episodes: [
  //       ...state.episodes,
  //       {
  //         id: episodeId,
  //         series_id: seriesId,
  //       },
  //     ],
  //   };
  // },
  // [CollectionActions.removeEpisode.success]: (state, {payload: {seriesId, episodeId}}) => {
  //   const seriesIndex = state.series.findIndex(series => series.id === seriesId);
  //   const episodeIndex = state.series[seriesIndex].watched_episodes.findIndex(episode => episode === episodeId);

  //   const updatedSeries = update(state.series, {
  //     [seriesIndex]: series =>
  //       update(series, {
  //         watched_episodes: episodes => update(episodes, {$splice: [[episodeIndex, 1]]}),
  //       }),
  //   });

  //   return {
  //     ...state,
  //     series: updatedSeries,
  //   };
  // },
});

export const SELECTORS = {
  getUserCollection: state => state,
  getIsSeriesInCollection: (state, id) => state.series && state.series.find(series => series.id === id),
};

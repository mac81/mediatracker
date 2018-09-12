import {put, takeLatest, fork} from 'redux-saga/effects';
import * as NavigationActions from '../actions/navigationActions';
import {matchPath} from 'react-router-dom';
import * as SeriesActions from '../actions/seriesActions';
import * as MovieActions from '../actions/movieActions';
import * as CollectionActions from '../actions/collectionActions';

function* navigation() {
  yield takeLatest(NavigationActions.locationChange, routeChangeSaga);
}

function* routeChange(pathname) {
  const seriesMatch = matchPath(pathname, {
    path: `/tv/:id`,
    exact: true,
  });
  if (seriesMatch) {
    yield put(SeriesActions.fetchSeries({id: seriesMatch.params.id}));
    return;
  }

  const seasonMatch = matchPath(pathname, {
    path: `/tv/:id/season/:seasonNumber`,
  });
  if (seasonMatch) {
    yield put(SeriesActions.fetchSeries({id: seasonMatch.params.id}));
    yield put(SeriesActions.fetchSeason({id: seasonMatch.params.id, seasonNumber: seasonMatch.params.seasonNumber}));
    return;
  }

  const movieMatch = matchPath(pathname, {
    path: `/movie/:id`,
  });
  if (movieMatch) {
    yield put(MovieActions.fetchMovie({id: movieMatch.params.id}));
    return;
  }

  const collectionMatch = matchPath(pathname, {
    path: `/collection`,
    exact: true,
  });
  if (collectionMatch) {
    yield put(CollectionActions.fetchUserCollection());
    return;
  }

  const collectionSeriesMatch = matchPath(pathname, {
    path: `/collection/:id`,
    exact: true,
  });
  if (collectionSeriesMatch) {
    //yield put(CollectionActions.fetchUserCollection());
    yield put(SeriesActions.fetchSeriesWithLatestSeason({id: collectionSeriesMatch.params.id}));
    return;
  }

  const collectionSeasonMatch = matchPath(pathname, {
    path: `/collection/:id/season/:seasonNumber`,
    exact: true,
  });
  if (collectionSeasonMatch) {
    yield put(CollectionActions.fetchUserCollection());
    yield put(SeriesActions.fetchSeries({id: collectionSeasonMatch.params.id}));
    yield put(
      SeriesActions.fetchSeason({
        id: collectionSeasonMatch.params.id,
        seasonNumber: collectionSeasonMatch.params.seasonNumber,
      })
    );
    return;
  }
}

function* routeChangeSaga({
  payload: {
    location: {pathname},
  },
}) {
  yield fork(routeChange, pathname);
}

export default navigation;

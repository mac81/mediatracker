import {put, takeLatest, fork} from 'redux-saga/effects';
import * as types from '../actionTypes/actionTypes';
import {matchPath} from 'react-router-dom';
import * as seriesActions from '../actions/seriesActions';
import * as movieActions from '../actions/movieActions';
import * as CollectionActions from '../actions/collectionActions';

function* navigation() {
  yield takeLatest([types.APP_INIT, types.LOCATION_CHANGE], routeChangeSaga);
}

function* routeChange(pathname) {
  const seasonMatch = matchPath(pathname, {
    path: `/tv/:id/season/:seasonNumber`,
  });
  if (seasonMatch) {
    yield put(seriesActions.loadSeriesDetails(seasonMatch.params.id));
    yield put(seriesActions.loadSeason(seasonMatch.params.id, seasonMatch.params.seasonNumber));
    return;
  }

  const tvDetailsMatch = matchPath(pathname, {
    path: `/tv/:id`,
  });
  if (tvDetailsMatch) {
    yield put(seriesActions.loadSeriesDetails(tvDetailsMatch.params.id));
    return;
  }

  const allUserSeriesMatch = matchPath(pathname, {
    path: `/collection/series`,
    exact: true,
  });
  if (allUserSeriesMatch) {
    yield put(seriesActions.loadUserSeries());
    return;
  }

  const userSeriesMatch = matchPath(pathname, {
    path: `/collection/series/:id`,
    exact: true,
  });
  if (userSeriesMatch) {
    yield put(seriesActions.loadSeriesDetails(userSeriesMatch.params.id));
    yield put(seriesActions.loadSeason(userSeriesMatch.params.id, 1));
    return;
  }

  const collectionSeasonMatch = matchPath(pathname, {
    path: `/collection/series/:id/season/:seasonId`,
  });
  if (collectionSeasonMatch) {
    yield put(seriesActions.loadSeriesDetails(collectionSeasonMatch.params.id));
    yield put(
      seriesActions.loadSeasonCollection(collectionSeasonMatch.params.id, collectionSeasonMatch.params.seasonId)
    );
    return;
  }

  const MovieDetailsMatch = matchPath(pathname, {
    path: `/movie/:id`,
  });
  if (MovieDetailsMatch) {
    yield put(movieActions.loadMovieDetails(MovieDetailsMatch.params.id));
    return;
  }

  const collectionMatch = matchPath(pathname, {
    path: `/collection`,
  });
  if (collectionMatch) {
    yield put(CollectionActions.fetchUserCollection());
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

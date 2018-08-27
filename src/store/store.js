import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createBrowserHistory} from 'history';
import {connectRouter, routerMiddleware as createRouterMiddleware} from 'connected-react-router';

import rootReducer from '../reducers';
import search from '../sagas/searchSaga';
import movies from '../sagas/moviesSaga';
import series from '../sagas/seriesSaga';
import user from '../sagas/userSaga';
import navigation from '../sagas/navigationSaga';
import collection from '../sagas/collectionSaga';

const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
//const routerMiddleware = createRouterMiddleware(history);

const store = createStore(
  connectRouter(history)(rootReducer),
  undefined,
  composeWithDevTools(applyMiddleware(createRouterMiddleware(history), sagaMiddleware))
);

sagaMiddleware.run(navigation);
sagaMiddleware.run(search);
sagaMiddleware.run(movies);
sagaMiddleware.run(series);
sagaMiddleware.run(user);
sagaMiddleware.run(collection);

export {store, history};

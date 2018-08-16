import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {store, history} from './store/store';
import logo from './logo.svg';
import './App.css';
import SearchResult from './components/SearchResult';
import MovieDetails from './components/MovieDetails';
import Header from './components/Header';

import {Login, AllSeriesCollection, SeriesCollection, SeriesOverview, Season} from './pages';
import {ThemeProvider} from 'styled-components';
import {theme} from './styles/theme';
import {APP_INIT, SET_USER} from './actionTypes/actionTypes';
import {ConnectedRouter} from 'connected-react-router';

const netlifyIdentity = require('netlify-identity-widget');

netlifyIdentity.on('init', user => store.dispatch({type: SET_USER, payload: {user}}));

netlifyIdentity.init({
  container: '#identity', // defaults to document.body,
  APIUrl: 'http://www.websirius.com/.netlify/identity',
});

function createTodo(data) {
  return netlifyIdentity
    .currentUser()
    .jwt()
    .then(token => {
      return fetch('/.netlify/functions/add-series-to-watchlist', {
        body: JSON.stringify(data),
        headers: {Authorization: `Bearer ${token}`},
        method: 'POST',
      }).then(response => {
        return response.json();
      });
    });
}

// Todo data
const myTodo = {
  title: 'My todo title',
  completed: false,
};

// create it!
if (netlifyIdentity.currentUser()) {
  createTodo(myTodo)
    .then(response => {
      console.log('API response', response);
      // set app state
    })
    .catch(error => {
      console.log('API error', error);
    });
}

class App extends Component {
  constructor(...args) {
    super(...args);
    store.dispatch({type: APP_INIT, payload: {location: history.location}});
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ThemeProvider theme={theme}>
            <div className="app">
              <div>
                <Header />
                <SearchResult />
                <Switch>
                  <Route exact path={`/`} render={() => <div>Homepage</div>} />
                  <Route exact path={`/login`} component={Login} />
                  <Route path={`/movie/:id`} component={MovieDetails} />
                  <Route exact path={`/tv/:id`} component={SeriesOverview} />
                  <Route path={`/tv/:id/season/:seasonNumber`} component={Season} />
                  <Route exact path={`/collection/series`} component={AllSeriesCollection} />
                  <Route path={`/collection/series/:id`} component={SeriesCollection} />
                </Switch>
              </div>
            </div>
          </ThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;

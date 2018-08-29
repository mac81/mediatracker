import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {store, history} from './store/store';
import {setUser} from './actions/userActions';
import logo from './logo.svg';
import './App.css';
import Search from './components/Search';
import Header from './components/Header';

import {Collection, CollectionSeries, SeriesOverview, Season, Movie} from './pages';
import {ThemeProvider} from 'styled-components';
import {theme} from './styles/theme';
import {APP_INIT, SET_USER} from './actionTypes/actionTypes';
import {ConnectedRouter} from 'connected-react-router';

const netlifyIdentity = require('netlify-identity-widget');

netlifyIdentity.on('init', user => store.dispatch(setUser({user})));

netlifyIdentity.init({
  container: '#identity', // defaults to document.body,
  APIUrl: 'http://www.websirius.com/.netlify/identity',
});

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
                <Search />
                <Switch>
                  <Route exact path={`/`} render={() => <div>Homepage</div>} />
                  <Route path={`/movie/:id`} component={Movie} />
                  <Route exact path={`/tv/:id`} component={SeriesOverview} />
                  <Route path={`/tv/:id/season/:seasonNumber`} component={Season} />
                  <Route exact path={`/collection`} component={Collection} />
                  <Route path={`/collection/:id`} component={CollectionSeries} />
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

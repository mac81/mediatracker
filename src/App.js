import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Route, Switch, Link} from 'react-router-dom';
import {store, history} from './store/store';
import logo from './logo.svg';
import './App.css';
import SearchResult from './components/SearchResult';
import MovieDetails from './components/MovieDetails';
import TvDetails from './components/TvDetails';
import Season from './components/Season';
import {Login, AllSeriesCollection, SeriesCollection} from './pages';
import {ThemeProvider} from 'styled-components';
import {theme} from './styles/theme';
import {APP_INIT} from './actionTypes/actionTypes';
import {ConnectedRouter} from 'connected-react-router';

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
                <div>
                  <Link to="/user/series">My Collection</Link>
                </div>
                <SearchResult />
                <Switch>
                  <Route exact path={`/`} render={() => <div>Homepage</div>} />
                  <Route exact path={`/login`} component={Login} />
                  <Route path={`/movie/:id`} component={MovieDetails} />
                  <Route exact path={`/tv/:id`} component={TvDetails} />
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

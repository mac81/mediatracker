import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {store, history} from './store/store';
import {setUser, logout} from './actions/userActions';
import './App.css';
import Search from './components/Search';
import Header from './components/Header';

import {Collection, CollectionSeries, SeriesOverview, Season, Movie} from './pages';
import {ThemeProvider} from 'styled-components';
import {theme} from './styles/theme';
import {ConnectedRouter} from 'connected-react-router';

const netlifyIdentity = require('netlify-identity-widget');

netlifyIdentity.on('init', user => store.dispatch(setUser({user})));
netlifyIdentity.on('login', user => {
  store.dispatch(setUser({user}));
  netlifyIdentity.close();
});
netlifyIdentity.on('logout', () => {
  store.dispatch(logout());
});

netlifyIdentity.init({
  container: '#identity', // defaults to document.body,
  APIUrl: 'http://www.websirius.com/.netlify/identity',
});

const PrivateRoute = ({component: Component, ...rest}) => {
  const user = netlifyIdentity.currentUser();
  return <Route {...rest} render={props => (user ? <Component {...props} /> : <div>No access</div>)} />;
};
class App extends Component {
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
                  <PrivateRoute exact path={`/collection`} component={Collection} />
                  <PrivateRoute path={`/collection/:id`} component={CollectionSeries} />
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

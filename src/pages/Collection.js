import React from 'react';
import {connect} from 'react-redux';

import {SELECTORS} from '../reducers';

import {Page} from './';
import MySeries from '../components/MySeries';
import Loader from '../components/Loader';
import Statistics from '../components/Statistics';

class Collection extends React.Component {
  render() {
    const {userCollection} = this.props;

    if (!userCollection) return <Loader />;

    return (
      <Page key="collection">
        <MySeries series={userCollection.series} />
        <ul>{userCollection.movies && userCollection.movies.map(movie => <li>{movie.title}</li>)}</ul>
        <Statistics />
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  userCollection: SELECTORS.COLLECTION.getUserCollection(state),
});

export default connect(
  mapStateToProps,
  undefined
)(Collection);

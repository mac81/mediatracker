import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {SELECTORS} from '../reducers';
import styled from 'styled-components';
import {font, color} from '../styles/typography';
import {Link} from 'react-router-dom';

import {Page} from './';

const StyledCollection = styled.div``;

class Collection extends React.Component {
  render() {
    const {userCollection} = this.props;

    return (
      <Page key="collection">
        <ul>
          {userCollection.series &&
            userCollection.series.map(series => (
              <li>
                {series.episode_count}
                <Link to={`collection/${series.id}`}>{series.name}</Link>
              </li>
            ))}
        </ul>
        <ul>{userCollection.movies && userCollection.movies.map(movie => <li>{movie.title}</li>)}</ul>
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

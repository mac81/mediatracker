import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {SELECTORS} from '../reducers';
import styled from 'styled-components';
import {font, color} from '../styles/typography';
import {Link} from 'react-router-dom';

const StyledCollectionSeries = styled.div``;

class CollectionSeries extends React.Component {
  render() {
    const {season} = this.props;

    if (!season) return null;

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {season.episodes.map(episode => (
            <tr>
              <td>{episode.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => ({
  userCollection: SELECTORS.COLLECTION.getUserCollection(state),
  season: SELECTORS.SERIES.getSeason(state),
});

export default connect(
  mapStateToProps,
  undefined
)(CollectionSeries);

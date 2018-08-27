import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {SELECTORS} from '../reducers';
import styled from 'styled-components';
import {font, color} from '../styles/typography';
import {Link} from 'react-router-dom';

const StyledUserCollection = styled.div``;

class UserCollection extends React.Component {
  render() {
    const {userCollection} = this.props;

    return (
      <ul>
        {userCollection.series &&
          userCollection.series.map(series => (
            <li>
              <Link to={`tv/${series.id}`}>{series.name}</Link>
            </li>
          ))}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  userCollection: SELECTORS.COLLECTION.getUserCollection(state),
});

export default connect(
  mapStateToProps,
  undefined
)(UserCollection);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled from 'styled-components';
import {SELECTORS} from '../reducers';
import * as userActions from '../actions/userActions';
import {font} from '../styles/typography';
import {Link} from 'react-router-dom';

const StyledStatistics = styled.div``;

function minutesToString(minutes) {
  var value = minutes;

  var units = {
    day: 24 * 60 * 1,
    hour: 1 * 60,
    minute: 1,
  };

  var result = [];

  for (var name in units) {
    var p = Math.floor(value / units[name]);
    if (p == 1) result.push(' ' + p + ' ' + name);
    if (p >= 2) result.push(' ' + p + ' ' + name + 's');
    value %= units[name];
  }

  return result;
}

class Statistics extends Component {
  render() {
    const {
      userCollection: {series},
    } = this.props;

    const totalViewTime = series.reduce((accumulator, currentSeries) => {
      const viewedMinutes = currentSeries.watched_episodes_count * currentSeries.episode_run_time[0];
      return accumulator + viewedMinutes;
    }, 0);

    return (
      <StyledStatistics>
        <h2>Stats:</h2>
        <p>Total view time: {minutesToString(totalViewTime)}</p>
      </StyledStatistics>
    );
  }
}

const mapStateToProps = state => ({
  userCollection: SELECTORS.COLLECTION.getUserCollection(state),
});

export default connect(mapStateToProps)(Statistics);

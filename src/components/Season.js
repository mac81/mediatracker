import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SELECTORS} from '../reducers';
import {loadSeason} from '../actions/seriesActions';
import styled from 'styled-components';
import {font, color} from '../styles/typography';
import EpisodeList from './EpisodeList';

class Season extends React.Component {
  render() {
    const {season} = this.props;

    if (!season) return null;

    return (
      <div>
        {season.name}
        <EpisodeList episodes={season.episodes} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  season: SELECTORS.SERIES.getSeason(state),
  isLoading: SELECTORS.SERIES.getIsLoading(state),
});

const mapDispatchToProps = dispatch => ({
  loadSeason: bindActionCreators(loadSeason, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Season);

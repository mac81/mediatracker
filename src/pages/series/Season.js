import React from 'react';
import {connect} from 'react-redux';
import {SELECTORS} from '../../reducers';
import EpisodeList from '../../components/EpisodeList';

class Season extends React.Component {
  render() {
    const {details, season} = this.props;
    if (!season || !details) return null;

    return (
      <div>
        {details.name}
        {season.name}
        <EpisodeList episodes={season.episodes} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  details: SELECTORS.SERIES.getSeriesDetails(state),
  season: SELECTORS.SERIES.getSeason(state),
  isLoading: SELECTORS.SERIES.getIsLoading(state),
});

export default connect(
  mapStateToProps,
  undefined
)(Season);

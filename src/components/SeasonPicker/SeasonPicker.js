import React from 'react';
import {connect} from 'react-redux';
import {SELECTORS} from '../../reducers';

import StyledSeasonPicker from './StyledSeasonPicker';
import {Link} from 'react-router-dom';

class SeasonPicker extends React.Component {
  render() {
    const {series} = this.props;

    if (!series) return null;

    return (
      <StyledSeasonPicker>
        <ul>
          {series.seasons.map(s => (
            <li key={s.id}>
              <Link to={`/collection/${series.id}/season/${s.season_number}`}>{s.season_number}</Link>
            </li>
          ))}
        </ul>
      </StyledSeasonPicker>
    );
  }
}

const mapStateToProps = state => ({
  series: SELECTORS.SERIES.getSeriesDetails(state),
});

export default connect(mapStateToProps)(SeasonPicker);

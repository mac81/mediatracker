import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';

import {SELECTORS} from '../reducers';
import {loadSeriesDetails} from '../actions/seriesActions';
import styled from 'styled-components';
import {font, color} from '../styles/typography';

const Details = styled.div`
  display: flex;

  .sidebar {
    width: 33.33%;
    position: relative;
    top: -430px;
  }

  .sidebar-content {
  }

  .sidebar-header {
    ${font('title')};
  }

  .content {
    padding: 50px;
    width: 66.66%;
  }

  .content-header {
    ${font('headline')};
  }

  img {
    max-width: 100%;
  }
`;

class AllSeriesCollection extends React.Component {
  render() {
    const {isLoading, series} = this.props;

    if (isLoading) {
      return <div>Loading</div>;
    }

    if (!series) return null;

    return (
      <div>
        {Object.values(series).map(series => (
          <div key={series.id}>
            <Link to={`/user/series/${series.id}`}>{series.name}</Link>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  series: SELECTORS.SERIES.getAllSeriesCollection(state),
  isLoading: SELECTORS.SERIES.getIsLoading(state),
});

const mapDispatchToProps = dispatch => ({
  loadSeriesDetails: bindActionCreators(loadSeriesDetails, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllSeriesCollection);

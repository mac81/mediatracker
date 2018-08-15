import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SELECTORS} from '../../reducers';
import {loadSeriesDetails} from '../../actions/seriesActions';
import styled from 'styled-components';
import {font, color} from '../../styles/typography';
import Seasons from '../../components/Seasons';
import Hero from '../../components/Hero';
import Loader from '../../components/Loader';
import Facts from '../../components/Facts';

import posed, {PoseGroup} from 'react-pose';

const StyledOverview = styled.div`
  display: flex;

  .sidebar {
    width: 33.33%;
    position: relative;
  }

  .sidebar-content {
  }

  .sidebar-header {
    ${font('title')};
  }

  .content {
    padding: 0 50px;
    width: 66.66%;
    margin-top: -54px;
  }

  img {
    max-width: 100%;
  }
`;

const Page = posed.div({
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
});

class Overview extends React.Component {
  render() {
    const {isLoading, details} = this.props;

    if (isLoading) {
      return <Loader />;
    }

    if (!details) return null;

    return (
      <PoseGroup animateOnMount>
        <Page className="page" key="overview">
          <Hero />
          <div className="container">
            <StyledOverview>
              <div className="sidebar">
                <Facts details={details} />
              </div>
              <div className="content">
                <Seasons seasons={details.seasons} />
              </div>
            </StyledOverview>
          </div>
        </Page>
      </PoseGroup>
    );
  }
}

const mapStateToProps = state => ({
  details: SELECTORS.SERIES.getSeriesDetails(state),
  isLoading: SELECTORS.SERIES.getIsLoading(state),
});

const mapDispatchToProps = dispatch => ({
  loadTvDetails: bindActionCreators(loadSeriesDetails, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Overview);

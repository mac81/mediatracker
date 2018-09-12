import React from 'react';
import {connect} from 'react-redux';
import {SELECTORS} from '../../reducers';
import styled from 'styled-components';
import {font} from '../../styles/typography';
import Seasons from '../../components/Seasons';
import Hero from '../../components/Hero';
import Facts from '../../components/Facts';
import Loader from '../../components/Loader';

import {Page} from '../';

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
class Overview extends React.Component {
  render() {
    const {isLoading, details} = this.props;

    if (isLoading) {
      return <Loader />;
    }

    if (!details) return null;

    return (
      <Page key="series">
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
    );
  }
}

const mapStateToProps = state => ({
  isLoading: SELECTORS.SERIES.getIsLoading(state),
  details: SELECTORS.SERIES.getSeriesDetails(state),
});

export default connect(
  mapStateToProps,
  undefined
)(Overview);

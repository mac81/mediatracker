import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SELECTORS} from '../reducers';
import {loadSeriesDetails} from '../actions/seriesActions';
import styled from 'styled-components';
import {font, color} from '../styles/typography';
import SeasonCard from './SeasonCard';
import Hero from './Hero';

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

class TvDetails extends React.Component {
  // constructor(...args) {
  //   super(...args);

  //   this.props.loadTvDetails(this.props.match.params.id);
  // }

  // componentWillUpdate(nextProps, nextState) {
  //   if (nextProps.match.params.id !== this.props.match.params.id) {
  //     this.props.loadTvDetails(nextProps.match.params.id);
  //   }
  // }

  render() {
    const {isLoading, details} = this.props;

    if (isLoading) {
      return <div>Loading</div>;
    }

    if (!details) return null;

    //const releaseYear = new Date(details.first_air_date).getFullYear();

    return (
      <div>
        <Hero />
        <div className="container">
          <Details>
            <div className="sidebar">
              <img src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`} />
              <div className="sidebar-content">
                <h3 className="sidebar-header">Facts</h3>
                <h4>Status</h4>
                <span>{details.status}</span>
                <h4>Network</h4>
                {details.networks.map(network => <span>{network.name}</span>)}
                <h4>Type</h4>
                <span>{details.type}</span>
              </div>
            </div>
            <div className="content">
              <h3 className="content-header">Seasons ({details.seasons.length})</h3>
              {details.seasons.map(season => <SeasonCard season={season} match={this.props.match} />)}
            </div>
          </Details>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TvDetails);

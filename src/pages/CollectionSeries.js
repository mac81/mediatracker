import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {SELECTORS} from '../reducers';
import styled from 'styled-components';
import {font} from '../styles/typography';
import {Link} from 'react-router-dom';
import * as SeriesActions from '../actions/seriesActions';
import {Page} from './';
import Overview from './series/Overview';
import Loader from '../components/Loader';
import SeasonPicker from '../components/SeasonPicker/SeasonPicker';

const StyledCollectionSeries = styled.div`
  .hero {
    position: relative;
    height: 190px;
    margin-bottom: 30px;

    .background-image {
      position: absolute;
      background: url(${props => props.image});
      background-size: cover;
      height: 130px;
      width: 100%;
    }
    .hero-overlay {
      position: absolute;
      height: 100%;
      width: 100%;
      background-image: radial-gradient(
        circle at 20% 50%,
        rgba(
            ${props => props.palette && props.palette.DarkVibrant._rgb[0]},
            ${props => props.palette && props.palette.DarkVibrant._rgb[1]},
            ${props => props.palette && props.palette.DarkVibrant._rgb[2]},
            0.94
          )
          0%,
        rgba(
            ${props => props.palette && Math.round(props.palette.DarkMuted._rgb[0])},
            ${props => props.palette && Math.round(props.palette.DarkMuted._rgb[1])},
            ${props => props.palette && Math.round(props.palette.DarkMuted._rgb[2])},
            0.94
          )
          100%
      );
    }
    .hero-content {
      position: relative;
      margin: 0 auto;
      width: 1280px;
      height: 130px;
      display: flex;
      align-items: center;
    }

    h2 {
      ${font('display1')};
      color: rgba(255, 255, 255, 0.6);
    }
  }

  span {
    ${font('body1')};
    display: block;
  }
  .small {
    ${font('small')};
    color: #979797;
  }

  .overview {
    ${font('small')};
    color: #6e6e6e;
  }

  .grid-wrapper {
    max-width: 1280px;
    margin: 0 auto;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .grid-header {
    background-image: linear-gradient(to right bottom, #041c2c, #10283a, #1c3548, #294357, #355166);
  }

  .grid-row {
    display: grid;
    grid-template-columns: 2fr 1fr 4fr 1fr;
    border-bottom: 1px solid #e3e3e3;
  }

  .grid-cell {
    padding: 12px 20px;
    text-align: left;
    align-self: center;
  }

  .grid-cell-center {
    text-align: center;
  }
`;

class CollectionSeries extends React.Component {
  onAddAllEpisodes = seriesId => {
    this.props.addAllEpisodes({seriesId});
  };

  addEpisode = (seriesId, episodeId, seasonNumber) => {
    this.props.addEpisode({seriesId, episodeId, seasonNumber});
  };

  removeEpisode = (seriesId, episodeId) => {
    this.props.removeEpisode({seriesId, episodeId});
  };

  onChangeEpisode = (seriesId, episode) => {
    const episodeId = episode.id;
    const seasonNumber = episode.season_number;

    if (episode.watched) {
      this.props.removeEpisode({seriesId, episodeId});
    } else {
      this.props.addEpisode({seriesId, episodeId, seasonNumber});
    }
  };

  render() {
    const {series, season, palette, userCollection} = this.props;

    if (!season || !series) return <Loader />;

    return (
      <Page>
        <StyledCollectionSeries image={`https://image.tmdb.org/t/p/w1280/${series.backdrop_path}`} palette={palette}>
          <div className="hero">
            <div className="background-image">
              <div className="hero-overlay" />
            </div>
            <div className="hero-content">
              <h2>{series.name}</h2>
            </div>
          </div>

          <SeasonPicker />
          <button onClick={() => this.onAddAllEpisodes(series.id)}>Mark entire series as watched</button>
          <div className="grid-wrapper">
            <div className="grid-body">
              {season.episodes.map(episode => (
                <div className="grid-row" key={episode.id}>
                  <div className="grid-cell">
                    <span className="small">{`s${episode.season_number}e${episode.episode_number}`}</span>
                    <span>{episode.name}</span>
                  </div>
                  <div className="grid-cell grid-cell-center">
                    <span className="small">Air date</span>
                    {episode.air_date}
                  </div>
                  <div className="grid-cell">
                    <span className="overview">{episode.overview}</span>
                  </div>
                  <div className="grid-cell grid-cell-center">
                    <span className="small">Watched?</span>
                    <input
                      type="checkbox"
                      checked={episode.watched}
                      onChange={() => this.onChangeEpisode(series.id, episode)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </StyledCollectionSeries>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  userCollection: SELECTORS.COLLECTION.getUserCollection(state),
  series: SELECTORS.SERIES.getSeriesDetails(state),
  palette: SELECTORS.SERIES.getPalette(state),
  season: SELECTORS.SERIES.getSeason(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(SeriesActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionSeries);

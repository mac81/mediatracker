import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {SELECTORS} from '../reducers';
import styled from 'styled-components';
import {font, color} from '../styles/typography';
import {Link} from 'react-router-dom';
import * as CollectionActions from '../actions/collectionActions';
import {Page} from './';

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
`;

class CollectionSeries extends React.Component {
  addEpisode = (seriesId, episodeId) => {
    this.props.addEpisode({seriesId, episodeId});
  };

  removeEpisode = (seriesId, episodeId) => {
    this.props.removeEpisode({seriesId, episodeId});
  };

  render() {
    const {series, season, palette, addEpisode, removeEpisode, userCollection} = this.props;

    if (!season || !series) return null;

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

          <nav>
            <ul>
              {series.seasons.map(s => (
                <li key={s.id} className={s.id === season.id ? 'active' : undefined}>
                  <Link to={`/collection/${series.id}/season/${s.season_number}`}>{s.season_number}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Air date</th>
                <th>Overview</th>
                <th>Watched?</th>
              </tr>
            </thead>
            <tbody>
              {season.episodes.map(episode => {
                const userEpisodes = userCollection.series.find(s => s.id === series.id).episodes;
                const isInCollection = Boolean(userEpisodes && userEpisodes.find(ep => ep === episode.id));
                return (
                  <tr key={episode.id}>
                    <td>
                      <span>{`s${episode.season_number}e${episode.episode_number}`}</span>
                      {episode.name}
                    </td>
                    <td>{episode.air_date}</td>
                    <td>{episode.overview}</td>
                    <td>
                      {isInCollection ? (
                        <button onClick={() => this.removeEpisode(series.id, episode.id)}>Remove</button>
                      ) : (
                        <button onClick={() => this.addEpisode(series.id, episode.id)}>Add</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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

const mapDispatchToProps = dispatch => bindActionCreators(CollectionActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionSeries);

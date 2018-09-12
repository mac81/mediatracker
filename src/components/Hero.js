import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SELECTORS} from '../reducers';
import * as CollectionActions from '../actions/collectionActions';

import styled from 'styled-components';
import {font} from '../styles/typography';
import ScoreChart from './ScoreChart';

const StyledHero = styled.div`
  position: relative;
  height: 590px;
  margin-bottom: 30px;

  .background-image {
    position: absolute;
    background: url(${props => props.image});
    background-size: cover;
    height: 530px;
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
    /* background-image: radial-gradient(
      circle at 20% 50%,
      rgba(52, 35, 78, 0.94) 0%,
      rgba(186, 82, 104, 0.94) 100%
    ); */
  }

  .container {
    position: relative;
    display: flex;
    padding-top: 50px;
  }

  .hero-image {
    width: 33.33%;
  }

  .hero-content {
    width: 66.66%;
    padding-left: 50px;
  }

  .hero-title {
    display: flex;
    align-items: baseline;
  }

  h2 {
    ${font('display2')};
    margin: 20px 0 20px 0;
    color: #fff;
  }

  span {
    ${font('headline')};
    color: rgba(255, 255, 255, 0.6);
  }

  .hero-overview {
    ${font('body2')};
    color: #fff;
  }

  .actions {
    display: flex;
  }

  .icon {
    background: none;
    border: 3px solid #fff;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    transition: background 100ms ease-in-out;

    svg {
      fill: #fff;
      width: 24px;
      height: 24px;
    }

    &.active {
      svg {
        fill: #f5879b;
      }
    }

    &:hover {
      background-color: #fff;
      svg {
        fill: #000;
      }
    }
  }
`;

class Hero extends React.Component {
  constructor(...args) {
    super(...args);

    this.addToWatchlist = this.addToWatchlist.bind(this);
    this.removeFromWatchlist = this.removeFromWatchlist.bind(this);
  }

  addToWatchlist() {
    const {
      addSeriesToCollection,
      addMovieToCollection,
      details: {id, name, title, media_type},
    } = this.props;

    if (media_type === 'movie') {
      addMovieToCollection({id, title});
    } else {
      addSeriesToCollection({id, name});
    }
  }

  removeFromWatchlist() {
    const {
      removeSeriesFromCollection,
      details: {id},
    } = this.props;

    removeSeriesFromCollection({id});
  }

  render() {
    const {user, details, palette} = this.props;

    if (!details) {
      return null;
    }

    const releaseYear = new Date(details.release_date || details.first_air_date).getFullYear();

    return (
      <StyledHero image={`https://image.tmdb.org/t/p/w1280/${details.backdrop_path}`} palette={palette}>
        <div className="background-image">
          <div className="hero-overlay" />
        </div>
        <div className="container">
          <div className="hero-image">
            <img src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`} alt={details.title || details.name} />
          </div>
          <div className="hero-content">
            <div className="hero-title">
              <h2>
                {details.title || details.name} <span>{`(${releaseYear})`}</span>
              </h2>
            </div>
            <div className="actions">
              <ScoreChart score={details.vote_average} />
              {user &&
                (!details.isInCollection ? (
                  <button onClick={this.addToWatchlist} className="icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M17,3A2,2 0 0,1 19,5V21L12,18L5,21V5C5,3.89 5.9,3 7,3H17M11,7V9H9V11H11V13H13V11H15V9H13V7H11Z" />
                    </svg>
                  </button>
                ) : (
                  <button onClick={this.removeFromWatchlist} className="icon active">
                    <svg viewBox="0 0 24 24">
                      <path d="M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5A2,2 0 0,0 17,3M15,11H9V9H15V11Z" />
                    </svg>
                  </button>
                ))}
            </div>
            <div className="hero-overview">{details.overview}</div>
          </div>
        </div>
      </StyledHero>
    );
  }
}

const mapStateToProps = (state, props) => ({
  user: SELECTORS.USER.getUser(state),
  details: props.type === 'movie' ? SELECTORS.MOVIE.getMovieDetails(state) : SELECTORS.SERIES.getSeriesDetails(state),
  palette: SELECTORS.SERIES.getPalette(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(CollectionActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hero);

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SELECTORS} from '../reducers';
import {addSeriesToWatchlist, removeSeriesFromWatchlist} from '../actions/seriesActions';

import styled from 'styled-components';
import {font, color} from '../styles/typography';
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
          ${props => props.swatch && props.swatch.DarkVibrant._rgb[0]},
          ${props => props.swatch && props.swatch.DarkVibrant._rgb[1]},
          ${props => props.swatch && props.swatch.DarkVibrant._rgb[2]},
          0.94
        )
        0%,
      rgba(
          ${props => props.swatch && Math.round(props.swatch.DarkMuted._rgb[0])},
          ${props => props.swatch && Math.round(props.swatch.DarkMuted._rgb[1])},
          ${props => props.swatch && Math.round(props.swatch.DarkMuted._rgb[2])},
          0.94
        )
        100%
    );
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
`;

class Hero extends React.Component {
  constructor(...args) {
    super(...args);

    this.addToWatchlist = this.addToWatchlist.bind(this);
    this.removeFromWatchlist = this.removeFromWatchlist.bind(this);
  }

  addToWatchlist() {
    const {
      addSeriesToWatchlist,
      details: {id, name},
    } = this.props;

    addSeriesToWatchlist({id, name});
  }

  removeFromWatchlist() {
    const {
      removeSeriesFromWatchlist,
      details: {id},
    } = this.props;

    removeSeriesFromWatchlist({id});
  }

  render() {
    const {user, details, isAddedToWatchlist, isSeriesInCollection} = this.props;

    if (!details) {
      return null;
    }

    console.log('isSeriesInCollection: ', isSeriesInCollection);

    const releaseYear = new Date(details.release_date || details.first_air_date).getFullYear();

    return (
      <StyledHero image={`https://image.tmdb.org/t/p/w1280/${details.backdrop_path}`} swatch={details.swatch}>
        <div className="background-image">
          <div className="hero-overlay" />
        </div>
        <div className="container">
          <div className="hero-image">
            <img src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`} />
          </div>
          <div className="hero-content">
            <div className="hero-title">
              <h2>
                {details.title || details.name} <span>{`(${releaseYear})`}</span>
              </h2>
            </div>
            {user &&
              (!isSeriesInCollection ? (
                <button onClick={this.addToWatchlist}>Add to watchlist</button>
              ) : (
                <button onClick={this.removeFromWatchlist}>Remove from watchlist</button>
              ))}
            <ScoreChart score={details.vote_average} swatch={details.swatch} />
            <div className="hero-overview">{details.overview}</div>
            {/*isAddedToWatchlist ? (
              <button onClick={this.removeFromWatchlist}>Remove from watchlist</button>
            ) : (
              <button onClick={this.addToWatchlist}>Add to watchlist</button>
            )*/}
          </div>
        </div>
      </StyledHero>
    );
  }
}

const mapStateToProps = state => ({
  user: SELECTORS.USER.getUser(state),
  details: SELECTORS.SERIES.getSeriesDetails(state),
  isAddedToWatchlist: SELECTORS.SERIES.getIsAddedToWatchlist(state),
  isSeriesInCollection: SELECTORS.COLLECTION.getIsSeriesInCollection(state, 48866),
});

const mapDispatchToProps = dispatch => ({
  addSeriesToWatchlist: bindActionCreators(addSeriesToWatchlist, dispatch),
  removeSeriesFromWatchlist: bindActionCreators(removeSeriesFromWatchlist, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hero);

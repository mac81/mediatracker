import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SELECTORS} from '../reducers';
import {addToWatchlist, removeFromWatchlist} from '../actions/seriesActions';

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
          ${props => props.swatch.DarkVibrant._rgb[0]},
          ${props => props.swatch.DarkVibrant._rgb[1]},
          ${props => props.swatch.DarkVibrant._rgb[2]},
          0.94
        )
        0%,
      rgba(
          ${props => Math.round(props.swatch.DarkMuted._rgb[0])},
          ${props => Math.round(props.swatch.DarkMuted._rgb[1])},
          ${props => Math.round(props.swatch.DarkMuted._rgb[2])},
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
      addToWatchlist,
      details: {id},
    } = this.props;

    addToWatchlist(id);
  }

  removeFromWatchlist() {
    const {
      details: {id},
    } = this.props;

    this.props.removeFromWatchlist(id);
  }

  render() {
    const {user, details, isAddedToWatchlist} = this.props;

    if (!details) {
      return null;
    }

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
            {user && <button onClick={this.addToWatchlist}>Add to watchlist</button>}
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
});

const mapDispatchToProps = dispatch => ({
  addToWatchlist: bindActionCreators(addToWatchlist, dispatch),
  removeFromWatchlist: bindActionCreators(removeFromWatchlist, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hero);

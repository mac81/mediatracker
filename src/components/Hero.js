import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SELECTORS} from '../reducers';
import {addToWatchlist, removeFromWatchlist} from '../actions/seriesActions';

import styled from 'styled-components';
import {font, color} from '../styles/typography';

const StyledHero = styled.div`
  position: relative;
  background: url(${props => props.image});
  background-size: cover;
  height: 530px;

  .hero-overlay {
    height: 100%;
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

  .hero-content {
    position: relative;
    left: 33.33%;
    padding: 100px 33.33% 100px 50px;
  }

  .hero-title {
    display: flex;
    align-items: baseline;
  }

  h2 {
    ${font('display2')};
    color: #fff;
  }

  span {
    ${font('headline')};
    color: rgba(255, 255, 255, 0.6);
  }

  .hero-overview {
    ${font('body1')};
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
    const {details: {id}} = this.props;

    this.props.addToWatchlist(id);
  }

  removeFromWatchlist() {
    const {details: {id}} = this.props;

    this.props.removeFromWatchlist(id);
  }

  render() {
    const {details, isAddedToWatchlist} = this.props;

    if (!details) {
      return null;
    }

    const releaseYear = new Date(details.release_date || details.first_air_date).getFullYear();

    return (
      <StyledHero image={`https://image.tmdb.org/t/p/w1280/${details.backdrop_path}`} swatch={details.swatch}>
        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content">
              <div className="hero-title">
                <h2>
                  {details.title || details.name} <span>{`(${releaseYear})`}</span>
                </h2>
                <span>{Math.floor(details.vote_average * 10).toFixed(0)}%</span>
              </div>
              <div className="hero-overview">{details.overview}</div>
              {isAddedToWatchlist ? (
                <button onClick={this.removeFromWatchlist}>Remove from watchlist</button>
              ) : (
                <button onClick={this.addToWatchlist}>Add to watchlist</button>
              )}
            </div>
          </div>
        </div>
      </StyledHero>
    );
  }
}

const mapStateToProps = state => ({
  details: SELECTORS.SERIES.getSeriesDetails(state),
  isAddedToWatchlist: SELECTORS.SERIES.getIsAddedToWatchlist(state),
});

const mapDispatchToProps = dispatch => ({
  addToWatchlist: bindActionCreators(addToWatchlist, dispatch),
  removeFromWatchlist: bindActionCreators(removeFromWatchlist, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Hero);

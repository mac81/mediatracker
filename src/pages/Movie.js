import React from 'react';
import {connect} from 'react-redux';
import {SELECTORS} from '../reducers';
import Hero from '../components/Hero';

class Movie extends React.Component {
  render() {
    const {movieDetails} = this.props;

    if (!movieDetails) return null;

    return (
      <div>
        <Hero type="movie" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movieDetails: SELECTORS.MOVIE.getMovieDetails(state),
});

export default connect(
  mapStateToProps,
  undefined
)(Movie);

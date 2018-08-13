import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SELECTORS} from '../reducers';
import {loadMovieDetails} from '../actions/movieActions';
import Hero from './Hero';

class MovieDetails extends React.Component {
  // constructor(...args) {
  //   super(...args);

  //   this.props.loadMovieDetails(this.props.match.params.id);
  // }

  render() {
    const {movieDetails} = this.props;

    if (!movieDetails) return null;
    console.log(movieDetails);
    return (
      <div>
        <Hero details={movieDetails} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movieDetails: SELECTORS.MOVIE_DETAILS.getMovieDetails(state),
});

const mapDispatchToProps = dispatch => ({
  loadMovieDetails: bindActionCreators(loadMovieDetails, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import {SELECTORS} from '../reducers';
import {loadMovieDetails} from '../actions/movieActions';
import {loadSearchResult} from '../actions/searchActions';

import styled from 'styled-components';

const StyledSearchResult = styled.div`
  ul {
    position: absolute;
    z-index: 999;
    width: 100%;
    background: #fff;
  }

  a {
    display: flex;
  }
`;

class SearchResult extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      showResults: false,
    };

    this.onQueryChange = this.onQueryChange.bind(this);
    this.onResultClick = this.onResultClick.bind(this);
  }

  onQueryChange(e) {
    this.props.loadSearchResult(e.target.value);
    this.setState({showResults: true});
  }

  onResultClick() {
    this.setState({showResults: false});
  }

  render() {
    const {searchResults} = this.props;

    if (!searchResults) return null;

    return (
      <StyledSearchResult>
        <input type="text" onChange={this.onQueryChange} />
        <ul className="seach-result">
          {this.state.showResults &&
            searchResults.map(result => (
              <li>
                <Link to={`/${result.media_type}/${result.id}`} onClick={this.onResultClick}>
                  {result.poster_path && <img src={`https://image.tmdb.org/t/p/w45/${result.poster_path}`} />}

                  <h2>{result.name || result.title}</h2>
                  <span>{result.original_title}</span>
                  <span>{result.release_date}</span>
                  <span>{result.media_type}</span>
                </Link>
              </li>
            ))}
        </ul>
      </StyledSearchResult>
    );
  }
}

const mapStateToProps = state => ({
  searchResults: SELECTORS.SEARCH.getSearchResults(state),
});

const mapDispatchToProps = dispatch => ({
  loadMovieDetails: bindActionCreators(loadMovieDetails, dispatch),
  loadSearchResult: bindActionCreators(loadSearchResult, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);

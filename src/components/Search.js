import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import {SELECTORS} from '../reducers';
import {loadMovieDetails} from '../actions/movieActions';
import {search} from '../actions/searchActions';

import styled from 'styled-components';

const StyledSearch = styled.div`
  .searchbox {
    border: none;

    width: 100%;
    padding: 12px 20px;

    &:focus {
      outline: none;
    }
  }

  ul {
    position: absolute;
    z-index: 999;
    width: 100%;
    background: #fff;

    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  li {
    padding: 12px 20px;
  }

  a {
    display: flex;
  }
`;

class Search extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      showResults: false,
    };

    this.onQueryChange = this.onQueryChange.bind(this);
    this.onResultClick = this.onResultClick.bind(this);
  }

  onQueryChange(e) {
    const query = e.target.value;
    this.props.loadSearchResult({query});
    this.setState({showResults: true});
  }

  onResultClick() {
    this.setState({showResults: false});
  }

  render() {
    const {searchResults} = this.props;

    if (!searchResults) return null;

    return (
      <StyledSearch>
        <input
          type="text"
          className="searchbox"
          onChange={this.onQueryChange}
          placeholder="Search for a movie or tv show"
        />
        <ul className="seach-result">
          {this.state.showResults &&
            searchResults.map(result => (
              <li>
                <Link to={`/${result.media_type}/${result.id}`} onClick={this.onResultClick}>
                  {result.poster_path && <img src={`https://image.tmdb.org/t/p/w92/${result.poster_path}`} />}
                  <div>
                    <h2>{result.name || result.title}</h2>
                    <span>{result.media_type}</span>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </StyledSearch>
    );
  }
}

const mapStateToProps = state => ({
  searchResults: SELECTORS.SEARCH.getSearchResults(state),
});

const mapDispatchToProps = dispatch => ({
  loadMovieDetails: bindActionCreators(loadMovieDetails, dispatch),
  loadSearchResult: bindActionCreators(search, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

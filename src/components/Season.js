import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import styled from 'styled-components';
import {font, color} from '../styles/typography';

const shorten = (str, maxLen, separator = ' ') => {
  if (str.length <= maxLen) return str;
  return str.substr(0, str.lastIndexOf(separator, maxLen)) + '...';
};

const StyledSeason = styled.li`
  border-bottom: 1px solid ${props => props.theme.colors.borderColor};
  a {
    display: flex;

    padding: 20px 0;
  }

  .image-wrapper {
    min-width: 120px;
    max-width: 120px;
    margin-right: 30px;
  }

  img {
    border-radius: 3px;
  }

  h4 {
    ${font('body2')};
    margin: 0 0 12px 0;
  }

  .overview {
    ${font('body1')};
  }
`;

const Season = ({season, match}) => (
  <StyledSeason>
    <Link to={`${match.url}/season/${season.season_number}`}>
      <div className="image-wrapper">
        <img src={`https://image.tmdb.org/t/p/w500/${season.poster_path}`} />
      </div>
      <div className="card-content">
        <h4>
          Season {season.season_number} | {season.episode_count} episodes
        </h4>
        {/* <p>{`Season ${season.season_number} of ${season.name} premiered on ${season.air_date}`}</p> */}
        <div className="overview">{shorten(season.overview, 300)}</div>
      </div>
    </Link>
  </StyledSeason>
);

export default withRouter(Season);

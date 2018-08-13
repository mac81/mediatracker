import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {font, color} from '../styles/typography';

const StyledSeasonCard = styled.div`
  a {
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${props => props.theme.colors.borderColor};
    padding: 20px 0;
    width: 100%;
  }

  .image-wrapper {
    width: 120px;
    margin-right: 30px;
  }

  img {
    border-radius: 3px;
  }

  .hero-content {
    position: relative;
    left: 33.33%;
    padding: 100px 33.33% 100px 50px;
  }

  h2 {
    ${font('display3')};
    color: #fff;
    margin: 0;
  }
`;

const SeasonCard = ({season, match}) => (
  <StyledSeasonCard>
    <Link to={`${match.url}season/${season.season_number}`}>
      <div className="image-wrapper">
        <img src={`https://image.tmdb.org/t/p/w500/${season.poster_path}`} />
      </div>
      <div className="card-content">
        <h4>
          Season {season.season_number} | {season.episode_count} episodes
        </h4>
        <p>{`Season ${season.season_number} of ${season.name} premiered on ${season.air_date}`}</p>
      </div>
    </Link>
  </StyledSeasonCard>
);

export default SeasonCard;

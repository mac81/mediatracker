import React from 'react';
import styled from 'styled-components';
import {font} from '../styles/typography';
import ScoreChart from './ScoreChart';

const Episode = styled.li`
  display: flex;
  align-items: center;

  padding: 20px 0;

  img {
    margin-right: 30px;
  }

  h3 {
    ${font('title')};
    margin: 0;
  }

  p {
    ${font('body1')};
    color: rgba(0, 0, 0, 0.54);
  }
`;

const EpisodeList = ({episodes}) => (
  <ul>
    {episodes.map(episode => (
      <Episode>
        <img src={`https://image.tmdb.org/t/p/w300/${episode.still_path}`} alt={episode.name} />
        <div>
          <h3>{`${episode.episode_number} - ${episode.name}`}</h3>
          <ScoreChart score={episode.vote_average} />
          <p>{episode.overview}</p>
        </div>
      </Episode>
    ))}
  </ul>
);

export default EpisodeList;

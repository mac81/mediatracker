import React from 'react';
import styled from 'styled-components';
import {font} from '../styles/typography';
import cn from 'classnames';
import * as moment from 'moment';
import {Link} from 'react-router-dom';

const StyledMySeries = styled.table`
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-collapse: collapse;
  max-width: 1280px;
  margin: 0 auto;

  thead {
    background-image: linear-gradient(to right bottom, #041c2c, #10283a, #1c3548, #294357, #355166);
    background: #ba5268;
  }

  th {
    padding: 12px 20px;
    text-align: left;
    ${font('button')};
    color: rgba(255, 255, 255, 0.87);
  }

  td {
    padding: 12px 20px;
    border-bottom: 1px solid #e3e3e3;
  }

  .cell {
    display: flex;
    align-items: center;
  }

  a {
    ${font('body1')};
    color: #ba5268;
  }

  span {
    ${font('body1')};
    display: block;
  }
  .small {
    ${font('small')};
    color: #808080;
  }

  .watched {
    color: #00917e;
  }
`;

const MySeries = ({series}) => (
  <StyledMySeries>
    <thead>
      <tr>
        <th>Series</th>
        <th>Last Episode</th>
        <th>Next Episode</th>
      </tr>
    </thead>
    <tbody>
      {series &&
        series.map(series => {
          const {
            id,
            name,
            last_episode_to_air,
            last_air_date,
            next_episode_to_air,
            number_of_episodes,
            watched_episodes_count,
          } = series;

          const lastEpisodeDate = moment(last_air_date);
          const lastEpisodeDateFormatted = lastEpisodeDate.format('MMMM Do YYYY');
          const timeSinceLastEpisode = lastEpisodeDate.fromNow();

          const nextEpisodeDate = next_episode_to_air && moment(next_episode_to_air.air_date);

          const episodesToWatch = number_of_episodes - watched_episodes_count;

          return (
            <tr key={id} pose="open">
              <td>
                <div className="cell">
                  {episodesToWatch ? (
                    <svg style={{width: '24px', height: '24px', marginRight: '15px'}} viewBox="0 0 24 24">
                      <path
                        fill="#808080"
                        d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"
                      />
                    </svg>
                  ) : (
                    <svg style={{width: '24px', height: '24px', marginRight: '15px'}} viewBox="0 0 24 24">
                      <path fill="#00917e" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                    </svg>
                  )}

                  <div>
                    <Link to={`collection/${id}`}>{name}</Link>
                    <span
                      className={cn('small', {
                        watched: episodesToWatch === 0,
                      })}>
                      {episodesToWatch} unwatched episodes
                    </span>
                  </div>
                </div>
              </td>
              <td>
                <span>{`s${last_episode_to_air.season_number}e${last_episode_to_air.episode_number} - ${
                  last_episode_to_air.name
                }`}</span>
                <span className="small">{`${lastEpisodeDateFormatted} | ${timeSinceLastEpisode}`}</span>
              </td>

              <td>
                {next_episode_to_air ? (
                  <div>
                    <span>{`s${next_episode_to_air.season_number}e${next_episode_to_air.episode_number} - ${
                      next_episode_to_air.name
                    }`}</span>
                    <span className="small">{`${nextEpisodeDate &&
                      nextEpisodeDate.format('MMMM Do YYYY')} | ${nextEpisodeDate && nextEpisodeDate.fromNow()}`}</span>
                  </div>
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
    </tbody>
  </StyledMySeries>
);

export default MySeries;

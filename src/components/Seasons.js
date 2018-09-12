import React from 'react';
import styled from 'styled-components';
import {font} from '../styles/typography';

import Season from './Season';

const StyledSeasons = styled.div`
  h3 {
    ${font('headline')};
    margin: 0 0 12px 0;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
`;

const Seasons = ({seasons}) => (
  <StyledSeasons>
    <h3>Seasons ({seasons.length})</h3>
    <ul>
      {seasons.map(season => (
        <Season season={season} key={season.id} />
      ))}
    </ul>
  </StyledSeasons>
);

export default Seasons;

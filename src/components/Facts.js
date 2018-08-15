import React from 'react';
import styled from 'styled-components';
import {font, color} from '../styles/typography';

const StyledFacts = styled.div`
  h3 {
    ${font('title')};
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  li {
    margin-bottom: 15px;
  }

  h4 {
    ${font('body2')};
    margin: 0;
  }

  span {
    ${font('body1')};
  }
`;

const Facts = ({details: {poster_path, status, networks, type}}) => (
  <StyledFacts>
    <h3>Facts</h3>
    <ul>
      <li>
        <h4>Status</h4>
        <span>{status}</span>
      </li>
      <li>
        <h4>Network</h4>
        {networks.map(network => (
          <span key={network.id}>{network.name}</span>
        ))}
      </li>
      <li>
        <h4>Type</h4>
        <span>{type}</span>
      </li>
    </ul>
  </StyledFacts>
);

export default Facts;

import React from 'react';
import styled from 'styled-components';
import {font, color} from '../styles/typography';

const StyledLoader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .text {
    color: #8e44ad;
    display: inline-block;
    margin-left: 15px;
    ${font('headline')};
  }

  .bounceball {
    position: relative;
    display: inline-block;
    height: 52px;
    width: 30px;
    &:before {
      position: absolute;
      content: '';
      display: block;
      top: 0;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #9b59b6;
      transform-origin: 50%;
      animation: bounce 500ms alternate infinite ease;
    }
  }

  @keyframes bounce {
    0% {
      top: 40px;
      height: 10px;
      border-radius: 60px 60px 20px 20px;
      transform: scaleX(2);
    }
    35% {
      height: 30px;
      border-radius: 50%;
      transform: scaleX(1);
    }
    100% {
      top: 0;
    }
  }
`;

const Loader = () => (
  <StyledLoader>
    <div className="loading">
      <div className="bounceball" />
      <div className="text">LOADING</div>
    </div>
  </StyledLoader>
);

export default Loader;

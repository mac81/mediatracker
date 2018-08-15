import React from 'react';
import styled from 'styled-components';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {font, color} from '../styles/typography';

const StyledScoreChart = styled.div`
  display: flex;
  align-items: center;
  ${font('button')};
  color: #fff;
  margin: 0 0 40px 0;

  .CircularProgressbar {
    width: 50px;
    margin-right: 10px;
  }
`;

class ScoreChart extends React.Component {
  render() {
    const {score} = this.props;
    const calculatedScore = Math.floor(score * 10).toFixed(0);

    const pathColor = calculatedScore > 70 ? '#2ecc71' : calculatedScore > 40 ? '#e67e22' : '#e74c3c';
    const trailColor = calculatedScore > 70 ? '#27ae60' : calculatedScore > 40 ? '#d35400' : '#c0392b';

    return (
      <StyledScoreChart>
        <CircularProgressbar
          initialAnimation
          percentage={calculatedScore}
          text={`${calculatedScore}%`}
          styles={{
            path: {stroke: `${pathColor}`},
            trail: {stroke: `${trailColor}`},
            text: {fill: `${pathColor}`, fontSize: '30px'},
          }}
        />
        User Score
      </StyledScoreChart>
    );
  }
}

export default ScoreChart;

//{Math.floor(data * 10).toFixed(0)}%

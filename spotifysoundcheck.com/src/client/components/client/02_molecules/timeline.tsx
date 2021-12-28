import React from 'react';
import styled from 'styled-components';
import Circle from '../../common/01_atoms/circle';

const StyledTimeline = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
`;

const StyledCircleWithLines = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  &:first-child {
    &:before {
      display: none;
    }
  }
  &::before {
    content: ' ';
    display: block;
    background-color: var(--color-SNOW);
    height: 2px;
    width: 50px;
    margin-left: -3px;
    margin-bottom: 1px;
  }
`;

interface TimelineProps {
  total: number;
  filled: number;
}

const Timeline = (props: Timeline) => {
  const generateCircles = () => {
    const { total, filled } = props;
    let circleArray = [];
    for (let i = 0; i < total; i++) {
      circleArray = [
        ...circleArray,
        <StyledCircleWithLines key={i}>
          <Circle isFilled={i < filled} />
        </StyledCircleWithLines>
      ];
    }
    return circleArray;
  };
  return <StyledTimeline>{generateCircles().map(circle => circle)}</StyledTimeline>;
};

export default Timeline;

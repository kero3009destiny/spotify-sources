import React from 'react';

interface ICircleProps {
  isFilled: boolean;
  isSemiFilled: boolean;
}

const Circle = (props: ICircleProps) => (
  <svg height="20" width="20">
    <circle
      cx="9"
      cy="9"
      r="8"
      strokeWidth="2"
      stroke="white"
      fill={props.isFilled ? 'white' : 'none'}
    />
    {props.isSemiFilled && <circle cx="9" cy="9" r="4" strokeWidth="0" stroke="white" fill="white" />}
  </svg>
);

export default Circle;

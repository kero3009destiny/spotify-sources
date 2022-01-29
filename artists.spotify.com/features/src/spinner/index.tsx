// ignore-string-externalization
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { cssColorValue } from '@spotify-internal/encore-web';

const duration = '1.4s';
const offset = 32;

const rotate360 = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dashoffset: ${offset};
  }
  50% {
    stroke-dashoffset: ${offset / 4};
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: ${offset};
    transform: rotate(450deg);
  }
`;

const Svg = styled.svg`
  animation: ${rotate360} ${duration} linear infinite;
  display: inline-block;
  height: 16px;
  padding: 1px;
  width: 16px;
`;

const Circle = styled.circle`
  animation: ${dash} ${duration} ease-in-out infinite;
  transform-origin: center;
`;

type Props = { color?: string } & React.SVGAttributes<SVGElement>;
export function Spinner({ color, ...props }: Props) {
  const primaryColor = cssColorValue('textBrightAccent');
  const strokeColor = color || primaryColor;

  return (
    <Svg
      data-testid="spinner"
      role="status"
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle
        cx="7"
        cy="7"
        r="5"
        fill="none"
        stroke={strokeColor}
        strokeDasharray={offset}
        strokeDashoffset="0"
        strokeWidth="1.5"
      />
    </Svg>
  );
}

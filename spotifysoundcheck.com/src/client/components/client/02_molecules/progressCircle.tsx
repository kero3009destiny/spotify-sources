import React from 'react';
import styled, { keyframes, css } from 'styled-components';
// import Sound from 'react-sound';
// import BellDing from '../../../../static/sounds/bell_ding.mp3'

interface ICircleSVGProps {
  current: number;
  total: number;
  stepAnimationSeconds: number;
  isAudioPlaying: boolean;
}

const clickButtonAnimation = keyframes`
  0% {
    transform: scale(0);
  }
  80% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const progressCircleAnimation = (props: ICircleSVGProps) => keyframes`
  from {
    stroke-dashoffset: ${200 - 200 * (props.current / props.total)}
  }
  to {
    stroke-dashoffset: ${200 - 200 * ((props.current + 1) / props.total)}
  }
`;

const isAudioPlayingAnimation = keyframes`
 0% {
   stroke-width: 4;
 } 50% {
   stroke-width: 12;
 } 100% {
   stroke-width: 4;
 }
`;

const StyledCircle = styled.svg`
  circle:first-child {
    stroke-dasharray: 200;
    animation: ${(props: ICircleSVGProps) => progressCircleAnimation(props)}
      ${(props: ICircleSVGProps) => props.stepAnimationSeconds}s linear;
  }
  circle:nth-child(2) {
    animation: ${(props: ICircleSVGProps) => props.isAudioPlaying ? css`${isAudioPlayingAnimation} infinite 1s` : 'unset'};
  }
  circle:not(:first-child) {
    fill: ${(props: ICircleSVGProps) => props.isAudioPlaying ? 'var(--color-DARKNESS)' : 'none'};
  }
`;

interface IStyledProgressCircleProps {
  isClickToContinue: boolean;
}

const StyledProgressCircle = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  stroke: var(--color-DARKNESS);
  &:hover {
    cursor: ${(props: IStyledProgressCircleProps) =>
      props.isClickToContinue ? 'pointer' : 'auto'};
  }
  &:after {
    content: 'Next';
    display: ${(props: IStyledProgressCircleProps) => (props.isClickToContinue ? 'flex' : 'none')};
    background-color: var(--color-DARKNESS);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    color: white;
    animation: ${clickButtonAnimation} linear 250ms;
  }
`;

interface IProgressCircleProps {
  isClickToContinue?: boolean;
  onClick?: any;
  stepAnimationSeconds?: number;
  current?: number;
  total?: number;
  isAudioPlaying?: boolean;
}

const ProgressCircle = (props: IProgressCircleProps) => {
  const {
    isClickToContinue = false,
    onClick,
    stepAnimationSeconds = 3000,
    total = 1,
    current = 1,
    isAudioPlaying = false
  } = props;
  return (
    <StyledProgressCircle isClickToContinue={isClickToContinue} onClick={onClick}>
      <StyledCircle
        height="70"
        width="70"
        current={current}
        total={total}
        stepAnimationSeconds={stepAnimationSeconds}
        isAudioPlaying={isAudioPlaying}
      >
        <circle cx="35" cy="35" r="25" strokeWidth="2" fill="none" />
        <circle cx="35" cy="35" r="11" strokeWidth="2" fill="none" />
        <circle cx="35" cy="35" r="5" strokeWidth="2" fill="none" />
      </StyledCircle>
      {/* <Sound
        url={BellDing}
        playStatus={isClickToContinue ? 'PLAYING' : 'STOPPED'}
        volume={50}
      /> */}
    </StyledProgressCircle>
  );
};

export default ProgressCircle;

import styled from 'styled-components';

const BAR_LENGTH = 4;

/**
 * Gets a pseudorandom number used as the animation duration in milliseconds
 * between 1500 - 2200
 */
const randomMS = () => (Math.random() * 700 + 1500).toFixed(2);

export const Bar = styled.div`
  width: calc(100% / ${BAR_LENGTH * 2});
  height: 0;
  background-color: ${props => props.barColor};
`;

const INITIAL_POSITIONS = [60, 90, 30, 50];

const mapBarAnimation = (_, i) => `
  ${Bar}:nth-child(${i}) {
    animation: grow${i} ${randomMS()}ms alternate infinite;
  }

  @keyframes grow${i} {
    0% {
      height: ${INITIAL_POSITIONS[i - 1]}%;
    }

    ${Array.from({ length: 9 })
      .map(
        (__, j) => `
      ${(j + 1) * 10}% {
        height: ${Number((Math.random() * 90).toFixed(0)) + 10}%;
      }
    `,
      )
      .join('')}
  }
`;

export const Container = styled.div`
  display: inline-flex;
  align-items: flex-end;
  width: 30px;
  height: 30px;
  justify-content: space-between;
  overflow: hidden;

  ${Array.from({ length: BAR_LENGTH + 1 })
    .map(mapBarAnimation)
    .join('')}

  ${Bar}${Bar} {
    animation-play-state: ${props => (props.isPlaying ? 'running' : 'paused')};
  }
`;

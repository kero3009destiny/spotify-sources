import { css } from 'styled-components';

export const ACTIVATE_ANIMATION_CLASS = 'activate-animation';

export const fadeContentSlideUp = {
  setup: css`
    opacity: 0;
    transform: translateY(50px);
  `,
  play: css`
    animation: fadeContentSlideUp 500ms 0s ease-in forwards;
  `,
};

const fadeContentSlideUpFrames = css`
  @keyframes fadeContentSlideUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const showUpFromLeft = {
  setup: css`
    transform: translate(-50%, 100%);
  `,
  play: css`
    animation: showUpFromLeft 500ms 0s ease-in-out forwards;
  `,
};

const showUpFromLeftFrames = css`
  @keyframes showUpFromLeft {
    from {
      transform: translate(-50%, 100%);
    }

    to {
      transform: translate(0, 0);
    }
  }
`;

const rotateFrames = css`
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const animationKeyFrames = css`
  ${fadeContentSlideUpFrames}
  ${showUpFromLeftFrames}
  ${rotateFrames}
`;

export default animationKeyFrames;

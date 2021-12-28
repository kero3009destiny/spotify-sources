import styled from 'styled-components';

import { colors, cssFragments } from 'styles/variables';
import { minWidth } from 'styles/media-queries';
import CloseSvg from 'public/svg/close-mark.svg';

import { levels } from 'styles/z-index';

export const Modal = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: ${levels.prompt};

  &.visible {
    animation: fadeIn 250ms 0s ease-in-out;
  }

  &.hide {
    animation: fadeOut 250ms 0s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }
`;

export const Background = styled.div`
  background-color: ${colors.translucent50};
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

export const Container = styled.div`
  background-color: ${props => props.backgroundColor};
  max-height: 100vh;
  overflow-y: auto;
  position: relative;
  width: 100vw;
  height: 100vh;

  ${minWidth.md`
    width: auto;
    height: auto;
  `}
`;

export const CloseCta = styled.button`
  color: ${colors.white};
  height: 2.4rem;
  overflow: hidden;
  position: absolute;
  right: 4.05rem;
  top: 4.05rem;
  width: 2.4rem;
  z-index: ${levels.persistent};

  ${minWidth.md`
    width: 3.2rem;
    height: 3.2rem;
  `}

  &:active {
    color: ${colors.white};
  }

  ${cssFragments.defaultFocusState}
`;

export const CloseIcon = styled(CloseSvg)``;

import styled from 'styled-components';

import { animations, colors } from 'styles/variables';
import { minWidth } from 'styles/media-queries';

// Constants
const DROPDOWN_MENU_WIDTH = 24; // value in rem

const itemContentDelay = `0.8s`;

// Styled components
export const DropdownMenu = styled.div`
  font-size: 1.4rem;
  line-height: 2.4rem;

  ${minWidth.md`
    font-size: 1.6rem;
  `}

  ${minWidth.lg`
    background-color: ${colors.white};
    border: 0.1rem solid ${colors.grey600};
    padding: 2.4rem;
    position: absolute;
    right: calc(50% - ${DROPDOWN_MENU_WIDTH / 2}rem);
    transition: opacity ${animations.defaultTransition};
    width: ${DROPDOWN_MENU_WIDTH}rem;
  `}
`;

export const Container = styled.div`
  display: inline-block;
  position: relative;

  ${DropdownMenu} {
    opacity: 0;
    pointer-events: all;
    transition: opacity ${animations.defaultTransition};
    visibility: hidden;

    &.open {
      opacity: 1;
      transition: opacity ${animations.defaultTransition} ${itemContentDelay};
      visibility: visible;

      ${minWidth.lg`
        transition: opacity ${animations.defaultTransition};
      `}
    }
  }
`;

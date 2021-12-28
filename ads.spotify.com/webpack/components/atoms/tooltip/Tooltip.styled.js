import styled from 'styled-components';

import { colors } from 'styles/variables';
import { minWidth } from 'styles/media-queries';

// Constants
const CARET_SIZE = 1.2;
const TOOLTIP_OFFSET = 1.4;
const TOOLTIP_POSITION = CARET_SIZE + TOOLTIP_OFFSET;
const BACKGROUND_CARET_SIZE = 1.2 - 0.1;

// Styled components
export const Tooltip = styled.div`
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
    right: 0;
    top: calc(100% + ${TOOLTIP_POSITION}rem);
    width: 24rem;

    &::before,
    &::after {
      border-color: transparent transparent ${colors.grey600} transparent;
      border-style: solid;
      border-width: ${CARET_SIZE}rem;
      content: '';
      position: absolute;
      right: 2.8rem;
      top: -2.4rem;
    }

    &::after {
      border-bottom-color: ${colors.white};
      border-width: ${BACKGROUND_CARET_SIZE}rem;
      right: 2.9rem;
      top: -2.1rem;
    }
  `}
`;

export const Container = styled.div`
  display: inline-block;
  position: relative;

  ${minWidth.lg`
    ${Tooltip} {
      display: none;
    }

    ${props =>
      props.visible &&
      `
      ${Tooltip} {
        display: block;
      }
    `}
  `}
`;

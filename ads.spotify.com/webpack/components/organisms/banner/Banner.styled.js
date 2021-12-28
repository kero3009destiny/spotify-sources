import styled from 'styled-components';

import { container, columnsGutter } from 'styles/grid';
import { minWidth } from 'styles/media-queries';
import { colors } from 'styles/variables';
import { levels } from 'styles/z-index';

export const Banner = styled.section`
  bottom: 0;
  position: fixed;
  width: 100%;
  z-index: ${levels.prompt};

  ${minWidth.lg`
    ${container}
    ${columnsGutter}

    bottom: 8rem;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    left: 0;
    pointer-events: none;
    right: 0;
  `}
`;

export const Content = styled.div`
  background-color: ${colors.black};
  border-top: 0.1rem solid ${colors.grey400};
  color: ${colors.white};
  padding: 3.2rem;
  position: relative;

  ${minWidth.lg`
    border: 0.1rem solid ${colors.grey400};
    grid-column: span 5;
    padding: 4rem;
    pointer-events: all;
  `}
`;

export const Copy = styled.div.attrs({ tabIndex: 0 })`
  div {
    a {
      color: ${colors.white};
    }

    & > p {
      margin-bottom: 0.8rem;

      &:last-child {
        margin-bottom: 0;
      }

      ${minWidth.lg`
      margin-bottom: 1.6rem;
    `}
    }
  }
`;

export const Close = styled.button`
  font-size: 0;
  height: 2.4rem;
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 2.4rem;

  div,
  svg {
    color: ${colors.white};
    height: inherit;
    width: inherit;
  }

  ${minWidth.lg`
    right: 2rem;
    top: 2rem;
  `}
`;

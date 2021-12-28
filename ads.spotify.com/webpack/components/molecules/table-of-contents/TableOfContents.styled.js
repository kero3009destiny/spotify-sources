import styled from 'styled-components';

import { colors } from 'styles/variables';
import { levels } from 'styles/z-index';
import { minWidth } from 'styles/media-queries';
import { container, columnsGutter } from 'styles/grid';

export const Root = styled.div`
  background-color: ${colors.advertisingLavender};
  height: 100vh;
  overflow: auto;
  padding-bottom: 5.6rem;
  position: fixed;
  width: 100%;
  z-index: ${levels.highlight};

  ${minWidth.lg`
    padding-bottom: unset;
  `}
`;

export const Container = styled.div`
  ${columnsGutter}

  display: grid;
  grid-template-columns: repeat(12, 1fr);

  ${minWidth.lg`
    ${container}
  `};
`;

export const RecirculationWrapper = styled.div`
  grid-column: 1 / 13;

  ${minWidth.lg`
    grid-column: 1 / 12;
  `}
`;

export const CtaCloseWrapper = styled.div`
  display: none;

  ${minWidth.lg`
    display: block;
    grid-column: 12;
    position: relative;
  `}
`;

export const CtaClose = styled.button`
  outline: none;
  position: fixed;
  top: 50%;
`;

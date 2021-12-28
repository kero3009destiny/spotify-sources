import styled from 'styled-components';

import { minWidth } from 'styles/media-queries';
import { container, columnsGutter } from 'styles/grid';
import { Headline } from 'components/atoms';

export const Container = styled.div`
  ${container}
  ${columnsGutter}

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  margin: 4rem auto;

  ${minWidth.lg`
    margin: 8rem auto;
  `}
`;

export const Statement = styled(Headline).attrs({ tag: 'h2', styling: 'h1' })`
  grid-column: 1 / 13;
  white-space: break-spaces;

  ${minWidth.lg`
    grid-column: 4 / 12;
  `}

  strong {
    color: ${({ highlightColor }) => highlightColor};
  }
`;

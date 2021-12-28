import styled from 'styled-components';

import { container } from 'styles/grid';
import { minWidth } from 'styles/media-queries';

export const Root = styled.div`
  ${container}
  margin: 4rem auto;

  ${minWidth.lg`
    margin: 8rem auto;
  `}
`;

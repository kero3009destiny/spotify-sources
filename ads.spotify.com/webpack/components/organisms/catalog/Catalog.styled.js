import styled from 'styled-components';

import { container } from 'styles/grid';
import { minWidth } from 'styles/media-queries';

export const Catalog = styled.section`
  ${container}

  margin: 5.6rem auto;

  ${minWidth.lg`
    margin: 11.2rem auto;
  `}
`;

export const HorizontalRule = styled.hr`
  margin-bottom: 4.8rem;
  margin-top: 2.4rem;

  ${minWidth.lg`
    margin-bottom: 9.55rem;
    margin-top: 5.55rem;
  `}
`;

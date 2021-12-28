import styled from 'styled-components';

import { minWidth } from 'styles/media-queries';

export const Paragraph = styled.p`
  font-size: 1.6rem;
  letter-spacing: 0;
  line-height: 2.4rem;

  ${minWidth.lg`
    font-size: 2rem;
    letter-spacing: 0;
    line-height: 3.2rem;
  `}
`;

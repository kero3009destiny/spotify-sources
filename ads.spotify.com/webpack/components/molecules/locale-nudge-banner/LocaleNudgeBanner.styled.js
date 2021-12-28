import styled from 'styled-components';

import { minWidth } from 'styles/media-queries';

export const Description = styled.p`
  margin-bottom: 8.7rem;

  ${minWidth.lg`
    margin-bottom: 4.3rem;
  `}
`;

export const CtaContainer = styled.p`
  a,
  button {
    text-align: center;
    width: 100%;

    ${minWidth.lg`
      width: auto;
    `}
  }
`;

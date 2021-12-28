import styled from 'styled-components';

import { minWidth } from 'styles/media-queries';
import { fontWeights, navHeight } from 'styles/variables';

export const H1 = styled.h1`
  font-size: 4rem;
  font-weight: ${fontWeights.black};
  letter-spacing: -0.15rem;
  line-height: 4rem;

  ${minWidth.lg`
    font-size: 8.8rem;
    letter-spacing: -0.4rem;
    line-height: 8.8rem;
  `}
`;

export const H2 = styled.h2`
  font-size: 2.8rem;
  font-weight: ${fontWeights.black};
  letter-spacing: -0.1rem;
  line-height: 3.2rem;

  ${minWidth.lg`
    font-size: 5rem;
    letter-spacing: -0.2rem;
    line-height: 5.6rem;
  `}
`;

export const H3 = styled.h3`
  font-size: 2.4rem;
  font-weight: ${fontWeights.black};
  letter-spacing: -0.1rem;
  line-height: 2.4rem;

  ${minWidth.lg`
    font-size: 3.4rem;
    letter-spacing: -0.15rem;
    line-height: 4rem;
  `}
`;

export const H4 = styled.h4`
  font-size: 2rem;
  font-weight: ${fontWeights.black};
  letter-spacing: -0.05rem;
  line-height: 2.4rem;

  ${minWidth.lg`
    font-size: 2.8rem;
    letter-spacing: -0.1rem;
    line-height: 3.2rem;
  `}
`;

export const H5 = styled.h5`
  font-size: 1.8rem;
  font-weight: ${fontWeights.black};
  letter-spacing: -0.05rem;
  line-height: 2.4rem;

  ${minWidth.lg`
    font-size: 2.4rem;
    letter-spacing: -0.075rem;
    line-height: 3.2rem;
  `}
`;

export const H6 = styled.h6`
  font-size: 1.8rem;
  font-weight: ${fontWeights.black};
  letter-spacing: -0.05rem;
  line-height: 2.4rem;

  ${minWidth.lg`
    font-size: 2.4rem;
    letter-spacing: -0.075rem;
    line-height: 3.2rem;
  `}
`;

/* Display Styles */

export const Display1 = styled.h1`
  font-size: 4.8rem;
  font-weight: ${fontWeights.black};
  letter-spacing: -0.2rem;
  line-height: 4.8rem;

  ${minWidth.lg`
    font-size: 20.8rem;
    letter-spacing: -1rem;
    line-height: 20.8rem;
  `}
`;

export const Display2 = styled.h2`
  font-size: 8rem;
  font-weight: ${fontWeights.black};
  letter-spacing: -0.4rem;
  line-height: 8rem;

  ${minWidth.lg`
    font-size: 14.4rem;
    letter-spacing: -0.7rem;
    line-height: 14.4rem;
  `}
`;

export const Display3 = styled.h3`
  font-size: 4rem;
  font-weight: ${fontWeights.black};
  letter-spacing: -0.15rem;
  line-height: 4rem;

  ${minWidth.lg`
    font-size: 11.2rem;
    letter-spacing: -0.5rem;
    line-height: 11.2rem;
  `}
`;

export const Display4 = styled.p`
  font-size: 1.6rem;
  letter-spacing: 0;
  line-height: 2.4rem;

  ${minWidth.lg`
    font-size: 2rem;
    letter-spacing: 0;
    line-height: 3.2rem;
  `}
`;

export const AnchorId = styled.span`
  display: block;
  opacity: 0;
  position: relative;
  top: -${navHeight.smToLg}rem;

  ${minWidth.lg`
    top: -${navHeight.mlUp}rem;
  `}
`;

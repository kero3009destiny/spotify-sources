import styled, { css } from 'styled-components';

import { minWidth } from 'styles/media-queries';
import { fontWeights } from 'styles/variables';

// Intro styles
export const introTypographyXsToMd = css`
  font-size: 2.4rem;
  letter-spacing: -0.05rem;
  line-height: 3.2rem;
`;
export const introTypographyLgToXl = css`
  font-size: 3rem;
  font-weight: ${fontWeights.light};
  letter-spacing: -0.1rem;
  line-height: 4rem;
`;

// Styled Components
export const Intro = styled.div`
  ${minWidth.lg`
    grid-column: 4 / span 8;
  `}
`;

export const Content = styled.div`
  /* Markdown body overrides */
  & p,
  & span {
    ${introTypographyXsToMd}
  }

  strong {
    font-weight: ${fontWeights.black};
  }

  ${minWidth.lg`

    /* Markdown body overrides */
    & p,
    & span {
      ${introTypographyLgToXl}
    }
  `}
`;

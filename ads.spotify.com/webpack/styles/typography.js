import { css } from 'styled-components';

import { colors } from './variables';
import { minWidth } from './media-queries';

export const caption = css`
  color: ${colors.black};
  font-size: 1.4rem;
  letter-spacing: 0;
  line-height: 1.6rem;

  ${minWidth.lg`
    font-size: 1.6rem;
    line-height: 2.4rem;
  `}
`;

const globalTypographyStyles = css`
  body {
    color: ${colors.black};
    font-size: 1.6rem;
    line-height: 2.4rem;
    letter-spacing: normal;

    ${minWidth.lg`
      font-size: 2rem;
      line-height: 3.2rem;
    `}
  }

  hr {
    border-top: 0.1rem solid ${colors.grey400};
  }

  caption {
    ${caption}
  }
`;

export default globalTypographyStyles;

import styled, { css } from 'styled-components';

import { columnsGutter, container } from 'styles/grid';
import { minWidth } from 'styles/media-queries';
import { fontWeights } from 'styles/variables';
import { getModifierStyles } from 'utils/get-modifier-styles';

// Modifier styles
const GRID_RTEWRAPPER = css`
  ${container}
  ${columnsGutter}

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  margin-bottom: 2.4rem;

  ${minWidth.lg`
    margin-bottom: 4.8rem;
  `}
`;

const GRID_RTECONTAINER = css`
  grid-column: 1 / 13;

  ${minWidth.lg`
    grid-column: 4 / 10;
  `}
`;

// Style modifier map
export const STYLE_MAP = {
  RTEWrapper: {
    grid: GRID_RTEWRAPPER,
  },
  RTEContainer: {
    grid: GRID_RTECONTAINER,
  },
};

export const RTEWrapper = styled.div`
  ${({ theme }) =>
    theme.modifier && getModifierStyles(theme, STYLE_MAP.RTEWrapper)}
`;

export const RTEContainer = styled.div`
  ${({ theme }) =>
    theme.modifier && getModifierStyles(theme, STYLE_MAP.RTEContainer)}
`;

export const RTE = styled.div`
  & > h1,
  & > h2,
  & > h3,
  & > h4,
  & > h5,
  & > h6,
  & > ul,
  & > ol,
  & > hr {
    margin-bottom: 2.4rem;

    ${minWidth.lg`
      margin-bottom: 4.8rem;
    `}

    &:last-child {
      margin-bottom: 0;
    }
  }

  & > p {
    margin-bottom: 1.6rem;

    ${minWidth.lg`
      margin-bottom: 2.4rem;
    `}

    &:last-child {
      margin-bottom: 0;
    }
  }

  ul,
  ol {
    padding-left: 4rem;
  }

  ul {
    list-style: disc;
  }

  ol {
    list-style: decimal;
  }

  a {
    text-decoration: underline;
  }

  b {
    font-weight: ${fontWeights.black};
  }

  h1,
  h2 {
    ${minWidth.lg`
      margin-bottom: 4rem;
      margin-top: 5.6rem;
    `}
  }

  h3,
  h4,
  h5 {
    ${minWidth.lg`
      margin-bottom: 3.2rem;
      margin-top: 4.8rem;
    `}
  }

  h6 {
    ${minWidth.lg`
      margin-bottom: 2.4rem;
      margin-top: 4rem;
    `}
  }
`;

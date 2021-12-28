import styled, { css } from 'styled-components';

import { Cta as CtaComponent } from 'components/atoms';

import { columnsGutter, container } from 'styles/grid';
import { minWidth } from 'styles/media-queries';
import { colors, fontWeights } from 'styles/variables';
import { caption } from 'styles/typography';
import { getModifierStyles } from 'utils/get-modifier-styles';
import { getThemeColor } from 'utils/get-theme-color';

// Modifier styles
const GRID_MARKDOWN_WRAPPER = css`
  ${container}
  ${columnsGutter}

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  margin: 4rem auto;

  ${minWidth.lg`
    margin: 8rem auto;
  `}
`;

const GRID_MARKDOWN_CONTAINER = css`
  grid-column: 1 / 13;

  ${minWidth.lg`
    grid-column: 4 / 10;
  `}
`;

// Style modifier map
export const STYLE_MAP = {
  MarkdownWrapper: {
    grid: GRID_MARKDOWN_WRAPPER,
  },
  MarkdownContainer: {
    grid: GRID_MARKDOWN_CONTAINER,
  },
};

export const MarkdownWrapper = styled.div`
  ${({ theme }) =>
    theme.modifier && getModifierStyles(theme, STYLE_MAP.MarkdownWrapper)}
`;

export const MarkdownContainer = styled.div`
  ${({ theme }) =>
    theme.modifier && getModifierStyles(theme, STYLE_MAP.MarkdownContainer)}
`;

export const Markdown = styled.div`
  color: ${({ theme: themeProps }) => getThemeColor(themeProps.theme)};

  & h1,
  & h2,
  & h3,
  & h4,
  & h5,
  & h6,
  & ul,
  & ol,
  & hr {
    margin-bottom: 2.4rem;

    ${minWidth.lg`
      margin-bottom: 4.8rem;
    `}

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  & p {
    margin-bottom: 1.6rem;

    ${minWidth.lg`
      margin: 2.4rem 0;
    `}

    &:first-child {
      margin-top: 0;
    }

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

  b,
  strong {
    font-weight: ${fontWeights.black};
  }

  img {
    max-width: 100%;
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

export const MarkdownFootnote = styled.span`
  ${caption}

  color: ${({ theme: themeProps }) =>
    themeProps.theme ? 'inherit' : colors.grey400};
  display: block;
  margin: 0.8rem 0;
  white-space: pre-line;

  & ul,
  & ol {
    list-style-position: inside;
    padding-left: 0;
  }
`;

export const CtaWrapper = styled.div`
  display: block;
  margin-bottom: 3.2rem;
  margin-top: 3.2rem;

  ${minWidth.lg`
    margin-bottom: 4rem;
    margin-top: 4rem;
  `}

  &:last-child {
    margin-bottom: 0;
  }
`;

export const UnorderedLists = styled.ul`
  ${minWidth.lg`
    ${columnsGutter}

    display: grid;
    grid-template-columns: ${({ oneColumn }) =>
      oneColumn ? '1fr' : '1fr 1fr'};
  `}
`;

export const Cta = styled(CtaComponent)`
  text-align: center;
  width: 100%;

  ${minWidth.lg`
    width: auto;
  `}

  && {
    text-decoration: none;
  }
`;

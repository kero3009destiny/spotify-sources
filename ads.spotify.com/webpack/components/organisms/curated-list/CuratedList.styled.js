import styled, { css } from 'styled-components';

import { Headline } from 'components/atoms/headline';
import { container, columnsGutter, offset } from 'styles/grid';
import { minWidth } from 'styles/media-queries';
import { getModifierStyles } from 'utils/get-modifier-styles';

const EMPTY_MODIFIER = css``; // empty to avoid `getModifierStyles` console warning

// Modifier styles
const DEFAULT_CONTAINER = css`
  ${container}
`;

const LARGE_CONTAINER = css`
  ${minWidth.lg`
    ${container}
  `}
`;

const GRID = css`
  ${minWidth.lg`
    grid-template-columns: 12fr;
  `}
`;

const TWO_CARD_GRID = css`
  ${minWidth.lg`
    grid-template-columns: 6fr 6fr;
  `}
`;

const OUTSIDE_OFFSET = css`
  padding-left: ${offset.xs}px;
  padding-right: ${offset.xs}px;

  ${minWidth.sm`
    padding-left: ${offset.sm}px;
    padding-right: ${offset.sm}px;
  `}

  ${minWidth.md`
    padding-left: ${offset.md}px;
    padding-right: ${offset.md}px;
  `}

  ${minWidth.lg`
    padding-left: 0;
    padding-right: 0;
  `}
`;

// Style modifier map
const STYLE_MAP = {
  Container: {
    oneUp: LARGE_CONTAINER,
    twoUp: DEFAULT_CONTAINER,
  },
  Content: {
    oneUp: GRID,
    twoUp: TWO_CARD_GRID,
  },
  Title: {
    oneUp: OUTSIDE_OFFSET,
    twoUp: EMPTY_MODIFIER,
  },
};

// Styled Components
export const CuratedList = styled.section`
  background-color: ${props => props.backgroundColor || 'transparent'};
  padding-bottom: 6.4rem;
  padding-top: 4.8rem;
  position: relative;

  ${minWidth.lg`
    padding-bottom: 12rem;
    padding-top: 11.2rem;
  `}
`;

export const Container = styled.div`
  /* Default case will be the container in all viewports */
  ${({ theme }) =>
    (theme.modifier && getModifierStyles(theme, STYLE_MAP.Container)) ||
    DEFAULT_CONTAINER}
`;

export const Title = styled(Headline)`
  margin-bottom: 4rem;

  ${minWidth.lg`
    margin-bottom: 6.4rem;
  `}

  ${({ theme }) => theme.modifier && getModifierStyles(theme, STYLE_MAP.Title)}
`;

export const Content = styled.div`
  ${minWidth.lg`
    ${columnsGutter}

    display: grid;
    grid-template-columns: 4fr 4fr 4fr;
  `}

  ${({ theme }) =>
    theme.modifier && getModifierStyles(theme, STYLE_MAP.Content)}
`;

export const CardContainer = styled.div`
  margin-bottom: 3.2rem;

  &:last-child {
    margin-bottom: 0;
  }

  ${minWidth.lg`
    margin-bottom: 0;
  `}
`;

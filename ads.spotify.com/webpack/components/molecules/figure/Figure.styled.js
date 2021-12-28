import styled, { css } from 'styled-components';

import { getModifierStyles } from 'utils/get-modifier-styles';
import { caption } from 'styles/typography';
import { colors } from 'styles/variables';
import { container, columnsGutter } from 'styles/grid';
import { minWidth } from 'styles/media-queries';

// Modifier styles
const GRID_FIGUREWRAPPER = css`
  ${container}
  ${columnsGutter}

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  margin: 4rem auto;

  ${minWidth.lg`
    margin: 8rem auto;
  `}
`;
const GRID_FIGURE = css`
  grid-column: 1 / 13;

  ${minWidth.lg`
    grid-column: 4 / 10;
  `}
`;

// Style modifier map
const STYLE_MAP = {
  FigureWrapper: {
    PageDetail: GRID_FIGUREWRAPPER,
  },
  Figure: {
    PageDetail: GRID_FIGURE,
  },
};

// Styled components
export const FigureWrapper = styled.div`
  ${props =>
    props.modifier && getModifierStyles(props, STYLE_MAP, 'FigureWrapper')}
`;

export const Figure = styled.figure`
  ${props => props.modifier && getModifierStyles(props, STYLE_MAP, 'Figure')}
`;

export const FigCaption = styled.figcaption`
  ${caption}

  color: ${colors.grey400};
`;

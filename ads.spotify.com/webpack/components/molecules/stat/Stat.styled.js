import styled, { css } from 'styled-components';

import { getModifierStyles } from 'utils/get-modifier-styles';
import { Headline, Paragraph } from 'components/atoms';
import { colors, fontWeights, minBreakpoints } from 'styles/variables';
import { columnsGutter } from 'styles/grid';
import { minWidth, minMax } from 'styles/media-queries';
import {
  fadeContentSlideUp,
  ACTIVATE_ANIMATION_CLASS,
} from 'styles/animations';

// Modifier styles
const getGridStatTextModification = () => {
  return numStats => {
    return css`
      ${minMax(minBreakpoints.lg, minBreakpoints.xl)`
    /*
     * Use viewport measurements for fluid text. 'Contain' within grid.
     * https://css-tricks.com/fitting-text-to-a-container/#article-header-id-0
     */
    font-size: ${numStats < 3 ? '9.25vw' : '6.75vw'} ;
    line-height: 1;
  `}
    `;
  };
};

// Style modifier map
const STYLE_MAP = {
  StatText: {
    grid: getGridStatTextModification(),
  },
};

// Empty styled component allows for `as` prop rendering
export const Stat = styled.div``;

const getStatTextSize = numStats => {
  if (numStats === 1) {
    return '24rem';
  }
  if (numStats >= 3) {
    return '10.4rem';
  }
  return '';
};

export const StatText = styled(Headline).attrs({
  tag: 'span',
  styling: 'display2',
})`
  color: ${props => props.textColor || colors.black};
  display: inline-block;
  font-weight: ${fontWeights.black};
  margin-bottom: 1rem;
  ${fadeContentSlideUp.setup}

  &.${ACTIVATE_ANIMATION_CLASS} {
    ${fadeContentSlideUp.play}
  }

  ${minWidth.lg`
    font-size: ${({ numStats }) => getStatTextSize(numStats)};
    line-height: ${({ numStats }) => getStatTextSize(numStats)};
  `};

  ${props =>
    props.modifier &&
    getModifierStyles(props, STYLE_MAP.StatText)(props.numStats)}
`;

export const StatTitle = styled(Paragraph)`
  font-weight: ${fontWeights.black};
  margin-bottom: 0.8rem;

  ${minWidth.lg`
    letter-spacing: -0.05rem;
  `}

  ${props => (props.textColor ? `color: ${props.textColor};` : '')}
`;

const statDesc = css`
  font-size: 1.4rem;
  line-height: 2.4rem;

  ${minWidth.lg`
    font-size: 1.6rem;
  `}
`;

export const StatContainer = styled.div`
  ${minWidth.lg`
    ${props => props.uniqueStat && columnsGutter}

    display: ${props => (props.uniqueStat ? 'grid' : '')};;
    grid-template-columns: ${props =>
      props.uniqueStat ? 'repeat(8, 1fr)' : ''};

    & > div, & > p {
      grid-column: ${props => (props.uniqueStat ? '1 / 5;' : '')};
    }
  `}
`;

export const StatDescription = styled.div`
  ${statDesc}
  ${props => (props.textColor ? `color: ${props.textColor};` : '')}

  & p {
    ${statDesc}
  }
`;

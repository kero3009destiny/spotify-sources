import styled, { css } from 'styled-components';

import { Headline as HeadlineComponent } from 'components/atoms';
import { CuratedList as CuratedListComponent } from 'components/organisms/curated-list';
import { colors } from 'styles/variables';
import { columnsGutter } from 'styles/grid';
import { minWidth } from 'styles/media-queries';
import {
  fadeContentSlideUp,
  ACTIVATE_ANIMATION_CLASS,
} from 'styles/animations';
import { getModifierStyles } from 'utils/get-modifier-styles';
import { levels } from 'styles/z-index';

export const MODIFIERS = {
  BOTTOM_SPACING: 'BOTTOM_SPACING',
};

const HEAD_CURATED_BOTTOM_SPACING = css`
  margin-bottom: 4.8rem;

  ${minWidth.lg`
    margin-bottom: 13.6rem;
  `}
`;

// Style modifier map
const STYLE_MAP = {
  LeadCuratedList: {
    [MODIFIERS.BOTTOM_SPACING]: HEAD_CURATED_BOTTOM_SPACING,
  },
};

export const Statement = styled.section``;

export const Content = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor || colors.white};
  padding-bottom: 4rem;
  padding-top: 4.9rem;

  ${minWidth.lg`
    padding-bottom: 11.2rem;
    padding-top: 11.2rem;
  `}
`;

export const Grid = styled.div`
  ${minWidth.lg`
    ${columnsGutter}

    display: grid;
    grid-template-columns: repeat(12, 1fr);
  `}
`;

export const IntroContainer = styled.div`
  color: ${({ theme }) => theme.introColor || colors.white};
  grid-column: span 6;
  margin-bottom: 5.6rem;

  ${minWidth.lg`
    margin-bottom: 16rem;
  `}
`;

export const IntroHeadline = styled(HeadlineComponent).attrs({
  tag: 'h6',
  styling: 'h6',
})`
  margin-bottom: 1.5rem;

  ${minWidth.lg`
    margin-bottom: 2.5rem;
  `}
`;

export const Headline = styled(HeadlineComponent).attrs({
  tag: 'h2',
  styling: 'display1',
})`
  ${fadeContentSlideUp.setup}

  &.${ACTIVATE_ANIMATION_CLASS} {
    ${fadeContentSlideUp.play}
  }
`;

export const StatementContainer = styled.div`
  color: ${({ theme }) => theme.statementColor || colors.white};
  grid-column: span 12;
`;

export const LeadCuratedList = styled(CuratedListComponent).attrs({
  tag: 'div',
})`
  padding-bottom: 0;
  padding-top: 0;

  ${props =>
    props.modifier && getModifierStyles(props, STYLE_MAP.LeadCuratedList)}
`;

export const CuratedList = styled(CuratedListComponent).attrs({
  tag: 'div',
})`
  margin-bottom: 4.8rem;
  margin-top: 4rem;
  padding-bottom: 0;
  padding-top: 0;

  ${minWidth.lg`
    margin-bottom: 13.6rem;
    margin-top: 8rem;
  `}
`;

export const Band = styled.div`
  background-color: ${props => props.color || 'transparent'};
  height: 20%; /* Covering happy path for small viewport content height */
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: ${levels.behind};

  ${minWidth.lg`
    height: ${props => props.percentageHeight}%;
  `}
`;

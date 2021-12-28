import styled, { css } from 'styled-components';

import { Cta as CtaComponent } from 'components/atoms';
import {
  ctaHoverState,
  textLinkHoverState,
} from 'components/atoms/cta/Cta.styled';
import { minWidth } from 'styles/media-queries';
import { columnsGutter, relativeOffset } from 'styles/grid';
import { animations, colors, ratioPercentage } from 'styles/variables';
import { getModifierStyles } from 'utils/get-modifier-styles';

// Modifier styles
const DEFAULT = css``; // Requires empty style rule to prevent console warning

const ONEUP_CARD = css`
  ${minWidth.lg`
    ${columnsGutter}

    display: grid;
    grid-template-columns: repeat(12, 1fr);
  `}
`;

const ONEUP_IMAGE = css`
  margin-bottom: 0;

  ${minWidth.lg`
    grid-column: 1 / span 8;
    grid-row: 1 / span 3;
  `}
`;

const ONEUP_CONTENT = css`
  background-color: ${colors.black};
  color: ${colors.white};
  margin-left: ${relativeOffset.xs}rem;
  margin-right: ${relativeOffset.xs}rem;
  margin-top: -4.8rem;
  padding: 2.4rem 2.6rem 7.2rem 2.4rem;

  ${minWidth.sm`
    margin-left: ${relativeOffset.sm}rem;
    margin-right: ${relativeOffset.sm}rem;
    margin-top: -16rem;
    padding-bottom: 9.6rem;
    padding-right: 3.2rem;
  `}

  ${minWidth.md`
    margin-left: ${relativeOffset.md}rem;
    margin-right: ${relativeOffset.md}rem;
    padding-left: 4rem;
    padding-right: 3.7rem;
    padding-top: 4.8rem;
  `}

  ${minWidth.lg`
    grid-column: 6 / span 7;
    grid-row: 2;
    margin: 0;
    min-height: 43.2rem;
    padding-bottom: 7.2rem;
    padding-left: 4.8rem;
    padding-right: 5rem;
  `}

  ${minWidth.xl`
    grid-column: 7 / span 6;
    min-height: 49.6rem;
    padding-right: 5.7rem;
  `}
`;

const ONEUP_EYEBROW_CONTAINER = css`
  ${minWidth.lg`
    margin-bottom: 2.4rem;
  `}
`;

const ONEUP_HEADLINE_CONTAINER = css`
  margin-bottom: 2.4rem;

  ${minWidth.lg`
    margin-bottom: 4rem;
  `}
`;

const RoundedCTA = styled(CtaComponent).attrs({
  tag: 'span',
})`
  background-color: ${colors.black};
  border-color: ${colors.white};
  color: ${colors.white};
`;

const TextCTA = styled(CtaComponent).attrs({
  type: 'TextLink',
  tag: 'span',
})``;

// Style modifier map
export const STYLE_MAP = {
  Card: {
    oneUp: ONEUP_CARD,
    twoUp: DEFAULT,
  },
  Image: {
    oneUp: ONEUP_IMAGE,
    twoUp: DEFAULT,
  },
  Content: {
    oneUp: ONEUP_CONTENT,
    twoUp: DEFAULT,
  },
  EyebrowContainer: {
    oneUp: ONEUP_EYEBROW_CONTAINER,
    twoUp: DEFAULT,
  },
  HeadlineContainer: {
    oneUp: ONEUP_HEADLINE_CONTAINER,
    twoUp: DEFAULT,
  },
};

// Component map for conditional rendering
export const COMPONENT_MAP = {
  CTA: {
    oneUp: RoundedCTA,
    default: TextCTA,
  },
};

// Styled Components

export const Image = styled.div.attrs({
  role: 'img',
})`
  display: block;
  margin-bottom: 2.4rem;
  overflow: hidden;
  padding-top: ${ratioPercentage.fourThree}%;
  position: relative;

  &::before {
    background: no-repeat 50% / cover ${props => `url(${props['data-src']})`};
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: transform ${animations.defaultTransition};
    will-change: transform;
  }

  ${({ theme }) => theme.modifier && getModifierStyles(theme, STYLE_MAP.Image)}
`;

export const Content = styled.div`
  position: relative;

  ${({ theme }) =>
    theme.modifier && getModifierStyles(theme, STYLE_MAP.Content)}
`;

export const EyebrowContainer = styled.div`
  margin-bottom: 1.6rem;

  span {
    display: block;
  }

  ${({ theme }) =>
    theme.modifier && getModifierStyles(theme, STYLE_MAP.EyebrowContainer)}
`;

export const HeadlineContainer = styled.div`
  margin-bottom: 0.8rem;

  ${minWidth.lg`
    margin-bottom: 1.6rem;
  `}

  ${({ theme }) =>
    theme.modifier && getModifierStyles(theme, STYLE_MAP.HeadlineContainer)}
`;

export const Cta = styled(CtaComponent).attrs({
  type: 'wrapper',
})``;

export const Card = styled.span`
  color: ${colors.black};
  display: block;

  &:hover {
    text-decoration: none;

    ${Image}::before {
      transform: scale(1.1);
    }

    ${RoundedCTA} {
      ${ctaHoverState}
    }

    ${TextCTA} {
      ${textLinkHoverState}
    }
  }

  ${({ theme }) => theme.modifier && getModifierStyles(theme, STYLE_MAP.Card)}
`;

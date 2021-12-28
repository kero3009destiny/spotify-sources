import styled, { css } from 'styled-components';

import { Headline, Paragraph, Cta as CtaComponent } from 'components/atoms';
import { colors, fontWeights } from 'styles/variables';
import { minWidth } from 'styles/media-queries';
import { container, columnsGutter } from 'styles/grid';
import { getModifierStyles } from 'utils/get-modifier-styles';
import { showUpFromLeft, ACTIVATE_ANIMATION_CLASS } from 'styles/animations';
import { levels } from 'styles/z-index';

import { multiple } from 'components/atoms/cta/Cta.styled';
import RectangleBurst from './assets/spotify-hero-burst-01.svg';
import TriangleBurst from './assets/spotify-hero-burst-02.svg';

const EMPTY_MODIFIER = css``; // empty to avoid `getModifierStyles` console warning

export const MODIFIERS = {
  forestCitric: 'Forest background - Citric Title',
  goldMidnight: 'Gold background - Midnight Title',
  salmonMidnight: 'Salmon background - Midnight Title',
  withBackground: 'withBackground',
};

const TITLE_INTRO_WHITE = css`
  color: ${colors.white};
`;

const TITLE_INTRO_CITRIC = css`
  color: ${colors.citric};
`;

const TITLE_INTRO_MIDNIGHT = css`
  color: ${colors.midnight};
`;

const DESCRIPTION_WHITE = css`
  color: ${colors.white};
`;

const BURST_FOREST = css`
  background-color: ${colors.forest};

  path {
    fill: ${colors.midnight};
  }
`;

const BURST_YELLOW = css`
  background-color: ${colors.gold};

  path {
    fill: ${colors.factoryYellow};
  }
`;

const BURST_SALMON = css`
  background-color: ${colors.salmon};

  path {
    fill: ${colors.aquamarine};
  }
`;

// Style modifier map
const STYLE_MAP = {
  TitleIntro: {
    [MODIFIERS.forestCitric]: TITLE_INTRO_CITRIC,
    [MODIFIERS.goldMidnight]: TITLE_INTRO_MIDNIGHT,
    [MODIFIERS.salmonMidnight]: TITLE_INTRO_MIDNIGHT,
    [MODIFIERS.withBackground]: TITLE_INTRO_WHITE,
  },
  Description: {
    [MODIFIERS.forestCitric]: DESCRIPTION_WHITE,
    [MODIFIERS.goldMidnight]: EMPTY_MODIFIER,
    [MODIFIERS.salmonMidnight]: EMPTY_MODIFIER,
    [MODIFIERS.withBackground]: DESCRIPTION_WHITE,
  },
  Burst: {
    [MODIFIERS.forestCitric]: BURST_FOREST,
    [MODIFIERS.goldMidnight]: BURST_YELLOW,
    [MODIFIERS.salmonMidnight]: BURST_SALMON,
    [MODIFIERS.withBackground]: EMPTY_MODIFIER,
  },
};

export const Root = styled.div`
  ${container}

  position: relative;
  overflow: hidden;
  margin-bottom: 4.6rem;

  ${minWidth.lg`
    margin-bottom: 9.6rem;
  `}
`;

export const Container = styled.div`
  ${columnsGutter}

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  padding-bottom: 18%; /* at 320px width it represents almost 50px as per designs */
  padding-top: 18%; /* at 320px width it represents almost 56px as per designs */

  ${minWidth.lg`
    padding-bottom: 12%; /* at 1680px width it represents almost 200px as per designs */
    padding-top: 12%; /* at 1680px width it represents almost 200px as per designs */
  `}
`;

export const TitleContainer = styled.div`
  grid-column: 1 / 13;
  height: ${props => (props.titleHeight ? `${props.titleHeight}px` : 'auto')};
  margin-bottom: 2.4rem;
  position: relative;
  transition: height 350ms 500ms ease-out;

  ${minWidth.lg`
    grid-column: 1 / 10;
    margin-bottom: 3.2rem;
  `}
`;

export const ContentContainer = styled.div`
  grid-column: 1 / 13;

  ${minWidth.lg`
    grid-column: 1 / 7;
  `}
`;

export const TitleIntro = styled(Headline).attrs({ as: 'h1' })`
  color: ${props => props.color};
  font-size: 4.8rem;
  font-weight: ${fontWeights.black};
  letter-spacing: -0.2rem;
  line-height: 4.8rem;

  ${minWidth.lg`
    font-size: 8.8rem;
    letter-spacing: -0.4rem;
    line-height: 8.8rem;
  `}

  ${minWidth.xl`
    font-size: 14.4rem;
    letter-spacing: -0.7rem;
    line-height: 14.4rem;
  `}

  ${props => props.modifier && getModifierStyles(props, STYLE_MAP.TitleIntro)}
`;

export const OutroTextLeaving = styled(TitleIntro).attrs({ as: 'span' })`
  opacity: 1;

  &.show {
    animation: show 500ms 500ms ease-in forwards;
  }

  &.hide {
    animation: hide 350ms 500ms ease-in forwards;
  }

  @keyframes show {
    to {
      opacity: 1;
    }
  }

  @keyframes hide {
    to {
      opacity: 0;
    }
  }
`;

export const OutroTextEntering = styled(OutroTextLeaving)`
  opacity: 0;
  z-index: ${levels.behind};
`;

export const TitleIntroDupe = styled(TitleIntro).attrs({ as: 'span' })`
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

export const Description = styled(Paragraph)`
  color: ${props => props.color};
  margin-bottom: 3.2rem;

  ${minWidth.lg`
    margin-bottom: 4rem;
  `}

  ${props => props.modifier && getModifierStyles(props, STYLE_MAP.Description)}
`;

export const Cta = styled(CtaComponent)`
  ${multiple}
`;

const absoluteFill = css`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

export const Burst = styled.div`
  ${absoluteFill}

  z-index: ${levels.behind};

  svg {
    bottom: 0;
    height: auto;
    min-height: 100%;
    position: absolute;
    width: 100%;
    ${showUpFromLeft.setup};
  }

  &.${ACTIVATE_ANIMATION_CLASS} svg {
    ${showUpFromLeft.play};
  }

  ${props => props.modifier && getModifierStyles(props, STYLE_MAP.Burst)}
`;

export const HeroRectangleBurst = styled(RectangleBurst)`
  path {
    transform: translateY(100px); /** xs viewport fix for RectangleBurst */
  }

  ${minWidth.sm`
    path {
      transform: none;
    }
  `}
`;

export const HeroTriangleBurst = styled(TriangleBurst)``;

export const BackgroundOverlay = styled.div`
  ${absoluteFill}

  background-color: rgba(0, 0, 0, 0.5);
`;

export const BackgroundVideo = styled.video`
  height: 100%;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 100%;
`;

export const BackgroundImage = styled.img`
  height: 100%;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 100%;
`;

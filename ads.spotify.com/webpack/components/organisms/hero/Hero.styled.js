import styled, { css } from 'styled-components';

import { container, offset, columnsGutter } from 'styles/grid';
import { minWidth, minMax, maxWidth } from 'styles/media-queries';
import { getModifierStyles } from 'utils/get-modifier-styles';
import { levels } from 'styles/z-index';
import { colors, minBreakpoints, ratioPercentage } from 'styles/variables';
import {
  fadeContentSlideUp,
  ACTIVATE_ANIMATION_CLASS,
} from 'styles/animations';
import { multiple } from 'components/atoms/cta/Cta.styled';

import { Cta as CtaComponent } from 'components/atoms/cta';
import { Paragraph } from 'components/atoms/paragraph';
import { ResponsiveImage } from 'components/atoms/responsive-image';
import { Headline } from 'components/atoms/headline';

/* Buffer */
const buffer = {
  sm: 40,
  lg: 80,
};

// Modifier styles
const LEFT_BOX = css`
  height: 100%;
  width: 100%;
`;

const FIT_ASPECT_RATIO = css`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

const EMPTY_MODIFER = css``; // empty to avoid `getModifierStyles` console warning

// Variation references https://huge.invisionapp.com/d/main#/console/13945729/290585045/preview
export const MODIFIERS = {
  useA: 'useA', // image left, text right
  useB: 'useB', // text left, image right
  useC: 'useC', // text only
  useD: 'useD', // text only, eyebrow
};

const ROOT_A = css`
  color: ${props => props.textColor || colors.black};
`;

const ROOT_B = css`
  color: ${props => props.textColor || colors.white};
`;

const ROOT_C = css`
  color: ${colors.black};
  margin-bottom: 4rem;

  ${minWidth.lg`
    margin-bottom: 8rem;
  `}
`;

const ROOT_D = css`
  color: ${colors.black};
  margin-bottom: 3.2rem;

  ${minWidth.lg`
    margin-bottom: 6.4rem;
  `}
`;

const CONTAINER_C = css`
  ${container}

  padding-top: 8rem;

  ${minWidth.lg`
    padding-top: 16rem;
  `}
`;

const CONTAINER_D = css`
  ${container}

  padding-top: 4.8rem;

  ${minWidth.lg`
    padding-top: 11.2rem;
  `}
`;

const CONTENT_A = css`
  align-items: center;
  background-color: ${props => props.backgroundColor || colors.spotifyGreen};
  display: flex;
  padding-bottom: 6.4rem;
  padding-left: ${offset.xs}px;
  padding-right: ${offset.xs}px;
  padding-top: 34%;

  ${minWidth.sm`
    padding-left: ${offset.sm}px;
    padding-right: ${offset.sm}px;
    padding-bottom: 8rem;
  `}

  ${minWidth.md`
    padding-left: ${offset.md}px;
    padding-right: ${offset.md}px;
  `}

  ${minWidth.lg`
    ${FIT_ASPECT_RATIO}

    justify-content: flex-end;
    padding: 0;
  `}

  & .content-container {
    padding-bottom: 4rem;

    ${minWidth.lg`
      margin-right: 6.5%;
      max-width: 56.43%;
      padding: 0;
      width: 100%;
    `}
  }

  & .eyebrow {
    display: none;
  }
`;

const CONTENT_B = css`
  background-color: ${props => props.backgroundColor || colors.black};
  height: auto;
  padding: 2.4rem 2.4rem 10.4rem 2.6rem;
  width: 100%;

  ${minWidth.sm`
    padding-bottom: 12rem;
  `}

  ${minWidth.lg`
    ${LEFT_BOX}

    padding: 7.2rem 8rem 0 8rem;
  `}
`;

const CONTENT_C = css`
  background: none;
  color: ${colors.black};
  grid-column: 1 / 13;

  & .title {
    font-size: 4rem;
    line-height: 4rem;

    ${minWidth.lg`
      font-size: 14.4rem;
      letter-spacing: -0.7rem;
      line-height: 14.4rem;
    `}
  }

  & .eyebrow {
    display: none;
  }
`;

const CONTENT_D = css`
  background: none;
  color: ${colors.black};
  grid-column: 4 / 10;

  & .eyebrow {
    margin-bottom: 2.4rem;
  }
`;

const FIGURE_A = css`
  ${LEFT_BOX}
`;

const FIGURE_B = css`
  ${FIT_ASPECT_RATIO}
`;

const FLOATING_BOX_A = css`
  ${maxWidth.md`
    left: 0;
    margin-bottom: -25%;
    position: relative;
    width: 100%;
  `}
`;

const FLOATING_BOX_B = css`
  ${maxWidth.md`
    margin-top: -10%;
    order: 1;
    position: relative;

    & .floatingbox-wrapper {
      height: auto;
      padding-top: 0;
    }

    & .floatingbox-content {
      height: auto;
      position: relative;
    }
  `}

  ${minWidth.lg`
    min-width: 610px;
  `}
`;

// Style modifier map
const STYLE_MAP = {
  Root: {
    [MODIFIERS.useA]: ROOT_A,
    [MODIFIERS.useB]: ROOT_B,
    [MODIFIERS.useC]: ROOT_C,
    [MODIFIERS.useD]: ROOT_D,
  },
  Container: {
    [MODIFIERS.useA]: EMPTY_MODIFER,
    [MODIFIERS.useB]: EMPTY_MODIFER,
    [MODIFIERS.useC]: CONTAINER_C,
    [MODIFIERS.useD]: CONTAINER_D,
  },
  Content: {
    [MODIFIERS.useA]: CONTENT_A,
    [MODIFIERS.useB]: CONTENT_B,
    [MODIFIERS.useC]: CONTENT_C,
    [MODIFIERS.useD]: CONTENT_D,
  },
  Figure: {
    [MODIFIERS.useA]: FIGURE_A,
    [MODIFIERS.useB]: FIGURE_B,
    [MODIFIERS.useC]: EMPTY_MODIFER,
    [MODIFIERS.useD]: EMPTY_MODIFER,
  },
  FloatingBox: {
    [MODIFIERS.useA]: FLOATING_BOX_A,
    [MODIFIERS.useB]: FLOATING_BOX_B,
    [MODIFIERS.useC]: EMPTY_MODIFER,
    [MODIFIERS.useD]: EMPTY_MODIFER,
  },
};

export const Header = styled.header`
  margin-bottom: 4.8rem;

  ${minWidth.lg`
    margin-bottom: 9.6rem;
  `}

  ${props => props.modifier && getModifierStyles(props, STYLE_MAP.Root)}
`;

export const FloatingBox = styled.div`
  left: ${offset.xs}px;
  position: absolute;
  top: 0;
  width: calc(100% - ${offset.xs * 2}px);
  z-index: ${levels.base};

  ${minWidth.sm`
    left: ${offset.sm}px;
    width: calc(100% - ${offset.sm * 2}px);
  `}

  ${minWidth.md`
    left: ${offset.md}px;
    width: calc(100% - ${offset.md * 2}px);
  `}

  ${minWidth.lg`
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 50%;
  `}

  ${props => props.modifier && getModifierStyles(props, STYLE_MAP.FloatingBox)}
`;

export const FloatingBoxWrapper = styled.div`
  height: 0;
  padding-top: ${props => `${props.aspectRatio}%`};
  position: relative;
  width: 100%;
`;

export const FloatingBoxContent = styled.div`
  ${FIT_ASPECT_RATIO}
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${buffer.sm}px;
  position: relative;

  ${minWidth.lg`
    ${columnsGutter}
    ${container}

    display: grid;
    grid-template-columns: repeat(12, 1fr);
  `}

  ${props => props.modifier && getModifierStyles(props, STYLE_MAP.Container)}
`;

export const Grid = styled.div`
  /* This (&&) is to avoid using !important */
  ${minWidth.lg`
    grid-column: 4 / 13;

    && {
      margin-right: -${offset.lg}px;
    }
  `}

  ${minWidth.xl`
    && {
      margin-right: -${offset.xl}px;
    }
  `}
`;

export const AspectRatioGrid = styled.div`
  height: 0;
  padding-top: ${ratioPercentage.fourThree}%;
  position: relative;

  ${maxWidth.md`
    &.has-content {
      height: auto;
      padding-top: 0;
    }
  `}

  ${minWidth.lg`
    padding-top: 69%;
  `}
`;

export const Content = styled.div`
  ${props => props.modifier && getModifierStyles(props, STYLE_MAP.Content)}
`;

export const Title = styled(Headline)`
  color: ${props => props.titleColor};

  ${minMax(minBreakpoints.lg, minBreakpoints.xl)`
    font-size: 6.4rem;
    line-height: 6.4rem;
  `}
`;

export const Description = styled(Paragraph)`
  color: ${props => props.color};
  margin-top: 2.4rem;
`;

export const CtaWrapper = styled.div`
  margin-top: 2.4rem;
`;

export const Cta = styled(CtaComponent)`
  ${multiple}
`;

export const ContentContainer = styled.div`
  ${fadeContentSlideUp.setup}

  &.${ACTIVATE_ANIMATION_CLASS} {
    ${fadeContentSlideUp.play}
  }
`;

export const Figure = styled.div`
  height: 100%;

  ${props => props.modifier && getModifierStyles(props, STYLE_MAP.Figure)}
`;

export const FigureImage = styled(ResponsiveImage)`
  height: 100%;
  object-fit: cover;

  ${fadeContentSlideUp.setup}

  &.${ACTIVATE_ANIMATION_CLASS} {
    ${fadeContentSlideUp.play}
  }
`;

export const eyebrowStyles = css`
  margin-bottom: 4rem;
`;

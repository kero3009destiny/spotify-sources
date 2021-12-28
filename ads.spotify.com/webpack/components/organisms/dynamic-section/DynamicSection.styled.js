import styled from 'styled-components';

import {
  Headline as HeadlineComponent,
  Paragraph,
  Cta as CtaComponent,
} from 'components/atoms';
import { ResponsiveImage } from 'components/atoms/responsive-image';
import { colors, fontWeights, animations } from 'styles/variables';
import { levels } from 'styles/z-index';
import { container, columnsGutter } from 'styles/grid';
import { minWidth } from 'styles/media-queries';

export const Root = styled.div`
  background-color: ${colors.transparent};
  position: relative;

  &:last-child {
    /* triggerHook: 0.3 - 100vh = 70vh*/
    padding-bottom: 70vh;

    ${minWidth.lg`
      /* triggerHook: 0.1 - 100vh = 90vh*/
      padding-bottom: 90vh;
    `}
  }

  & .scrollmagic-pin-spacer {
    max-width: 100%;
  }
`;

export const ScrollWrapper = styled.div`
  z-index: ${levels.base};
`;

export const Container = styled.div`
  ${container}
  ${columnsGutter}

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  width: 100%;
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  grid-column: 1 / 13;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  padding: calc(100vh - 72px - 72px) 0 0;
  position: relative;

  ${minWidth.lg`
    grid-column: 2 / 12;
    padding: calc(100vh - 128px - 120px) 0 0;
  `}
`;

export const Headline = styled(HeadlineComponent).attrs(props => ({
  tag: 'h2',
  style: {
    opacity: Number(props.isActive || props.hasReachedEnd),
  },
}))`
  font-size: 9.6rem;
  font-weight: ${fontWeights.black};
  letter-spacing: -0.05rem;
  line-height: 9.6rem;
  letter-spacing: -0.5rem;
  position: absolute;
  top: calc(50vh - 27.1rem);
  transition: opacity ${animations.defaultTransition};

  ${minWidth.lg`
    font-size: 36.8rem;
    letter-spacing: -1.6rem;
    line-height: 36.8rem;
  `}
`;

export const AnimationWrapper = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

export const PageWrapper = styled.div`
  max-width: 100%;
  position: relative;
  z-index: ${levels.base};
`;

export const PageTitle = styled(Paragraph)`
  bottom: 2.4rem;
  color: ${colors.white};
  left: 2.4rem;
  padding-right: 2.4rem;
  position: absolute;
  transition: opacity 0.25s;
  letter-spacing: -0.025rem;
  font-weight: ${fontWeights.black};

  ${minWidth.lg`
    letter-spacing: -0.05rem;
  `}
`;

export const PageItem = styled.div`
  height: 100%;
  position: relative;
  width: 100%;

  &:before {
    color: ${colors.white};
    content: attr(data-text);
    font-size: 2.8rem;
    font-weight: ${fontWeights.black};
    left: 50%;
    letter-spacing: -0.1rem;
    line-height: 3.2rem;
    opacity: 0;
    position: absolute;
    text-align: center;
    top: 50%;
    transform: translate(-50%, 0%);
    transition: opacity 0.25s, transform 0.25s;
    width: 90%;
    z-index: ${levels.highlight};

    ${minWidth.lg`
      font-size: 4.4rem;
      letter-spacing: -0.15rem;
      line-height: 4.8rem;
    `}
  }

  &:after {
    background-color: ${colors.translucent75};
    bottom: 0;
    content: '';
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.25s;
    z-index: ${levels.base};
  }

  &:hover {
    &:before {
      opacity: 1;
      transform: translate(-50%, -50%);
    }

    &:after {
      opacity: 1;
    }

    ${PageTitle} {
      opacity: 0;
    }
  }
`;

const CTA_METRICS = {
  boxWidth: {
    sm: 28,
    lg: 46.9,
  },
  marginRight: {
    lg: 5.6,
  },
};

export const PageCta = styled(CtaComponent).attrs({
  type: 'wrapper',
})`
  display: block;
  height: 21rem;
  position: relative;
  top: 50%;
  width: ${CTA_METRICS.boxWidth.sm}rem;

  ${minWidth.md`
    height: 35.2rem;
    width: ${CTA_METRICS.boxWidth.lg}rem;
  `}

  &:not(:only-child) {
    margin-bottom: 5.6rem;

    ${minWidth.lg`
      margin-bottom: 11.2rem;
    `}
  }

  &:not(:only-child):first-child {
    ${minWidth.lg`
      margin-right: ${CTA_METRICS.marginRight.lg}rem;
    `}
  }

  &:only-child {
    ${minWidth.lg`
      height: 64rem;
      width: 85.5rem;
    `}

    ${PageItem}:before {
      font-size: 3.2rem;
      font-weight: ${fontWeights.black};
      letter-spacing: -0.1rem;
      line-height: 3.2rem;

      ${minWidth.lg`
        font-size: 6rem;
        letter-spacing: -0.25rem;
        line-height: 6.4rem;
      `}
    }
  }
`;

export const PageGroup = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  ${minWidth.lg`
    align-items: flex-start;
    flex-direction: row;
    justify-content: center;

    &:last-child {
      ${PageCta} {
        margin-bottom: 0;
      }
    }

    &:nth-child(3n + 1) ${PageCta}:not(:only-child):last-child {
      height: 62.4rem;
    }

    &:nth-child(3n + 2) ${PageCta}:not(:only-child):first-child {
      height: 62.4rem;
    }

    & + & ${PageCta}:only-child {
      height: 35.2rem;
      margin-right: ${CTA_METRICS.marginRight.lg + CTA_METRICS.boxWidth.lg}rem;
      width: ${CTA_METRICS.boxWidth.lg}rem;
    }
  `}
`;

export const PageImage = styled(ResponsiveImage)`
  display: block;
  height: 100%;
  object-fit: cover;
  width: 100%;
`;

export const PageGradient = styled.div`
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 49.48%,
    ${colors.black} 100%
  );
  bottom: 0;
  content: '';
  left: 0;
  opacity: 0.7;
  position: absolute;
  right: 0;
  top: 0;
`;

export const FallBackImage = styled.div`
  background-color: ${colors.grey300};
  display: block;
  height: 100%;
  width: 100%;
`;

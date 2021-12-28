import styled from 'styled-components';

import { Cta as CtaComponent, Headline, Icon } from 'components/atoms';
import { colors, sideNavHeight } from 'styles/variables';
import { container, columnsGutter } from 'styles/grid';
import { minWidth } from 'styles/media-queries';
import { levels } from 'styles/z-index';
import get from 'lodash/get';

const SPEED_FACTOR = 1.4;

export const Root = styled.div`
  background-color: ${props => props.backgroundColor};
  height: 200vh;
  overflow: hidden;
`;

export const Container = styled.div`
  ${container}
  ${columnsGutter}

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  height: 100vh;
  position: relative;
  width: 100%;
`;

export const Wrapper = styled.div`
  grid-column: 1 / 13;
  position: relative;
  text-align: center;

  ${minWidth.lg`
    grid-column: 2 / 12;
  `}
`;

const calculateOpacity = ({ progress, limits }) => {
  if (progress > limits[0] && progress < limits[1]) {
    return 1 - (progress - limits[0]) / (limits[1] - limits[0]);
  }

  if (progress > limits[1]) return 0;

  return 1;
};

export const Title = styled(Headline).attrs(props => ({
  tag: 'h1',
  styling: 'Display3',
  style: {
    opacity: calculateOpacity(props),
  },
}))`
  align-items: center;
  display: flex;
  height: 100vh;

  ${minWidth.lg`
    font-size: 12rem;
    letter-spacing: -0.6rem;
    line-height: 12rem;
  `}
`;

export const Eyebrow = styled(Headline).attrs({
  tag: 'h6',
  styling: 'h6',
})`
  position: absolute;
  text-align: center;
  top: ${sideNavHeight.sm + 4}rem; // 4rem + sideNavHeight;
  width: 100vw;
  z-index: ${levels.base};

  ${minWidth.xl`
    top: 7.2rem;
  `}
`;

export const Description = styled(Headline).attrs(props => ({
  tag: 'h2',
  styling: 'h3',
  style: {
    opacity: calculateOpacity(props),
  },
}))`
  color: ${colors.black};
  margin-bottom: 10.9rem;

  ${minWidth.lg`
    ${columnsGutter}

    display: grid;
    grid-template-columns: repeat(10, 1fr);
    margin-bottom: 33.6rem;

    & > span {
      grid-column: 2 / 10;
    }
  `};
`;

const CTA_BOTTOM = {
  sm: 4,
  lg: 6.4,
};

const getCtaPos = ({ progress, limits, isMobile, innerRef }) => {
  const height = get(innerRef, 'current.clientHeight', 0);
  const marginBotton = (isMobile ? CTA_BOTTOM.sm : CTA_BOTTOM.lg) * 10;
  const total = marginBotton + height;

  if (progress > limits[0] && progress < limits[1] && height > 0) {
    const percentage = (progress - limits[0]) / (limits[1] - limits[0]);
    return `${(percentage * total - height) / SPEED_FACTOR}px`;
  }

  if (progress > limits[1] && height > 0) {
    return `${marginBotton}px`;
  }

  return 'unset';
};

export const CtaWrapper = styled.div.attrs(
  ({ progress, limits, isMobile, innerRef, subHeadingLimits }) => ({
    style: {
      position: limits[0] > 0 && progress < 1 ? 'fixed' : 'relative',
      bottom: getCtaPos({ progress, limits, isMobile, innerRef }),
      opacity: calculateOpacity({
        progress,
        limits: [
          subHeadingLimits[0],
          subHeadingLimits[1] - subHeadingLimits[0] + subHeadingLimits[0],
        ],
      }),
    },
  }),
)`
  left: 0;
  padding-bottom: ${({ limits }) =>
    limits[0] > 0 ? 0 : `${CTA_BOTTOM.sm}rem`};
  width: 100%;

  ${minWidth.lg`
    padding-bottom: ${({ limits }) =>
      limits[0] > 0 ? 0 : `${CTA_BOTTOM.lg}rem`};
  `}
`;

export const Cta = styled(CtaComponent)`
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
  text-decoration: none;
`;

export const Arrow = styled(Icon)`
  height: 1.77rem;
  margin-left: 0.56rem;

  ${minWidth.lg`
    height: 2.27rem;
    margin-left: 1rem;
  `}

  div,
  svg {
    height: inherit;
    width: inherit;
  }

  svg {
    transform: rotate(90deg);
  }
`;

export const BottomArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
`;

import styled from 'styled-components';

import { Eyebrow, Headline, ArrowCta as CtaComponent } from 'components/atoms';
import { getThemeColor } from 'utils/get-theme-color';
import { animations, ratioPercentage, cssFragments } from 'styles/variables';
import { columnsGutter, container } from 'styles/grid';
import { minWidth } from 'styles/media-queries';
import { Markdown } from 'components/molecules';

import { multiple } from 'components/atoms/arrow-cta/ArrowCta.styled';

// Styled components
export const FeatureCard = styled.section`
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => getThemeColor(theme.themeKey)};
  padding: 4rem 0;

  ${minWidth.lg`
    padding: 7.2rem 0;
  `}
`;

export const Container = styled.div`
  ${container}

  ${minWidth.lg`
    ${columnsGutter}

    display: grid;
    grid-template-columns: repeat(12, 1fr);

    ${({ theme }) =>
      theme.hasImage &&
      `
      align-items: center;
    `}
  `}
`;

export const Image = styled.div.attrs(props => ({
  role: props.alt ? 'img' : 'presentation',
  'aria-label': props.alt,
}))`
  display: block;
  margin-bottom: 4rem;
  overflow: hidden;
  padding-top: ${ratioPercentage.fourThree}%;
  position: relative;

  &::before {
    ${cssFragments.backgroundScaledImage}

    background-position: 50% center;
    background-repeat: no-repeat;
    background-size: cover;
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: transform ${animations.defaultTransition};
    will-change: transform;
  }

  &.hovering {
    &::before {
      transform: scale(1.1);
    }
  }

  ${minWidth.lg`
    grid-column: span 5;
    margin-bottom: 0;

    ${({ theme }) =>
      theme.imageRight &&
      `
      grid-column: 8 / span 5;
    `}
  `}
`;

export const Content = styled.div`
  ${minWidth.lg`
    ${columnsGutter}

    display: grid;
    grid-column: span 12;
    grid-template-columns: repeat(12, 1fr);

    ${({ theme }) =>
      theme.hasImage &&
      `
      display: flex;
      flex-direction: column;
      grid-column: 7 / span 5;
    `}

    ${({ theme }) =>
      theme.imageRight &&
      `
      grid-column: 2 / span 5;
      grid-row: 1;
    `}
  `}
`;

export const HeadlineContainer = styled.div`
  margin-bottom: 1.6rem;

  ${minWidth.lg`
    grid-column: span 5;
    margin-bottom: 0;

    ${({ theme }) =>
      theme.hasImage &&
      `
      margin-bottom: 2.4rem;
    `}
  `}
`;

export const ColumnList = styled(props => <Markdown {...props} />)`
  margin: 2.4rem 0 5rem 0;
`;

export const TitleEyebrow = styled(Eyebrow)`
  margin-bottom: 0.8rem;

  ${minWidth.lg`
    margin-bottom: 2.4rem;
  `}
`;

export const Title = styled(Headline)`
  color: ${({ theme }) => theme.titleColor || getThemeColor(theme.themeKey)};
`;

export const DescriptionContainer = styled.div`
  ${minWidth.lg`
    grid-column: 7 / span 5;
  `}

  li {
    font-weight: bold;
  }
`;

export const CtasContainer = styled.div`
  margin-top: 3.2rem;
`;

export const Cta = styled(CtaComponent)`
  ${multiple};
`;

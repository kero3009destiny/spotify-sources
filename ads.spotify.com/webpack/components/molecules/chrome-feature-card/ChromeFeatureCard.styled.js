import styled from 'styled-components';
import { Eyebrow, Headline, ArrowCta as CtaComponent } from 'components/atoms';
import { getThemeColor } from 'utils/get-theme-color';
import { minWidth } from 'styles/media-queries';
import { Markdown } from 'components/molecules';

import { columnsGutter, container } from 'styles/grid';
import { animations, cssFragments } from 'styles/variables';

import { multiple } from 'components/atoms/arrow-cta/ArrowCta.styled';

// Styled components
export const FeatureCard = styled.section`
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => getThemeColor(theme.themeKey)};
`;

export const Container = styled.div`
  ${container}
  width: 100%;
  justify-content: space-around;
  position: relative;

  ${({ theme }) =>
    theme.hasImage &&
    theme.imageType &&
    `
      overflow: hidden;

  `}

  ${minWidth.lg`
    ${columnsGutter}

    display: grid;
    grid-template-columns: repeat(12, 1fr);

    ${({ theme }) =>
      theme.hasImage &&
      `
      align-items: start;
    `}
  `}
`;

export const ChromeWrapper = styled.div`
  margin-right: 2rem;
`;

export const MobileChrome = styled.img.attrs(props => ({
  role: props.alt ? 'img' : 'presentation',
  'aria-label': props.alt,
}))`
  display: block;
  padding: 2rem 0;
  position: relative;
  grid-column: span 12;
  overflow: hidden;
  object-fit: cover;
  height: 50rem;
  width: 40rem;
  object-position: 0px 0px;
  margin-left: 20%;

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
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column: 2 / span 5;
    position: absolute;
    bottom: 0;
    padding-bottom: 0;

    ${({ theme }) =>
      theme.imageRight &&
      `
      grid-column: 8 / span 5;
    `}
  `}
`;

export const DesktopChrome = styled.img.attrs(props => ({
  role: props.alt ? 'img' : 'presentation',
  'aria-label': props.alt,
}))`
  display: block;
  padding: 10% 0 5% 0;
  overflow: hidden;
  position: relative;
  height: fit-content;
  margin-left: 0%;

  &.hovering {
    &::before {
      transform: scale(1.1);
    }
  }

  ${minWidth.lg`
    margin-bottom: 0;
    display: grid;
    grid-column: span 6;
    grid-template-columns: repeat(12, 1fr);
    max-width: 120%;
    padding-top: 15%;
    margin-left: -35%;
    left: 0;

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
    padding: 7.2rem 0;


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
  margin: 3.2rem 0 2rem 0;
`;

export const Cta = styled(CtaComponent)`
  ${multiple};
`;

export const ColumnList = styled(Markdown)`
  margin: 2.4rem 0 5rem 0;
`;

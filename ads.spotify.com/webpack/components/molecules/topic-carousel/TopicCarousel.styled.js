import styled from 'styled-components';

import { Cta as CtaComponent } from 'components/atoms';
import { getThemeColor } from 'utils/get-theme-color';
import { columnsGutter, container, relativeOffset } from 'styles/grid';
import {
  animations,
  colors,
  cssFragments,
  fontWeights,
  ratioPercentage,
} from 'styles/variables';
import { minWidth, maxWidth } from 'styles/media-queries';

// Variables
const itemContentOutDelay = `0.3s`;
const itemContentInDelay = `0.8s`;
const expandCollapseTransition = '0.5s ease-in-out';

// Styled Components
export const Carousel = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => getThemeColor(theme.themeKey)};
  padding-bottom: 4rem;
  transition: background-color ${expandCollapseTransition}
      ${itemContentOutDelay},
    color ${expandCollapseTransition} ${itemContentOutDelay};

  ${minWidth.lg`
    padding: 11.2rem 0;
  `}
`;

export const Container = styled.div`
  ${minWidth.lg`
    ${container}
    ${columnsGutter}

    align-items: center;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
  `}
`;

export const Images = styled.div`
  padding-top: ${ratioPercentage.oneOne}%;
  position: relative;

  ${minWidth.lg`
    grid-column: span 5;
    margin-left: -${relativeOffset.lg}rem;
    padding-top: calc(${ratioPercentage.oneOne}% + ${relativeOffset.lg}rem);
  `}

  ${minWidth.xl`
    margin-left: -${relativeOffset.xl}rem;
    padding-top: calc(${ratioPercentage.oneOne}% + ${relativeOffset.xl}rem);
  `}
`;

export const Image = styled.div.attrs(props => ({
  role: props.alt ? 'img' : 'presentation',
  'aria-label': props.alt,
}))`
  display: block;
  opacity: 0;
  overflow: hidden;
  padding-top: ${ratioPercentage.oneOne}%;
  position: relative;
  transition: opacity ${expandCollapseTransition} ${itemContentOutDelay};

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
    transform: scale(1.1);
    transition: transform ${expandCollapseTransition} ${itemContentOutDelay};
    will-change: transform;
  }
`;

export const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;

  &.open {
    ${Image} {
      opacity: 1;

      &::before {
        transform: scale(1);
      }
    }
  }
`;

export const Content = styled.div`
  ${maxWidth.md`
    ${container}
  `}

  ${minWidth.lg`
    grid-column: 7 / span 5;
  `}
`;

export const ItemContent = styled.div`
  height: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity ${animations.defaultTransition},
    height ${expandCollapseTransition} ${itemContentOutDelay};
`;

export const Eyebrow = styled.h4`
  display: block;
  font-weight: ${fontWeights.bold};
  letter-spacing: -0.025rem;
  margin-bottom: 3.2rem;
  margin-top: 4rem;

  ${minWidth.lg`
    letter-spacing: -0.05rem;
    margin-bottom: 4rem;
    margin-top: 0;
  `}
`;

export const Button = styled.button`
  color: inherit;
  margin-bottom: 1.6rem;
  opacity: 0.5;
  text-align: left;
  transition: opacity ${animations.defaultTransition};

  &:hover {
    opacity: 1;
  }

  &:focus {
    /* Fallback for browsers that don't support :focus-visible */
    outline: 1px dotted ${colors.grey100};
    outline: -webkit-focus-ring-color auto 1px;
  }

  &:focus:not(:focus-visible) {
    /* Remove the focus indicator on mouse-focus for browsers that do support :focus-visible */
    outline: none;
  }

  &:focus-visible {
    /* Focus indicator style for keyboard-focus on browsers that do support :focus-visible */
    outline: 1px dotted ${colors.grey100};
    outline: -webkit-focus-ring-color auto 1px;
  }

  ${minWidth.lg`
    margin-bottom: 2.4rem;
  `}
`;

export const Cta = styled(CtaComponent).attrs({
  type: 'TextLink',
})`
  color: inherit;
  display: inline-block;
  margin-bottom: 0.8rem;
  padding: 1.6rem 0;

  ${minWidth.lg`
    margin-bottom: 1.6rem;
    padding: 2.4rem 0;
  `}
`;

export const Item = styled.div`
  &.open {
    display: inline;

    ${ItemContent} {
      height: ${props => `${props.contentHeight}px`};
      opacity: 1;
      pointer-events: all;
      transition: opacity ${animations.defaultTransition} ${itemContentInDelay},
        height ${expandCollapseTransition} ${itemContentOutDelay};
    }

    ${Button} {
      opacity: 1;
    }
  }

  &.resizing {
    ${ItemContent} {
      height: auto;
    }
  }

  &.resizing:not(.open) {
    ${ItemContent} {
      max-height: 0;
    }
  }
`;

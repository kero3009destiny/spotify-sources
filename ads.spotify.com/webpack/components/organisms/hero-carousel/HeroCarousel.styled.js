import styled from 'styled-components';

import { minWidth } from 'styles/media-queries';
import { container, columnsGutter, offset } from 'styles/grid';
import { getThemeColor } from 'utils/get-theme-color';
import { colors, fontWeights, cssFragments } from 'styles/variables';
import { levels } from 'styles/z-index';
import {
  Headline,
  Paragraph,
  ResponsiveImage,
  Cta as CtaComponent,
} from 'components/atoms';
import {
  fadeContentSlideUp,
  ACTIVATE_ANIMATION_CLASS,
} from 'styles/animations';

const itemContentDelay = `0.1s`;
const expandCollapseTransition = '0.5s ease-in-out';

export const Root = styled.div`
  ${container}

  background-color: ${props => props.backgroundColor || colors.white};
  margin-bottom: 4.6rem;
  overflow: hidden;
  position: relative;
  touch-action: pan-y;

  ${minWidth.lg`
    margin-bottom: 9.6rem;
  `}
`;

export const Wrapper = styled.div`
  ${fadeContentSlideUp.setup}

  &.${ACTIVATE_ANIMATION_CLASS} {
    ${fadeContentSlideUp.play}
  }
`;

export const Container = styled.div`
  ${columnsGutter}

  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding-bottom: 4rem;
  padding-top: 2.4rem;
  align-items: center;

  ${minWidth.lg`
    grid-template-columns: repeat(12, 1fr);
    padding-bottom: 7.2rem;
    padding-top: 7.2rem;
  `}
`;

export const Content = styled.div`
  grid-column: 1 / 7;
  margin-top: 2.4rem;
  order: 2;
  position: relative;

  ${minWidth.lg`
    grid-column: 1 / 6;
    margin-top: 0;
    order: 1;
  `}
`;

export const HeroImages = styled.div`
  grid-column: 1 / 7;
  order: 1;
  position: relative;

  ${minWidth.lg`
    grid-column: 7 / 13;
    order: 2;
  `}
`;

export const Image = styled(ResponsiveImage)`
  transform: scale(1.1);
  transition: transform ${expandCollapseTransition} ${itemContentDelay};
  will-change: transform;
`;

export const HeroImage = styled.div`
  margin-right: -${offset.xs}px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  transition: opacity ${expandCollapseTransition} ${itemContentDelay};
  will-change: transform;

  &.open {
    opacity: 1;
    position: relative;

    ${Image} {
      transform: scale(1);
    }
  }

  ${minWidth.sm`
    margin-right: -${offset.sm}px;
  `}

  ${minWidth.md`
    margin-right: -${offset.md}px;
  `}

  ${minWidth.lg`
    margin-right: -${offset.lg}px;
  `}

  ${minWidth.xl`
    margin-right: -${offset.xl}px;
  `}
`;

export const EntriesList = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  width: 50%;

  ${minWidth.lg`
    font-size: 1.6rem;
    line-height: 2.4rem;
    width: 100%;
  `}
`;

export const EntryBar = styled.div`
  height: 0.4rem;
  margin-bottom: 0.8rem;
  position: relative;
  width: 100%;
  overflow: hidden;
  z-index: ${levels.base};

  ${minWidth.lg`
    height: .6rem;
    margin-bottom: 1.4rem;
  `}

  &:before {
    background-color: ${colors.grey700};
    content: '';
    height: 100%;
    left: 0;
    opacity: 0.5;
    position: absolute;
    width: 100%;
  }
`;

export const ProgressIndicator = styled.div.attrs(props =>
  props.active
    ? {
        style: {
          transform: `translateX(${
            props.stopCycling ? 100 : (props.progress || 0) * 100
          }%)`,
        },
      }
    : {
        style: { transform: 'translateX(0%)' },
      },
)`
  background-color: ${props =>
    props.active
      ? props.titleColor || getThemeColor(props.theme)
      : colors.grey700};
  content: '';
  height: 100%;
  position: absolute;
  right: 100%;
  width: 100%;
`;

export const EntryListNumber = styled.span`
  font-size: 1.4rem;
  font-weight: ${fontWeights.black};

  ${minWidth.lg`
    font-size: 1.6rem;
  `}
`;

export const EntryListItemText = styled(Paragraph)`
  display: none;
  font-size: 1.4rem;

  ${minWidth.lg`
    display: block;
    font-size: 1.6rem;
  `}
`;

export const EntryListItem = styled.button`
  align-items: flex-start;
  color: ${props => getThemeColor(props.theme)};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin-right: 0.8rem;
  text-align: left;
  width: 33%;

  ${EntryListNumber}, ${EntryListItemText} {
    opacity: ${props => (props.active ? 1 : '.5')};
  }

  &:hover {
    ${EntryListNumber}, ${EntryListItemText} {
      opacity: 1;
    }
  }

  ${minWidth.lg`
    margin-right: 1.6rem;
  `}

  ${cssFragments.defaultFocusState}
`;

export const EntryTitle = styled(Headline).attrs({ tag: 'h2', styling: 'h2' })`
  color: ${props => props.titleColor || colors.white};
`;

export const EntryDescription = styled.div`
  margin-top: 1.6rem;

  ${minWidth.lg`
    margin-right: 2.4rem;
  `}
`;

export const Cta = styled(CtaComponent)`
  margin-top: 1.6rem;
  text-align: center;
  width: 100%;

  ${minWidth.lg`
    margin-top: 4rem;
    width: auto;
  `}
`;

export const EntriesContent = styled.div.attrs(props =>
  props.active
    ? { style: { opacity: 1, position: 'relative' } }
    : { style: { opacity: 0, position: 'absolute', zIndex: levels.behind } },
)`
  margin-top: 1.6rem;
  top: 0;
  height: ${props => (props.outerHeight ? `${props.outerHeight}px;` : 'auto')};

  ${EntryTitle}, ${EntryDescription}, ${Cta} {
    transition: opacity ${expandCollapseTransition} ${itemContentDelay};
    will-change: transform;
    opacity: 0;

    &.open {
      transition: opacity 0.3s ease-in-out ${itemContentDelay};
      will-change: transform;
      opacity: 1;
    }
  }

  ${minWidth.lg`
    margin-top: 6.4rem;
  `}
`;

// ignore-string-externalization
import styled from 'styled-components';
import {
  IconChevronLeft,
  IconChevronRight,
  white,
  spacer12,
  spacer24,
  spacer40,
} from '@spotify-internal/encore-web';
import phoneSvg from './phone.svg';

const breadcrumbSpacer = '3px';

export const Preview = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: ${spacer40};
`;
export const BreadcrumbWrapper = styled.div`
  align-items: center;
  display: flex;
  margin: 0 10px;
  position: absolute;
  top: ${spacer12};
  width: calc(100% - 20px);
  z-index: 1;
`;

export const Breadcrumb = styled.span<{ active: boolean }>`
  background-color: ${white};
  border-radius: 2px;
  flex: 1 1;
  height: 2px;
  margin-right: ${breadcrumbSpacer};
  opacity: ${props => (props.active ? 1 : 0.5)};
`;

export const BreadcrumbText = styled.span`
  color: ${white};
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 1px;
  margin: 0 7px 0 ${breadcrumbSpacer};
  text-transform: uppercase;
  flex: 0 0;
`;

export const StorylineWrapper = styled.div`
  align-items: center;
  display: inline-flex;
  user-select: none;
`;

// used to calculate percentages so that the SVG scales with the size of the actual card
const cardWidth = 343;
const svgWidth = 527;
const svgHeight = 696;
const svgOffsetX = (svgWidth - cardWidth) / 2;
const svgOffsetY = 120;
export const CardWrapper = styled.div<{ rtl: boolean }>`
  position: relative;

  &::before {
    background: transparent center bottom / contain url('${phoneSvg}') no-repeat;
    box-sizing: content-box;
    content: '';
    display: block;
    /* dynamic height based on the current width, while preserving the SVG's aspect ratio */
    padding-top: calc(
      100% / ${cardWidth} * ${svgWidth} * (${svgHeight} / ${svgWidth})
    );
    pointer-events: none;
    position: absolute;
    transform: ${props =>
      props.rtl
        ? `translate(
      calc(100% / ${svgWidth} * ${svgOffsetX}),
      calc(-100% / ${svgHeight} * ${svgOffsetY})
    )`
        : `translate(
      calc(-100% / ${svgWidth} * ${svgOffsetX}),
      calc(-100% / ${svgHeight} * ${svgOffsetY})
    )`};
    width: calc(100% / ${cardWidth} * ${svgWidth});
  }
`;

export const CardIndicator = styled.div`
  margin-top: ${spacer24};
  z-index: 1;
`;

export const CardButtonPrevious = styled(IconChevronLeft).attrs({
  iconSize: 32,
  role: 'button',
})`
  margin-inline: ${spacer40};
  z-index: 1; /* to stay visible above the phone UI */
`;
export const CardButtonNext = styled(IconChevronRight).attrs({
  iconSize: 32,
  role: 'button',
})`
  margin-inline: ${spacer40};
  z-index: 1; /* to stay visible above the phone UI */
`;

// ignore-string-externalization
import styled, { css } from 'styled-components';
import {
  IconPlus,
  white,
  gray10,
  gray15,
  gray20,
  spacer24,
  spacer40,
  spacer64,
} from '@spotify-internal/encore-web';
import { ImageMove } from '@mrkt/features/imagecapture';
import {
  CARD_ASPECT_RATIO,
  CARD_PADDING,
  CARD_ANIMATION_DURATION,
  DEFAULT_CARD_WIDTH,
} from '../../lib/constants';

export const Mat = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  padding: ${spacer40} 0 ${spacer64}; /* leave some room to display the editor tooltips */
  position: relative;
`;

export const CarouselWrapper = styled.div`
  text-align: center;
  width: 100%;
`;

export const CardArea = styled.div`
  left: 50%;
  margin-left: -${DEFAULT_CARD_WIDTH / 2}px;
  position: absolute;
  width: ${DEFAULT_CARD_WIDTH}px;
  z-index: 1;
`;

export const CardAreaTop = styled.div`
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  width: 100%;
  top: -40px;
`;

const cardHeight = DEFAULT_CARD_WIDTH / CARD_ASPECT_RATIO;
export const AddCardButton = styled(IconPlus).attrs({
  color: white,
  iconSize: 32,
})`
  position: absolute;
  z-index: 1;
  background-color: ${gray15};
  padding: ${spacer24};
  border-radius: 100%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  box-sizing: content-box;
  /* margin + button pad + icon size + button pad */
  right: ${-(16 + 24 + 32 + 24)}px;
  top: ${cardHeight / 2 - 40}px;

  &:hover {
    background-color: ${gray20};
    transform: scale(1.04);
  }
`;

// eslint-disable-next-line no-unexpected-multiline
export const CardCarousel = styled.div<{
  scrollTransition: boolean;
  currentCard: number;
  rtl: boolean;
}>`
  display: flex;

  /* shift to the end of the storyline and center the last card in the container */
  transform: ${props =>
    props.rtl
      ? `translateX(
    calc(
      -50% +
        ${
          props.currentCard * (DEFAULT_CARD_WIDTH + CARD_PADDING) - CARD_PADDING
        }px - ${Math.floor(DEFAULT_CARD_WIDTH / 2)}px
    )
  )`
      : `translateX(
    calc(
      50% -
        ${
          props.currentCard * (DEFAULT_CARD_WIDTH + CARD_PADDING) - CARD_PADDING
        }px + ${Math.floor(DEFAULT_CARD_WIDTH / 2)}px
    )
  )`};
  ${props =>
    props.scrollTransition &&
    css`
      transition: transform ${CARD_ANIMATION_DURATION}ms
        cubic-bezier(0.3, 0, 0, 1);
    `}
`;

// ImageEditor styles
export const ImageEditorButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;
export const ImageArrows = styled.div`
  background: linear-gradient(transparent, ${gray10});
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  align-items: center;
`;
export const ImageArrowsInner = styled(ImageMove)`
  width: 20%;
`;

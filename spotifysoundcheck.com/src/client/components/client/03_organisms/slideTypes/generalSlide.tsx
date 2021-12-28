// TODO: Re-implement standalone video with updated state management system (current one)
// NOTE: I've left the logic for it in this application, so you should ahve everything you need
import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import marked from 'marked';
import { sanitize } from 'dompurify';
import { TitleStyles } from '../../01_atoms/heading';
import { IPalette } from '../../../common/types';
import { getRandomInt } from '../../../common/utils';
import RichTextStyles from '../../01_atoms/richtext';

interface IStyledSlideProps {
  palette: IPalette;
  onSlideEnd: any;
  slideTime: number;
  backgroundImage: any;
  isBackgroundDisabled: boolean;
  isPaletteFlipped: boolean;
  isSlideAutoProgressed: boolean;
  animationStyle: 'none' | 'isScrollingBackgroundImage' | 'isShrinkingBox';
  backgroundSize: string;
  backgroundPosition: string;
}

const animateBackgroundPosition = keyframes`
  from {
    background-position: top;
  } to {
    background-position: bottom;
  }
`;

const shrinkingBoxAnimation = keyframes`
  from { border-width: 56px 0 68px 0; }
  to { border-width: calc(5vh + 56px) 5vw calc(5vh + 68px) 5vw; }
`;

const shrinkingBoxAnimationSmall = keyframes`
  from { border-width: 56px 0 0 0; }
  to { border-width: calc(10px + 56px) 10px 10px 10px; }
`

const StyledSlide: any = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  width: 100vw;
  min-height: 100vh;
  max-width: 100%;
  position: relative;
  overflow: hidden;
  background: ${(props: IStyledSlideProps) => {
    if (props.backgroundImage !== null) {
      return `url("${props.backgroundImage.fields.file.url}")`;
    } else if (props.isBackgroundDisabled) {
      return 'var(--color-SNOW)';
    } else if (props.isPaletteFlipped) {
      return props.palette.foreground;
    } else {
      return props.palette.background;
    }
  }};
  background-repeat: no-repeat;
  background-position: ${(props: IStyledSlideProps) => props.backgroundPosition};
  background-attachment: fixed;
  background-size: ${(props: IStyledSlideProps) => props.backgroundSize};
  animation: ${(props: IStyledSlideProps) => {
    switch (props.animationStyle) {
      case 'isScrollingBackgroundImage':
        return css`
          ${animateBackgroundPosition} infinite 60s
        `;
      case 'isShrinkingBox':
        return css`
          ${shrinkingBoxAnimation} 500ms linear 0.5s 1 normal forwards;
        `;
      default:
        return 'unset';
    }
  }};
  border: 0px solid white;

  @media (max-width: 1024px) {
    animation: ${(props: IStyledSlideProps) => {
      switch (props.animationStyle) {
        case 'isShrinkingBox':
          return css`
            ${shrinkingBoxAnimationSmall} 500ms linear 0.5s 1 normal forwards;
          `;
        default:
          return null;
      }
    }};
  }
`;

const scrollingTextVertical = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(-100%); }
`;

const scrollingTextVerticalLandscape = keyframes`
  from { transform: translateY(200%); } /* these numbers seem magical */
  to { transform: translateY(-200%); }
`;

const scrollingTextHorizontal = keyframes`
  from { transform: translateX(100vw); }
  to { transform: translateX(-100%); }
`;

interface IStyledTextProps {
  palette: IPalette;
  isMasonry: boolean;
  isPaletteFlipped: boolean;
  isCentered: boolean;
  animationStyle:
    | 'none'
    | 'isScrollingBackgroundImage'
    | 'isScrollingTextHorizontal'
    | 'isScrollingTextVertical'
    | 'isShrinkingBox';
  columnStart: number;
  columnSpan: number;
}

const StyledText: any = styled.div`
  z-index: 2;
  grid-column: ${(props: IStyledTextProps) =>
    css`${props.columnStart} / span ${props.columnSpan}`};
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  color: ${(props: IStyledTextProps) =>
    props.isPaletteFlipped ? props.palette.background : props.palette.foreground};
  > * {
    color: ${(props: IStyledTextProps) =>
      props.isPaletteFlipped ? props.palette.background : props.palette.foreground};
    text-align: ${(props: IStyledTextProps) =>
      props.isBorder || props.isMasonry || props.isCentered ? 'center' : 'left'};
  }

  ${RichTextStyles};

  h1 {
    max-width: ${(props: IStyledTextProps) =>
      props.isBorder || props.isMasonry || !props.isIllustration ? '100%' : '58.3%'};
    text-align: ${(props: IStyledTextProps) =>
      props.isBorder || props.isMasonry || props.isCentered ? 'center' : 'left'};
  }

  h3, p {
    color: var(--color-SNOW);
  }

  @media (max-width: 1024px) {
    grid-column: 1 / span 12;
    padding: 30px;
  }

  ${(props: IStyledTextProps) => {
    switch (props.animationStyle) {
      case 'isScrollingTextVertical':
        return css`
          position: absolute;
          text-align: center;
          animation: ${scrollingTextVerticalLandscape} linear infinite 15s;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;

          @media (min-height: 600px) {
            animation: ${scrollingTextVertical} linear infinite 15s;
          }
        `;
      case 'isScrollingTextHorizontal':
        return css`
          h1 {
            ${TitleStyles};
            white-space: nowrap;
            animation: ${scrollingTextHorizontal} infinite linear 15s;
            max-width: none;
          }
          grid-column: 1 / span 12;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: row;
          width: 100%;
          padding-top: 80px;
          padding-bottom: 80px;
        `;
      case 'isShrinkingBox':
        return css`
          padding: 30px;
        `;

      case 'none':
      default:
        return css`
          animation: unset;
        `;
    }
  }};
`;

const StyledIllustration = styled.img`
  max-width: 50%;
  height: auto;
  position: absolute;
  right: 0;
  z-index: 1;
`;

const standaloneVideoLoadingInAnimation = keyframes`
  0% {
    opacity: 0;
  } 100% {
    opacity: 1;
  }
`;

// interface IStyledStandaloneVideoProps {
//   isMasonry: boolean;
//   isAvailableToPlay: boolean;
//   animationTime: number;
// }

// const StyledStandaloneVideo = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 40%;
//   height: auto;
//   margin-left: ${(props: IStyledStandaloneVideoProps) => (props.isMasonry ? '15%' : 'auto')};
//   margin-right: auto;
//   max-width: 1920px;
//   max-height: 1080px;
//   position: fixed;
//   z-index: 3;
//   left: 0;
//   right: 0;
//   top: 0;
//   bottom: 0;
//   img {
//     ${(p: IStyledStandaloneVideoProps) =>
//       !p.isAvailableToPlay
//         ? css`
//             animation: ${standaloneVideoLoadingInAnimation} linear
//               ${(p: IStyledStandaloneVideoProps) => p.animationTime}ms;
//           `
//         : null}
//   }
// `;

// const StyledPlayButton = styled.img`
//   position: absolute;
//   left: 0;
//   right: 0;
//   margin: auto;
//   width: auto;
//   z-index: 4;
// `;

interface IGeneralSlideProps {
  slide: any;
  palette: IPalette;
  spotifyAccessToken: string;
  isSlideDone: () => void;
}

const GeneralSlide = (props: IGeneralSlideProps) => {
  const {
    fields: {
      text,
      backgroundImage = null,
      isMasonry = false,
      isBackgroundDisabled = false,
      isPaletteFlipped = false,
      isCentered = false,
      animationStyle = 'none',
      columnStartDesktop = 2,
      columnSpanDesktop = 10,
      backgroundSize = 'auto',
      backgroundPosition = 'bottom right'
    }
  } = props.slide;

  // This useEffect comes into play only if there's no voice over && no trackID
  useEffect(() => {
    // If isMasonry is true, we want to grab all images on the page and give them random left margins
    // NOTE: It's not real masonry, its how we designed it and called it masonry for some reason
    if (isMasonry) {
      const imageContainers = document.querySelectorAll('#slide-markdown-text p');
      [].forEach.call(imageContainers, (imageContainer: HTMLDivElement) => {
        imageContainer.style.marginLeft = `${getRandomInt(0, 25)}%`;
        imageContainer.style.marginTop = `${getRandomInt(2, 5)}%`;
        const firstImage: any = imageContainer.childNodes[0];
        firstImage.style.transform = `scale(1.${getRandomInt(0, 5)})`;
      });
    }
  }, []);

  return (
    <StyledSlide
      palette={props.palette}
      isPaletteFlipped={isPaletteFlipped}
      backgroundImage={backgroundImage}
      animationStyle={animationStyle}
      backgroundSize={backgroundSize}
      backgroundPosition={backgroundPosition}
      isBackgroundDisabled={isBackgroundDisabled}
    >
      {text !== null && (
        <StyledText
          id="slide-markdown-text"
          isPaletteFlipped={isPaletteFlipped}
          isBackgroundDisabled={isBackgroundDisabled}
          palette={props.palette}
          isMasonry={isMasonry}
          isCentered={isCentered}
          dangerouslySetInnerHTML={{ __html: sanitize(marked(text)) }}
          animationStyle={animationStyle}
          columnStart={columnStartDesktop}
          columnSpan={columnSpanDesktop}
        />
      )}
    </StyledSlide>
  );
};

export default GeneralSlide;


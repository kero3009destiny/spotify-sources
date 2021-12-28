import { MegaTitleStyles, UltraTitleStyles } from '../../01_atoms/heading';
import React, { useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { IPalette } from '../../../common/types';
import RichTextStyles from '../../01_atoms/richtext';
import marked from 'marked';
import { sanitize } from 'dompurify';

const getH1FontStyle = (statType: string) => {
  switch (statType) {
    case 'Percentage':
      return css`
        ${MegaTitleStyles};
      `;
    case 'isVertical':
      return css`
        ${UltraTitleStyles};
        white-space: nowrap !important;
      `;
    default:
      return css`
        ${MegaTitleStyles};
      `;
  }
};

interface IStyledStatSlideProps {
  isPaletteFlipped: boolean;
  palette: IPalette;
  statType: 'isHorizontal' | 'isVertical' | 'Percentage';
  backgroundImageURL: string;
}

const StyledStatSlide = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  padding-top: 56px;
  padding-bottom: 64px;
  background: ${(props: IStyledStatSlideProps) => {
    if (props.backgroundImageURL.length > 0) {
      return `url(${props.backgroundImageURL})`;
    } else if (props.isPaletteFlipped) {
      return props.palette.foreground;
    } else {
      return props.palette.background;
    }
  }};
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const scrollingHorizontalAnimation = keyframes`
  from {
    transform: translateX(100vw);
  } to {
    transform: translateX(-100%);
  }
`;

interface IStyledCopyProps {
  statType: 'isHorizontal' | 'isVertical' | 'Percentage';
  isPaletteFlipped: boolean;
  palette: IPalette;
  isBackgroundImage: boolean;
  statAnimationStyle: 'None' | 'isScrollingHorizontally';
}

const StyledCopy = styled.div`
  width: 100vw;
  display: flex;
  position: relative;
  ${(props: IStyledCopyProps) => {
    switch (props.statType) {
      case 'isVertical':
        return css`
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          grid-row: 1 / span 2;
        `;
      case 'isHorizontal':
      case 'Percentage':
      default:
        return css`
          flex-direction: row;
          align-items: center;
          justify-content: center;
          flex-wrap: nowrap;
          @media screen and (max-width: 1024px) {
            flex-direction: column;
          }
        `;
    }
  }};
`;


interface IStyledStatContainerProps {
  statType: 'isHorizontal' | 'isVertical' | 'Percentage';
}

const StyledStatContainer = styled.div<IStyledStatContainerProps>`
  ${(props) => {
    switch (props.statType) {
      case 'isHorizontal': return css`
        display: flex;
        justify-content: flex-end;

        @media (min-width: 1025px) {
          width: 60%;
        }
      `
    }
  }}
`

interface IStyledStatCopyProps {
  statType: 'isHorizontal' | 'isVertical' | 'Percentage';
  isPaletteFlipped: boolean;
  palette: IPalette;
  isBackgroundImage: boolean;
  statAnimationStyle: 'None' | 'isScrollingHorizontally';
}

const StyledStatCopy = styled.h1`
  ${(props: IStyledStatCopyProps) => getH1FontStyle(props.statType)};
  ${(props: IStyledStatCopyProps) => {
    switch (props.statAnimationStyle) {
      case 'isScrollingHorizontally':
        return css`
          animation: ${scrollingHorizontalAnimation} linear 10s infinite running;
        `;
      default:
        break;
    }
  }}
  color: ${(props: IStyledStatCopyProps) => {
    if (props.isBackgroundImage) {
      return 'var(--color-SNOW)';
    } else if (props.isPaletteFlipped) {
      return props.palette.background;
    } else {
      return props.palette.foreground;
    }
  }};
  margin-bottom: 0;
`;

interface IStyledSupportCopyProps {
  isBackgroundImage: boolean;
  palette: IPalette;
  statType: 'isHorizontal' | 'isVertical' | 'Percentage';
  isPaletteFlipped: boolean;
  isStatAnimated: boolean;
}

const StyledSupportCopy = styled.div`
  ${(props: IStyledSupportCopyProps) => {
    switch (props.statType) {
      case 'isVertical': {
        if (props.isStatAnimated) {
          return css`
            text-align: center;
            align-self: center;
            margin-top: 40px;
          `
        } else {
          return css`
            display: flex;
            justify-content: center;
            align-items: center;
            align-self: center;
            margin-top: 40px;
          `
        }
      }

      case 'isHorizontal':
      case 'Percentage':
      default:
        return css`
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-start;
          text-align: center;

          @media (min-width: 1025px) {
            margin-left: 20px;
            text-align: left;
            flex-grow: 1;
          }
        `;

    }
  }}

  padding: 0 30px;
  ${RichTextStyles};

  h1, h4 {
    margin-left: 0;
    color: ${(props: IStyledSupportCopyProps) => {
      if (props.isBackgroundImage) {
        return 'var(--color-SNOW)';
      } else if (props.isPaletteFlipped) {
        return props.palette.background;
      } else {
        return props.palette.foreground;
      }
    }};
  }
  p {
    color: ${(props: IStyledSupportCopyProps) => {
      if (props.isBackgroundImage) {
        return 'var(--color-SNOW)';
      } else if (props.isPaletteFlipped) {
        return props.palette.background;
      } else {
        return props.palette.foreground;
      }
    }};
  }
`;

interface IStatSlideProps {
  spotifyAccessToken: string;
  slide: any;
  palette: IPalette;
}

const StatSlide = (props: IStatSlideProps) => {
  const {
    fields: {
      stat = '',
      copy = '',
      statType = '',
      isPaletteFlipped = false,
      backgroundImage = null,
      voiceOver = null,
      trackID = null,
      statAnimationStyle = 'None'
    }
  } = props.slide;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    return () => controller.abort();
  }, []);

  return (
    <StyledStatSlide
      palette={props.palette}
      isPaletteFlipped={isPaletteFlipped}
      statType={statType}
      backgroundImageURL={backgroundImage !== null ? backgroundImage.fields.file.url : ''}
    >
      <StyledCopy
        isBackgroundImage={backgroundImage !== null}
        palette={props.palette}
        isPaletteFlipped={isPaletteFlipped}
        statType={statType}
        statAnimationStyle={statAnimationStyle}
      >
        <StyledStatContainer
          statType={statType}
        >
          <StyledStatCopy
            isBackgroundImage={backgroundImage !== null}
            palette={props.palette}
            isPaletteFlipped={isPaletteFlipped}
            statType={statType}
            statAnimationStyle={statAnimationStyle}
          >
            {stat}
          </StyledStatCopy>
        </StyledStatContainer>
        <StyledSupportCopy
          isBackgroundImage={backgroundImage !== null}
          palette={props.palette}
          dangerouslySetInnerHTML={{ __html: sanitize(marked(copy)) }}
          isPaletteFlipped={isPaletteFlipped}
          statType={statType}
          isStatAnimated={statAnimationStyle !== 'None'}
        />
      </StyledCopy>
    </StyledStatSlide>
  );
};

export default StatSlide;

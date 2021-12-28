import React from 'react';
import styled from 'styled-components';
import marked from 'marked';
import { sanitize } from 'dompurify';
import { IPalette } from '../../../common/types';
import RichTextStyles from '../../01_atoms/richtext';
import Button from '../../../common/01_atoms/button';

interface IStyledTwoColumnSlideProps {
  palette: IPalette;
  isBackgroundDisabled: boolean;
  backgroundImageURL: string | null;
  backgroundSize: 'auto' | 'cover';
  backgroundPosition: string;
}

const StyledTwoColumnSlide = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 24px;
  width: 100vw;
  min-height: 100vh;
  align-items: center;
  color: ${(props: IStyledTwoColumnSlideProps) => props.palette.foreground};
  background: ${(props: IStyledTwoColumnSlideProps) => {
    if (props.isBackgroundDisabled) {
      return 'var(--color-SNOW)';
    } else if (props.backgroundImageURL !== null) {
      return `url(${props.backgroundImageURL})`;
    } else {
      return 'rgba(0, 0, 0, 0, 0.1)';
    }
  }};
  background-repeat: no-repeat;
  background-position: ${(props: IStyledTwoColumnSlideProps) => props.backgroundPosition};
  background-size: ${(props: IStyledTwoColumnSlideProps) => props.backgroundSize};
  padding: 56px 0 0 0;

  @media (min-width: 1025px) {
    padding: 56px 0 68px 0;
  }
`;

const StyledWrapper = styled.div`
  grid-column: 2 / span 10;
  padding: 30px 0;

  @media (max-width: 1024px) {
    grid-column: 1 / span 12;
    padding: 30px;
  }
`;

const StyledIntroText = styled.p`
  max-width: 640px;
  margin-bottom: 3em;
`;

const StyledColumnsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 64px;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 124px;
  }
`;

const StyledContentContainer = styled.div`
  & > * + * {
    margin-top: 2em;
  }
`;

const StyledContent = styled.div`
  ${RichTextStyles};
`;

interface ITwoColumnSlideProps {
  slide: any;
  palette: IPalette;
}

const TwoColumnSlide = (props: ITwoColumnSlideProps) => {
  const { foreground, background } = props.palette;
  const {
    fields: {
      introText,
      column1Content,
      column1CtaLabel,
      column1CtaUrl,
      column2Content,
      column2CtaLabel,
      column2CtaUrl,
      isBackgroundDisabled,
      backgroundSize,
      backgroundPosition,
      backgroundImage = null
    }
  } = props.slide;

  return (
    <StyledTwoColumnSlide
      backgroundImageURL={backgroundImage !== null ? backgroundImage.fields.file.url : null}
      palette={props.palette}
      isBackgroundDisabled={isBackgroundDisabled}
      backgroundSize={backgroundSize}
      backgroundPosition={backgroundPosition}
    >
      <StyledWrapper>
        {introText && <StyledIntroText dangerouslySetInnerHTML={{ __html: sanitize(marked(introText))}}/>}

        <StyledColumnsContainer>
          <StyledContentContainer>
            {column1Content && (
              <StyledContent dangerouslySetInnerHTML={{ __html: sanitize(marked(column1Content)) }} />
            )}
            {column1CtaLabel && (
              <Button
                fgColor={foreground}
                bgColor={background}
                label={column1CtaLabel}
                href={column1CtaUrl}
                external
              />
            )}
          </StyledContentContainer>

          <StyledContentContainer>
            {column2Content && (
              <StyledContent dangerouslySetInnerHTML={{ __html: sanitize(marked(column2Content)) }} />
            )}
            {column2CtaLabel && (
              <Button
                fgColor={foreground}
                bgColor={background}
                label={column2CtaLabel}
                href={column2CtaUrl}
                external
              />
            )}
          </StyledContentContainer>
        </StyledColumnsContainer>
      </StyledWrapper>
    </StyledTwoColumnSlide>
  );
};

export default TwoColumnSlide;

import React, { useState } from 'react';

import AudioPlayer from '../02_molecules/audioPlayer';
import { Heading2 } from '../01_atoms/heading';
import { IContentfulAsset } from '../../common/types';
import RichTextStyles from '../01_atoms/richtext';
import VideoPlayer from '../02_molecules/videoPlayer';
import marked from 'marked';
import styled from 'styled-components';
import { sanitize } from 'dompurify';

const StyledCaseStudy = styled.div`
  width: 100%;
  background-color: var(--color-DARKNESS);
`;

interface IStyledHeaderProps {
  backgroundColor: string;
}

const StyledHeader = styled.div`
  width: 100%;
  height: 800px;
  position: relative;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 24px;
  background-color: ${(props: IStyledHeaderProps) => props.backgroundColor};
  padding-top: 60px;
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    height: auto;
  }
`;

const StyledHeaderCopy = styled.div`
  grid-column: 2 / span 10;
  grid-row: 1 / span 2;
  position: relative;
  display: flex;
  align-items: center;
  div {
    position: absolute;
    z-index: 2;
    ${Heading2}, p {
      color: var(--color-SNOW);
    }
  }
  @media screen and (max-width: 1024px) {
    grid-column: 1 / span 4;
    padding: 96px 24px;
    div {
      position: unset;
    }
  }
`;

const StyledHeaderImage = styled.img`
  grid-column: 8 / span 4;
  grid-row: 1 / span 2;
  max-width: 100%;
  align-self: center;
  z-index: 1;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const StyledContentWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 24px;
  padding: 96px 0 128px;

  & > * + * {
    margin-top: 128px;
  }

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    padding: 64px 24px;
    > * {
      padding: unset;
    }

    & > * + * {
      margin-top: 24px;
    }
  }
`;

const StyledImage = styled.img`
  grid-column: 3 / span 8;
  width: 100%;

  @media screen and (max-width: 1024px) {
    grid-column: 1 / span 4;
  }
`;

const StyledPrimaryColumnContainer = styled.div`
  grid-column: 3 / span 8;
  width: 100%;
  @media screen and (max-width: 1024px) {
    grid-column: 1 / span 4;
  }
`;

interface IStyledCopyProps {
  isSplit: boolean;
  copyColor: string;
}

const StyledCopy = styled.div`
  grid-column: ${(props: IStyledCopyProps) => (props.isSplit ? '3 / span 8' : '4 / span 6')};
  display: flex;
  flex-direction: ${(props: IStyledCopyProps) => (props.isSplit ? 'row' : 'column')};
  justify-content: ${(props: IStyledCopyProps) => (props.isSplit ? 'space-evenly' : 'center')};
  align-items: flex-start;
  > * {
    color: ${(props: IStyledCopyProps) => props.copyColor};
    max-width: ${(props: IStyledCopyProps) => (props.isSplit ? '50%' : '100%')};
  }
  img {
    padding-left: 5%;
  }

  ${RichTextStyles};
  @media screen and (max-width: 1024px) {
    grid-column: 1 / span 4;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      padding-left: unset;
    }

    > * {
      max-width: 100%;

      & + * {
        margin-top: 24px;
      }
    }
  }
`;

type StudyType = {
  headerBackgroundColor: string;
  subtitle: string;
  title: string;
  copy: string;
  headerImage: IContentfulAsset;
  topMedia: IContentfulAsset;
  bottomMedia1: IContentfulAsset;
  bottomMedia2: IContentfulAsset;
  rightMedia: IContentfulAsset;
};

interface ICaseStudyProps {
  study: StudyType;
  copyColor: string;
}

const CaseStudy = (props: ICaseStudyProps) => {
  const renderMediaDynamically = (media: IContentfulAsset) => {
    const {
      fields: {
        file: { url, contentType },
        title
      }
    } = media;
    let mediaType = typeof contentType === 'string'
      ? contentType.split('/')[0]
      : ''
    switch (mediaType) {
      case 'audio':
        return <AudioPlayer url={url} title={title} />;
      case 'video':
        return <VideoPlayer url={url} />;
      case 'image':
      default:
        return <StyledImage src={url} alt={title} />;
    }
  };

  return (
    <StyledCaseStudy>
      <StyledHeader backgroundColor={props.study.headerBackgroundColor}>
        <StyledHeaderCopy>
          <div>
            <p><strong>{props.study.subtitle}</strong></p>
            <Heading2 dangerouslySetInnerHTML={{ __html:  sanitize(props.study.title) }} />
          </div>
        </StyledHeaderCopy>
        {props.study.headerImage !== null && (
          <StyledHeaderImage src={props.study.headerImage.fields.file.url} />
        )}
      </StyledHeader>
      <StyledContentWrapper>
        {props.study.topMedia !== null && (
          <StyledPrimaryColumnContainer>
            {renderMediaDynamically(props.study.topMedia)}
          </StyledPrimaryColumnContainer>
        )}
        <StyledCopy copyColor={props.copyColor} isSplit={props.study.rightMedia !== null}>
          <div dangerouslySetInnerHTML={{ __html: sanitize(marked(props.study.copy)) }} />
          {props.study.rightMedia !== null && renderMediaDynamically(props.study.rightMedia)}
        </StyledCopy>
        {props.study.bottomMedia1 !== null && (
          <StyledPrimaryColumnContainer>
            {renderMediaDynamically(props.study.bottomMedia1)}
          </StyledPrimaryColumnContainer>
        )}
        {props.study.bottomMedia2 !== null && (
          <StyledPrimaryColumnContainer>
            {renderMediaDynamically(props.study.bottomMedia2)}
          </StyledPrimaryColumnContainer>
        )}
      </StyledContentWrapper>
    </StyledCaseStudy>
  );
};

export default CaseStudy;

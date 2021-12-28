import React, { Fragment, useState } from 'react';

import AdminBar from '../../client/03_organisms/adminBar';
import CaseStudy from '../04_ecosystem/caseStudy';
import CloseIcon from '../../../../static/images/icons/close.svg';
import GalleryItemCard from '../03_organisms/galleryItemCard';
import { Heading1 } from '../01_atoms/heading';
import { IPalette } from '../../common/types';
import NextIcon from '../../../../static/images/icons/next.svg';
import PreviousIcon from '../../../../static/images/icons/previous.svg';
import { connect } from 'react-redux';
import store from 'store';
import styled from 'styled-components';

const StyledGalleryContainer = styled.div`
  min-height: 100vh;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 600px 1fr;
  grid-column-gap: 24px;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    height: 100%;
  }
`;
interface IStyledHeaderProps {
  palette: IPalette;
}

const StyledHeader = styled.div`
  background-color: ${(props: IStyledHeaderProps) => props.palette.background};
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 24px;
  grid-row: 1;
  grid-column: 1 / span 12;
  padding: 100px 0;
  h1,
  p {
    color: ${(props: IStyledHeaderProps) => props.palette.foreground};
  }
  h1 {
    grid-column: 2 / span 9;
  }
  p {
    grid-column: 2 / span 6;
  }
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    grid-column: 1 / span 4;
    height: auto;
    padding: 100px 24px;
    h1 {
      grid-column: 1 / span 4;
    }
    p {
      grid-column: 1 / span 4;
    }
  }
`;

const StyledGalleryItems = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  grid-column: 2 / span 10;
  grid-row: 2;
  padding-top: 200px;
  -webkit-overflow-scrolling: touch;

  > * {
    margin-right: 32px;
    margin-bottom: 64px;
  }
  @media screen and (max-width: 1024px) {
    grid-column: 1 / span 4;
    padding: 84px 24px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > * {
      margin-right: 0;
      width: 100%;
    }
  }
`;

const StyledCaseStudy = styled.div`
  width: 100%;
  height: auto;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

const StyledCloseIcon = styled.img`
  position: absolute;
  top: 100px;
  right: 32px;
  z-index: 5;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 1024px) {
    width: 36px;
  }
`;

interface IStyledArrowControlProps {
  isDisabled: boolean;
}

const StyledArrowControl = styled.img`
  opacity: ${(props: IStyledArrowControlProps) => (props.isDisabled ? 0.5 : 1)};
  position: fixed;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 5;
  &:hover {
    cursor: ${(props: IStyledArrowControlProps) => (props.isDisabled ? 'not-allowed' : 'pointer')};
  }
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const StyledGalleryCardWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

interface IGalleryProps {
  galleries: any;
  match: any;
}

const Gallery = (props: IGalleryProps) => {
  // Grab gallery ID from props
  const { galleryID } = props.match.params;
  // Grab galleries from props
  let { galleries } = props;
  // On refresh we might lose the galleries, so we'll pull it from local storage
  if (galleries.length === 0) {
    galleries = store.get('galleries');
  }

  // Find out which gallery we need
  const selectedGallery = galleries.find((gallery: any) => gallery.id === galleryID);

  // Establish State for showing a case study and selecting a case study
  const [selectedCaseStudyID, setSelectedCaseStudyID] = useState<any>();
  const [isCaseStudyShown, setCaseStudyShown] = useState<any>();

  // Pull out props
  const { galleryItems, palette, secondaryTitle, description } = selectedGallery;

  // This is for both showing a case study and selecting a case study
  const enableCaseStudy = (caseStudyID: string) => {
    setSelectedCaseStudyID(caseStudyID);
    setCaseStudyShown(true);
  };

  // This is the index of the case study in our array.
  // We don't have to worry when it's undefined, becasue it only matters when a case study is displayed
  const indexOfSelectedCaseStudy = galleryItems
    .map((galleryItem: any) => galleryItem.id)
    .indexOf(selectedCaseStudyID);

  return (
    <Fragment>
      <AdminBar />
      <StyledGalleryContainer
        style={{
          height: '100%',
          position: isCaseStudyShown ? 'fixed' : 'unset',
        }}
      >
        <StyledHeader palette={palette}>
          <Heading1>{secondaryTitle}</Heading1>
          <p>{description}</p>
        </StyledHeader>
        <StyledGalleryItems>
          {galleryItems.map((galleryItem: any, index: number) => {
            return (
              <StyledGalleryCardWrapper
                key={galleryItem.id}
                onClick={() => enableCaseStudy(galleryItem.id)}
              >
                <GalleryItemCard
                  titleColor={palette.background}
                  title={galleryItem.title}
                  subtitle={galleryItem.subtitle}
                  backgroundImageURL={galleryItem.thumbnailImage !== null ? galleryItem.thumbnailImage.fields.file.url : ''}
                  onClick={() => {}}
                />
              </StyledGalleryCardWrapper>
            );
          })}
        </StyledGalleryItems>
        {isCaseStudyShown && (
          <div style={{ position: 'relative' }}>
            <StyledCaseStudy>
              <StyledCloseIcon src={CloseIcon} onClick={() => setCaseStudyShown(false)} />
              <StyledArrowControl
                style={{
                  left: '32px'
                }}
                src={PreviousIcon}
                isDisabled={galleryItems[indexOfSelectedCaseStudy - 1] === undefined}
                onClick={
                  galleryItems[indexOfSelectedCaseStudy - 1] !== undefined
                    ? () => setSelectedCaseStudyID(galleryItems[indexOfSelectedCaseStudy - 1].id)
                    : () => {}
                }
              />
              <StyledArrowControl
                style={{
                  right: '48px' // 32px + the width of the scrollbar, for some reason?
                }}
                src={NextIcon}
                isDisabled={galleryItems[indexOfSelectedCaseStudy + 1] === undefined}
                onClick={
                  galleryItems[indexOfSelectedCaseStudy + 1] !== undefined
                    ? () => setSelectedCaseStudyID(galleryItems[indexOfSelectedCaseStudy + 1].id)
                    : () => {}
                }
              />
              <CaseStudy
                study={galleryItems[indexOfSelectedCaseStudy]}
                copyColor={palette.foreground}
              />
            </StyledCaseStudy>
          </div>
        )}
      </StyledGalleryContainer>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  galleries: state.galleries.data
});

export default connect(mapStateToProps)(Gallery);

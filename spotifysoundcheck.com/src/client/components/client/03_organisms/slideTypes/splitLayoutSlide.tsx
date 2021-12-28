import React, { useEffect } from 'react';
import styled from 'styled-components';
import marked from 'marked';
import { connect } from 'react-redux';
import { sanitize } from 'dompurify';
import { IPalette } from '../../../common/types';
import RichTextStyles from '../../01_atoms/richtext';
import { setLessonColorPalette } from '../../../../actions/lessonsActions';


interface IStyledTwoColumnSlideProps {
  palette: IPalette;
  isPaletteFlipped: boolean;
  isBackgroundDisabled: boolean;
}

const StyledTwoColumnSlide = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 24px;
  padding: 56px 64px 68px;
  width: 100vw;
  min-height: 100vh;
  align-items: center;
  color: ${(props: IStyledTwoColumnSlideProps) =>
    !props.isPaletteFlipped ? props.palette.foreground : props.palette.background};

  background-color: ${(props: IStyledTwoColumnSlideProps) =>
    props.isBackgroundDisabled
      ? 'var(--color-SNOW)'
      : props.isPaletteFlipped
      ? props.palette.foreground
      : props.palette.background};

  @media (max-width: 1024px) {
    padding: 56px 30px 0;
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StyledWrapper = styled.div`
  grid-column: 1 / span 12;
  min-height: calc(100vh - 56px - 68px);

  @media (max-width: 1024px) {
    grid-column: 1 / span 4;
    min-height: calc(100vh - 56px);
  }
`;

const getLayoutSizes = (layoutProportions: string) => {
  switch (layoutProportions) {
    case '30 + 70':
      return ['1 / span 4', '6 / span 7'];
    case '70 + 30':
      return ['1 / span 7', '9 / span 4'];
    case '50 + 50':
    default:
      return ['1 / span 5', '7 / span 6'];
  }
};

interface IStyledColumnsContainerProps {
  layoutProportions: string;
}

const StyledColumnsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 64px;
  align-items: center;
  min-height: calc(100vh - 56px);
  padding: 48px 0;

  @media (min-width: 1025px) {
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 24px;
    min-height: calc(100vh - 56px - 68px);
    padding: 0;

    & > * {
      &:nth-child(1) {
        grid-column: ${(props: IStyledColumnsContainerProps) =>
          getLayoutSizes(props.layoutProportions)[0]};
      }
      &:nth-child(2) {
        grid-column: ${(props: IStyledColumnsContainerProps) =>
          getLayoutSizes(props.layoutProportions)[1]};
      }
    }
  }
`;

const getAlignment = (position: string) => {
  if (position.indexOf('top') !== -1) {
    return 'flex-start';
  } else if (position.indexOf('bottom') !== -1) {
    return 'flex-end';
  }
  return 'center';
};

const getJustification = (position: string) => {
  if (position.indexOf('left') !== -1) {
    return 'flex-start';
  } else if (position.indexOf('right') !== -1) {
    return 'flex-end';
  }
  return 'center';
};

interface IStyledImageContainerProps {
  illustrationPosition: string; // list of options
}

const StyledImageContainer = styled.div`
  display: flex;
  align-items: ${(props: IStyledImageContainerProps) => getAlignment(props.illustrationPosition)};
  justify-content: ${(props: IStyledImageContainerProps) =>
    getJustification(props.illustrationPosition)};

  & > img {
    max-width: 100%;
  }

  @media (min-width: 1025px) {
    height: 100%;

    & > img {
      width: auto;
      max-height: 100%;
    }
  }
`;

const StyledContent = styled.div`
  ${RichTextStyles};
  @media (min-width: 1025px) {
    padding: 48px 0;
  }
`;

interface ITwoColumnSlideProps {
  slide: any;
  palette: IPalette;
  setLessonColorPalette: (palette: any) => void;
}

const getImageUrl = (assetObject: any) => {
  if (assetObject) {
    const { url } = assetObject.fields.file;
    return url;
  }
};

const TwoColumnSlide = (props: ITwoColumnSlideProps) => {
  const {
    fields: {
      text,
      illustration,
      illustrationPosition,
      layoutProportions,
      isLayoutFlipped,
      isPaletteFlipped,
      isBackgroundDisabled,
      palette
    }
  } = props.slide;

  // override lesson color palette if defined
  useEffect(() => {
    if (palette) {
      props.setLessonColorPalette(palette);
    }

    return () => {
      if (palette) {
        props.setLessonColorPalette(null);
      }
    }
  })

  const illustrationUrl = getImageUrl(illustration);

  const content = (
    <StyledContent key="content" dangerouslySetInnerHTML={{ __html: sanitize(marked(text)) }} />
  );

  const image = (
    <StyledImageContainer key="image" illustrationPosition={illustrationPosition}>
      {illustrationUrl && <img src={illustrationUrl} alt="" />}
    </StyledImageContainer>
  );

  return (
    <StyledTwoColumnSlide
      palette={palette || props.palette}
      isPaletteFlipped={isPaletteFlipped}
      isBackgroundDisabled={isBackgroundDisabled}
    >
      <StyledWrapper>
        <StyledColumnsContainer layoutProportions={layoutProportions}>
          {isLayoutFlipped ? [image, content] : [content, image]}
        </StyledColumnsContainer>
      </StyledWrapper>
    </StyledTwoColumnSlide>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  setLessonColorPalette: (palette: any) => dispatch(setLessonColorPalette(palette))
});

export default connect(
  null,
  mapDispatchToProps
)(TwoColumnSlide);

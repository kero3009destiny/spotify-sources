import React from 'react';
import styled from 'styled-components';

import VideoPlayer from '../../02_molecules/videoPlayer';

import { IPalette } from '../../../common/types';


interface IStyledVideoSlideProps {
  palette: IPalette;
}

const StyledVideoSlide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  background-color: ${(props: IStyledVideoSlideProps) => props.palette.background};
  position: absolute;
  z-index: 20;
`;



interface IVideoSlideProps {
  slide: any;
  palette: IPalette;
  onVideoEnd: any;
}

const VideoSlide = (props: IVideoSlideProps) => {
  const {
    fields: {
      video: {
        fields: {
          file: { url }
        }
      }
    }
  } = props.slide;

  return (
    <StyledVideoSlide palette={props.palette}>
      <VideoPlayer
        autoplay={true}
        url={url}
        onEnded={() => props.onVideoEnd()}
      />
    </StyledVideoSlide>
  );
};

export default VideoSlide;

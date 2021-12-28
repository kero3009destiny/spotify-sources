import React, { useState } from 'react';
import Player from 'react-player';
import styled from 'styled-components';

import PlayButton from '../../../../static/images/icons/play.svg';

const StyledVideoContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  position: relative;
`;

const StyledPlayButton = styled.img`
  position: absolute;
  z-index: 21;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: auto;
`;

interface IVideoProps {
  autoplay?: boolean;
  url: string;
  onEnded?: any;
}

const Video = (props: IVideoProps) => {
  const { autoplay = false, onEnded = () => null } = props;
  const [isPlaying, setPlaying] = useState<boolean>(autoplay);
  return (
    <StyledVideoContainer>
      <Player
        playing={isPlaying}
        url={props.url}
        width="100%"
        height="100%"
        onError={() => setPlaying(false)}
        onClick={() => setPlaying(!isPlaying)}
        onEnded={onEnded}
      />
      {!isPlaying && <StyledPlayButton onClick={() => setPlaying(true)} src={PlayButton} />}
    </StyledVideoContainer>
  );
};

export default Video;

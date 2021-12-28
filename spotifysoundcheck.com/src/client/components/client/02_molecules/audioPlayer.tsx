import React, { useState, Fragment } from 'react';
import Sound from 'react-sound';
import styled from 'styled-components';

import SkinnyPlayIcon from '../../../../static/images/icons/play_skinny.svg';
import SpeakerIcon from '../../../../static/images/icons/speaker.svg';

const StyledAudioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledPlayButton = styled.img`
  @media (max-width: 1024px) {
    padding-left: 0px;
    margin: auto;

    max-width: 80%;
    margin: auto;
  }
`

const StyledTitle = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  img {
    margin-right: 10px;
  }
  p {
    color: var(--color-SNOW);
    font-size: 12px;
  }
`;

interface IAudioPlayerProps {
  url: string;
  volume?: number;
  onLoading?: any;
  title: string;
}

const AudioPlayer = (props: IAudioPlayerProps) => {
  const [playStatus, setPlayStatus] = useState<'PLAYING' | 'STOPPED' | 'PAUSED'>('STOPPED');

  const { url, volume = 50, onLoading = () => null, title = '' } = props;

  return (
    <Fragment>
      <StyledAudioContainer onClick={() => setPlayStatus(playStatus === 'PLAYING' ? 'PAUSED' : 'PLAYING')}>
        <StyledPlayButton
          src={SkinnyPlayIcon}
          alt="Playing button"
          style={{
            opacity: playStatus === 'PLAYING' ? 0 : 1
          }}
        />
        {title.length > 0 && (
          <StyledTitle>
            <img src={SpeakerIcon} alt="Speaker Icon" />
            <p>{title}</p>
          </StyledTitle>
        )}
      </StyledAudioContainer>
      <Sound url={url} playStatus={playStatus} volume={volume} onLoading={onLoading} />
    </Fragment>
  );
};

export default AudioPlayer;

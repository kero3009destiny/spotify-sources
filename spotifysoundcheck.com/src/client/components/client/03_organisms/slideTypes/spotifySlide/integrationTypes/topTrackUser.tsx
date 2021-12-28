import React, { Fragment, useEffect, useState } from 'react';

import { Heading1Styles } from '../../../../01_atoms/heading';
import { IPalette } from '../../../../../common/types';
import { SmallTextStyles } from '../../../../../common/01_atoms/text';
import SlideAudioPlayer from '../../../../02_molecules/slideAudioPlayer';
import styled from 'styled-components';

const StyledTopTrackUser = styled.div`
  height: 100%;
  width: 100vw;
  overflow: hidden;
  display: grid;
  grid-template-rows: 100px 1fr;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 24px;
  background-color: var(--color-SNOW);
  position: relative;
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto 1fr;
    padding: 30px 30px 80px;
  }
`;

const StyledTopBar = styled.div`
  grid-row: 1;
  grid-column: 2 / span 8;
  text-align: left;
  display: flex;
  align-items: center;
  h2 {
    grid-column: 2 / span 10;
    grid-row: 1;
    color: var(--color-DARKNESS);
    ${SmallTextStyles};
    font-weight: normal;
  }
  @media screen and (max-width: 1024px) {
    margin-bottom: 20px;
    grid-column: 1 / span 4;
    h2 {
      grid-column: 1 / span 4;
    }
  }
`;
interface IStyledTrackTextProps {
  palette: IPalette;
}

const StyledTrackText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  grid-row: 2;
  grid-column: 2 / span 5;
  z-index: 2;
  h1 {
    margin-bottom: 0;
    color: ${(props: IStyledTrackTextProps) => props.palette.foreground};
    ${Heading1Styles};
  }
  h1,
  p {
    text-align: left;
  }
  @media screen and (max-width: 1024px) {
    position: relative;
    z-index: 3;
    grid-column: 1 / span 4;
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: flex-start;
  }
`;
interface IStyledTrackImageProps {
  isMobile?: boolean
}

const StyledTrackImage = styled.div<IStyledTrackImageProps>`
  width: 100%;
  grid-row: 2;
  grid-column: 7 / span 5;
  display: ${p => p.isMobile ? 'none' : 'flex'};
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
  }

  @media screen and (max-width: 1024px) {
    display: ${p => p.isMobile ? 'flex' : 'none'};
    grid-column: 1 / span 4;
    margin-top: -2em;
    margin-bottom: 20px;
    z-index: -1;
  }
`;

interface IStyledGrowingCircleProps {
  palette: IPalette;
}

// TODO: Implement "growing" animation
const StyledGrowingCircle = styled.div`
  position: absolute;
  bottom: -25vh;
  right: -15vw;
  height: 550px;
  width: 550px;
  border-radius: 50%;
  z-index: 1;
  background-color: ${(props: IStyledGrowingCircleProps) => props.palette.background};
`;

interface ITopTrackUser {
  slide: any;
  handleGetData: (apiEndpoint: string, abortSignal: AbortSignal) => any;
  handleThrowFallback: () => void;
  updateTrackURL: (trackURL: string) => void;
  palette: IPalette;
}

const topTrackUser = (props: ITopTrackUser) => {
  const [trackData, setTrackData] = useState<any>();

  useEffect(() => {
    const tracksController = new AbortController();
    props
      .handleGetData('https://api.spotify.com/v1/me/top/tracks', tracksController.signal)
      .then((spotifyTracks: any) => {
        const chosenTrack = spotifyTracks.items.find((track: any) => track.preview_url !== null);
        setTrackData(chosenTrack);
        props.updateTrackURL(chosenTrack.preview_url);
      })
      .catch(() => props.handleThrowFallback());
    return () => tracksController.abort();
  }, []);

  return (
    <StyledTopTrackUser>
      <StyledTopBar>
        <h2>
          <strong>Your Top Song</strong>
        </h2>
      </StyledTopBar>
      {trackData !== undefined && (
        <Fragment>
          <StyledTrackText palette={props.palette}>
            <h1>{trackData.artists[0].name}</h1>
            <StyledTrackImage isMobile>
              <img src={trackData.album.images[0].url} alt={trackData.album.name} />
            </StyledTrackImage>
            <p>{trackData.name} is your jam.</p>
            <SlideAudioPlayer
              trackName={trackData.name}
              artistName={trackData.artists[0].name}
            />
          </StyledTrackText>
          <StyledTrackImage>
            <img src={trackData.album.images[0].url} alt={trackData.album.name} />
          </StyledTrackImage>
        </Fragment>
      )}
      <StyledGrowingCircle palette={props.palette} />
    </StyledTopTrackUser>
  );
};

export default topTrackUser;

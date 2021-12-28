// Slide Types
import { RandomPlaylistUser, TopArtistUser, TopGenreUser, TopTrackUser, TopTracksUser } from './integrationTypes';
// NOTE: This slide is more of a switch board component, similar to `src/client/components/client/03_organisms/slide.tsx`
// It divides up the integration type into the respective slide
import React, { useState } from 'react';

import { IPalette } from '../../../../common/types';
import Throbber from '../../../../common/01_atoms/throbber';
import styled from 'styled-components';

const StyledSpotifySlide = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: 1fr 68px;
  position: relative;

  @media (max-width: 1024px) {
    grid-template-rows: 1fr 0;
  }
`;

const StyledIntegrationType = styled.div`
  grid-row: 1;
`;

interface IStyledThrobberContainerProps {
  palette: IPalette;
}

const StyledThrobberContainer = styled.div`
  grid-row: 1;
  position: fixed;
  z-index: 3;
  width: 100%;
  height: 100%;
  background-color: ${(props: IStyledThrobberContainerProps) => props.palette.background};
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ISpotifySlideProps {
  slide: any;
  spotifyAccessToken: string;
  handleSlideError: () => void;
  handleSetTrack: (trackURL: string) => void;
  palette: IPalette;
}

const SpotifySlide = (props: ISpotifySlideProps) => {
  const [isLoadingData, setLoadingData] = useState(true); // True by default so we can immediately throw the throbber up

  // NOTE: This function will throw the fallback *if the request fails*
  // If you need to handle a fallback for data missing, that is handleded at each individual types level
  const handleGetSpotifyData = (apiEndpoint: string, abortSignal: AbortSignal) => {
    setLoadingData(true);
    return fetch(apiEndpoint, {
      headers: {
        Authorization: `Bearer ${props.spotifyAccessToken}`
      },
      signal: abortSignal
    })
      .then(res => res.json())
      .then(data => {
        setLoadingData(false);
        return data;
      })
      .catch(err => {
        setLoadingData(false);
        props.handleSlideError();
      });
  };

  const getIntegrationType = (integrationType: string) => {
    switch (integrationType) {
      case 'isTopTracksUser':
        return (
          <TopTracksUser
            slide={props.slide}
            handleGetData={handleGetSpotifyData}
            handleThrowFallback={props.handleSlideError}
            updateTrackURL={props.handleSetTrack}
            palette={props.palette}
          />
        );
      case 'isTopArtist':
        return (
          <TopArtistUser
            slide={props.slide}
            handleGetData={handleGetSpotifyData}
            handleThrowFallback={props.handleSlideError}
            updateTrackURL={props.handleSetTrack}
            palette={props.palette}
          />
        );
      case 'isTopTrack':
        return (
          <TopTrackUser
            slide={props.slide}
            handleGetData={handleGetSpotifyData}
            handleThrowFallback={props.handleSlideError}
            updateTrackURL={props.handleSetTrack}
            palette={props.palette}
          />
        );
      case 'isTopGenre':
          return (
            <TopGenreUser
              slide={props.slide}
              handleGetData={handleGetSpotifyData}
              handleThrowFallback={props.handleSlideError}
              updateTrackURL={props.handleSetTrack}
              palette={props.palette}
            />
          );
      case 'isPlaylistsUser':
          return (
            <RandomPlaylistUser
              slide={props.slide}
              handleGetData={handleGetSpotifyData}
              handleThrowFallback={props.handleSlideError}
              updateTrackURL={props.handleSetTrack}
              palette={props.palette}
            />
          )

      default:
        return ''; // TODO: Replace with a fallback solution that doesn't rely on contentful
    }
  };

  return (
    <StyledSpotifySlide>
      {isLoadingData && (
        <StyledThrobberContainer palette={props.palette}>
          <Throbber />
        </StyledThrobberContainer>
      )}
      <StyledIntegrationType>
        {getIntegrationType(props.slide.fields.integrationType)}
      </StyledIntegrationType>
    </StyledSpotifySlide>
  );
};

export default SpotifySlide;

import React, { Fragment, useEffect, useState } from 'react';

import { Heading1Styles } from '../../../../01_atoms/heading';
import { IPalette } from '../../../../../common/types';
import { SmallTextStyles } from '../../../../../common/01_atoms/text';
import styled from 'styled-components';
import SlideAudioPlayer from '../../../../02_molecules/slideAudioPlayer';

const StyledTopArtistUser = styled.div`
  height: 100%;
  width: 100vw;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 24px;
  grid-template-rows: 100px 1fr;
  background-color: var(--color-SNOW);

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

interface IStyledArtistTextProps {
  palette: IPalette;
}

const StyledArtistText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  grid-row: 2;
  grid-column: 2 / span 5;
  z-index: 2;
  h1 {
    margin-bottom: 0;
    color: ${(props: IStyledArtistTextProps) => props.palette.foreground};
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

interface IStyledArtistImageProps {
  isMobile?: boolean
}

const StyledArtistImage = styled.div<IStyledArtistImageProps>`
  width: 100%;
  grid-row: 2;
  grid-column: 7 / span 5;
  justify-content: center;
  align-items: center;
  display: ${p => p.isMobile ? 'none' : 'flex'};

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

interface ITopArtistUserProps {
  slide: any;
  handleGetData: (apiEndpoint: string, abortSignal: AbortSignal) => any;
  handleThrowFallback: () => void;
  updateTrackURL: (trackURL: string) => void;
  palette: IPalette;
}

const TopArtistUser = (props: ITopArtistUserProps) => {
  const [isSecondCallLoading, setSecondCallLoading] = useState<boolean>(true);
  const [artistData, setArtistData] = useState<any>();

  useEffect(() => {
    // NOTE: There's two calls made here, so we need two controllers
    const initialController = new AbortController();
    const secondaryController = new AbortController();
    props
      .handleGetData('https://api.spotify.com/v1/me/top/artists', initialController.signal)
      .then((topArtists: any) => {
        if (topArtists.items !== undefined && topArtists.items.length > 0) {
          return topArtists;
        } else {
          props.handleThrowFallback();
        }
      })
      .then((topArtists: any) => topArtists.items[0]) // Return the first artist
      .then((topArtist: any) =>
        props
          .handleGetData(
            `https://api.spotify.com/v1/artists/${topArtist.id}/top-tracks?country=US`,
            secondaryController.signal
          )
          .then((spotifyArtistData: any) => {
            // NOTE: We want to update the Track URL for the global track component, and we'll also use that track as our artist data
            const chosenTrack = spotifyArtistData.tracks.filter(
              (track: any) => track.preview_url !== null
            )[0];
            setArtistData(chosenTrack);
            props.updateTrackURL(chosenTrack.preview_url);
          })
          .then(() => setSecondCallLoading(false))
          .catch(() => props.handleThrowFallback())
      )
      .catch(() => props.handleThrowFallback());
    return () => {
      initialController.abort();
      secondaryController.abort();
    };
  }, []);

  return (
    <StyledTopArtistUser>
      <StyledTopBar>
        <h2>
          <strong>Your Top Artist</strong>
        </h2>
      </StyledTopBar>
      {!isSecondCallLoading && (
        <Fragment>
          <StyledArtistText palette={props.palette}>
            <h1>{artistData.artists[0].name}</h1>
            <StyledArtistImage isMobile>
              <img src={artistData.album.images[0].url} alt={artistData.album.name} />
            </StyledArtistImage>
            <p>
              Since you&#8217;ve opted to log into the Soundcheck experience, we&#8217;re able to
              break down your listening data. Looks like you&#8217;re a devoted fan of{' '}
              {artistData.artists[0].name}.
            </p>
            <SlideAudioPlayer
              trackName={artistData.name}
              artistName={artistData.artists[0].name}
            />
          </StyledArtistText>
          <StyledArtistImage>
            <img src={artistData.album.images[0].url} alt={artistData.album.name} />
          </StyledArtistImage>
        </Fragment>
      )}
    </StyledTopArtistUser>
  );
};

export default TopArtistUser;

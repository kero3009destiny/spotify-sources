import React, { Fragment, useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { Heading1Styles } from '../../../../01_atoms/heading';
import { IPalette } from '../../../../../common/types';
import RichTextStyles from '../../../../01_atoms/richtext';
import { SmallTextStyles } from '../../../../../common/01_atoms/text';
import SlideAudioPlayer from '../../../../02_molecules/slideAudioPlayer';
import { getRandomInt } from '../../../../../common/utils';
import marked from 'marked';
import { splitItems } from '../../../../../common/utils';

const StyledRandomPlaylistUser = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const StyledAlbumBackgroundWrapper = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const StyledAlbumBackgroundContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

interface IStyledBackgroundGroupProps {
  column: number;
}

const StyledBackgroundGroup = styled.div`
  grid-column: ${(props: IStyledBackgroundGroupProps) => props.column};
  display: grid;
  align-items: center;
  justify-content: center;
`;

interface IStyledBackgroundAlbumProps {
  row: number;
  scale: number;
  animationSpeed: number;
  xRandom: number;
  yRandom: number;
}

const scrollAlbumImagesUp = (scale: number) => keyframes`
  0% {
    transform: scale(${scale}) translate3d(0, -5%, 0);
    opacity: 0;
  }
  30% {
    transform: scale(${scale}) translate3d(0, 0%, 0);
    opacity: 1;
  }
  60%,
  100% {
    transform: scale(${scale}) translate3d(0, 5%, 0);
    opacity: 0;
  }
`;

const StyledBackgroundAlbumContainer = styled.div`
  position: relative;
  height: 100%;
`

const StyledBackgroundAlbum = styled.img<IStyledBackgroundAlbumProps>`
  position: relative;
  top: ${(props) => `${props.yRandom / 10}vw`};
  left: ${(props) => `${props.xRandom / 10}vw`};
  opacity: 0;

  @media (max-width: 1024px) {
    animation: ${props => css`
      ${scrollAlbumImagesUp(props.scale * 0.85)} 10s ease infinite
    `};

    animation-delay: ${props => `${props.animationSpeed}s`};
  }

  @media (max-width: 600px) {
    animation: ${props => css`
      ${scrollAlbumImagesUp(props.scale * 0.7)} 10s ease infinite
    `};
    animation-delay: ${props => `${props.animationSpeed}s`};
  }

  animation: ${props => css`
    ${scrollAlbumImagesUp(props.scale)} 10s ease infinite
  `};
  animation-delay: ${props => `${props.animationSpeed}s`};
`;

const StyledRandomPlaylistContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 100px 1fr;
  grid-column-gap: 24px;
  /* pointer-events: none; */
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto 1fr;
    padding: 30px 30px 100px;
  }
`;

const StyledMarkdownText = styled.div`
  grid-column: 2 / span 10;
  display: flex;
  align-items: center;

  p {
    ${SmallTextStyles};
  }

  @media screen and (max-width: 1024px) {
    grid-column: 1 / span 4;
    margin-bottom: 20px;
  }
`;

interface IStyledPlaylistTitleProps {
  palette: IPalette;
}

const StyledPlaylistTitle = styled.div`
  grid-column: 5 / span 7;
  grid-row: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  h1 {
    color: ${(props: IStyledPlaylistTitleProps) => props.palette.foreground};
  }
  p {
    color: var(--color-SNOW);
  }
  ${RichTextStyles};
  @media screen and (max-width: 1024px) {
    grid-column: 1 / span 4;
  }
`

interface IRandomPlaylistUserProps {
  slide: any;
  handleGetData: (apiEndpoint: string, abortSignal: AbortSignal) => any;
  handleThrowFallback: () => void;
  updateTrackURL: (trackURL: string) => void;
  palette: IPalette;
}

const RandomPlaylistUser = (props: IRandomPlaylistUserProps) => {
  const [playlistData, setPlaylistData] = useState<any>();
  const [selectedTrack, setSelectedTrack] = useState<any>()
  const [isSecondCallLoading, setSecondCallLoading] = useState<boolean>(true);

  useEffect(() => {
    const playlistDataController = new AbortController();
    const playlistTracksController = new AbortController();

    // NOTE: This function associates a random animation speed for the track. This is used for an animation effect
    const addPropertiesToTrack = (track: any) => {
      let updatedTrack = track;
      updatedTrack.xRandom = Number(`${getRandomInt(-100, 100)}`);
      updatedTrack.yRandom = Number(`${getRandomInt(-100, 100)}`);
      updatedTrack.animationSpeed = Number(`${getRandomInt(-10, 10)}`);
      updatedTrack.album.images[1].scale = Number(`1.${getRandomInt(0, 12)}`);
      return updatedTrack;
    };

    props
      .handleGetData('https://api.spotify.com/v1/me/playlists', playlistDataController.signal)
      .then((playlists: any) => {
        if (playlists !== undefined) {
          if (playlists.items.length > 0) {
            return playlists;
          } else {
            props.handleThrowFallback();
          }
        }
      })
      .then((playlists: any) => {
        if (playlists !== undefined) {
          // Next we need to pick a random playlist from this array
          const selectedPlaylist = playlists.items[getRandomInt(0, playlists.items.length - 1)];
          return props
            .handleGetData(
              `https://api.spotify.com/v1/playlists/${selectedPlaylist.id}/tracks`,
              playlistTracksController.signal
            )
            .then((data: any) => ({
              ...selectedPlaylist,
              tracks: data.items.map((playlistItem: any) => playlistItem.track)
            }))
            .then((playlist: any) => {
              if (playlist !== undefined) {
                // Next we'll update our track state
                // Now we're going to select a random track to play
                // We'll filter out tracks that don't have a preview url, and select one based on a random number
                const filteredTracks = playlist.tracks.filter(
                  (track: any) => track.preview_url !== null
                );
                if (filteredTracks.length === 0) {
                  props.handleThrowFallback();
                }
                const selectedTrack = filteredTracks[getRandomInt(0, filteredTracks.length - 1)]
                setSelectedTrack(selectedTrack);
                // Then we update our seleced track preview url
                props.updateTrackURL(selectedTrack.preview_url);
                // Next we need to split up the tracks for the background
                const updatedPlaylistTracks = playlist.tracks.map((track: any) =>
                  addPropertiesToTrack(track)
                );
                const splitPlaylistTracks = splitItems(updatedPlaylistTracks.splice(0, 9), 3);
                const updatedPlaylist = { ...playlist, tracks: splitPlaylistTracks };
                // Lastly, we update our selected playlist state
                setPlaylistData(updatedPlaylist);
              }
            })
            .then(() => setSecondCallLoading(false));
        }
      })
      .catch((err: any) => {
        console.log(err);
        return props.handleThrowFallback();
      });

    return () => {
      playlistTracksController.abort();
      playlistDataController.abort();
    };
  }, []);

  return (
    <StyledRandomPlaylistUser>
      {!isSecondCallLoading && (
        <Fragment>
          <StyledAlbumBackgroundWrapper>
            <StyledAlbumBackgroundContainer>
              {playlistData !== undefined &&
                playlistData.tracks.map((trackGroup: any, index: number) => (
                  <StyledBackgroundGroup column={index + 1}>
                    {trackGroup.map((track: any, index: number) => (
                      <StyledBackgroundAlbumContainer key={`${track.id}${index}`}>
                        <StyledBackgroundAlbum
                          row={index}
                          src={track.album.images[1].url}
                          scale={track.album.images[1].scale}
                          animationSpeed={track.animationSpeed}
                          xRandom={track.xRandom}
                          yRandom={track.yRandom}
                          id={track.id}
                        />
                      </StyledBackgroundAlbumContainer>
                    ))}
                  </StyledBackgroundGroup>
                ))}
            </StyledAlbumBackgroundContainer>
          </StyledAlbumBackgroundWrapper>
          <StyledRandomPlaylistContent>
            <StyledMarkdownText><p><strong>Playlists and Podcasts</strong></p></StyledMarkdownText>
            <StyledPlaylistTitle palette={props.palette}>
              <h1>{playlistData.name}</h1>
              <p>
                And along with your top artists, songs, and genres, your{' '}
                <strong>music playlists and podcast preferences</strong> help us understand your
                contextual moments and interests.
              </p>
              {selectedTrack != null &&
                <SlideAudioPlayer
                  trackName={selectedTrack.name}
                  artistName={selectedTrack.artists[0].name}
                />
              }
            </StyledPlaylistTitle>
          </StyledRandomPlaylistContent>
        </Fragment>
      )}
    </StyledRandomPlaylistUser>
  );
};

export default RandomPlaylistUser;

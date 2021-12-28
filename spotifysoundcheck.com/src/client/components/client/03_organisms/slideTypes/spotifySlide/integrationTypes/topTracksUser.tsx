import React, { useEffect, useState } from 'react';
import { getRandomInt, splitItems } from '../../../../../common/utils';
import styled, { css, keyframes } from 'styled-components';

import { IPalette } from '../../../../../common/types';
import RichTextStyles from '../../../../01_atoms/richtext';
import marked from 'marked';
import { sanitize } from 'dompurify';

const StyledTopTracksUser = styled.div`
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

const StyledTopTracksUserText = styled.div`
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 24px;
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

interface IStyledMarkdownTextProps {
  palette: IPalette;
}

const StyledMarkdownText = styled.div`
  grid-column: 2 / span 10;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media screen and (max-width: 1024px) {
    grid-column: 1 / span 4;
    padding: 24px;
  }
  > * {
    color: ${(props: IStyledMarkdownTextProps) => props.palette.foreground};
  }
  ${RichTextStyles};
`;

interface ITopTracksUserTypeProps {
  slide: any;
  handleGetData: (apiEndpoint: string, abortSignal: AbortSignal) => any;
  handleThrowFallback: () => void;
  updateTrackURL: (trackURL: string) => void;
  palette: IPalette;
}

const TopTracksUserType = (props: ITopTracksUserTypeProps) => {
  const {
    fields: { text = null }
  } = props.slide;

  const [tracksData, setTracksData] = useState<any>([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

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
      .handleGetData('https://api.spotify.com/v1/me/top/tracks', signal)
      .then((tracks: any) => {
        if (typeof tracks !== 'undefined' && tracks.items.length > 0) {
          // We want to remove duplicates first
          const filteredTracks = tracks.items.reduce((accumulator: any, currentItem: any) => {
            // First index won't have items, so we want to make sure our length is greater than zero first
            if (accumulator.length > 0) {
              const isAlbumInAccumulator: boolean =
                accumulator.map((track: any) => track.album.id).indexOf(currentItem.album.id) > -1;
              if (!isAlbumInAccumulator) {
                if (currentItem.preview_url !== null) {
                  accumulator = [...accumulator, currentItem];
                }
              }
            } else {
              accumulator = [...accumulator, currentItem];
            }
            return accumulator;
          }, []);
          // We want to update the tracks with a few new properties
          const updatedTracks = filteredTracks.map((track: any) => addPropertiesToTrack(track));
          // We'll get 9 filtered tracks to display for album art
          if (updatedTracks.length > 9) {
            setTracksData(splitItems(updatedTracks.splice(0, 9), 3));
          } else {
            setTracksData(splitItems(updatedTracks, 3));
          }
          // Then we're going to get a random track from one of those
          // This type just grabs a random track of the users top track
          const randomTrack = updatedTracks.filter((track: any) => track.preview_url !== null)[
            getRandomInt(0, updatedTracks.length - 1)
          ];
          props.updateTrackURL(randomTrack.preview_url);
        } else {
          props.handleThrowFallback();
        }
      })
      .catch(() => props.handleThrowFallback());
    return () => controller.abort();
  }, []);

  return (
    <StyledTopTracksUser>
      <StyledAlbumBackgroundWrapper>
        <StyledAlbumBackgroundContainer>
          {tracksData.length > 0 && tracksData.map((trackGroup: any, index: number) => (
            <StyledBackgroundGroup column={index + 1}>
              {trackGroup.map((track: any, index: number) => (
                <StyledBackgroundAlbumContainer key={index}>
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
      <StyledTopTracksUserText>
        {text !== null && <StyledMarkdownText palette={props.palette} dangerouslySetInnerHTML={{ __html: sanitize(marked(text)) }} />}
      </StyledTopTracksUserText>
    </StyledTopTracksUser>
  );
};

export default TopTracksUserType;

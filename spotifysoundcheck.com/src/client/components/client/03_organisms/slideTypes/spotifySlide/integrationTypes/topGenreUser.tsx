import React, { Fragment, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { Heading1Styles } from '../../../../01_atoms/heading';
import { IPalette } from '../../../../../common/types';
import ProgressBar from '../../../../02_molecules/progressBar';
import { SmallTextStyles } from '../../../../../common/01_atoms/text';
import SlideAudioPlayer from '../../../../02_molecules/slideAudioPlayer';
import { capitalize } from '../../../../../common/utils';

const StyledTopGenreUser = styled.div`
  height: 100%;
  width: 100vw;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 100px 1fr;
  grid-column-gap: 24px;
  position: relative;

  @media (max-width: 1440px) {
    padding: 0 30px;
  }

  @media (max-width: 1024px) {
    grid-template-rows: 1fr auto auto 1fr;
    grid-template-columns: repeat(4, 1fr);
    padding: 30px;
  }
`;

const StyledTopBar = styled.div`
  grid-row: 1;
  grid-column: 2 / span 8;
  text-align: left;
  display: flex;
  align-items: center;

  h2 {
    ${SmallTextStyles};
    color: var(--color-DARKNESS);
    font-weight: normal;
  }

  @media (max-width: 1440px) {
    grid-column: 1 / span 12;
  }

  @media (max-width: 1024px) {
    align-items: flex-start;
    grid-column: 1 / span 4;
    margin-bottom: 20px;
  }
`;

interface IStyledGenreTextProps {
  palette: IPalette;
}

const StyledGenreText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  grid-row: 1 / span 2;
  grid-column: 2 / span 5;
  h1 {
    margin-bottom: 0;
    color: ${(props: IStyledGenreTextProps) => props.palette.foreground};
    ${Heading1Styles};
  }
  h1,
  p {
    text-align: left;
  }

  @media (max-width: 1440px) {
    grid-column: 1 / span 7;
  }

  @media (max-width: 1024px) {
    grid-column: 1 / span 4;
    grid-row: auto;
    margin-bottom: 40px;

    p {
      max-width: 600px;
    }
  }
`;

const StyledGenreList = styled.div`
  grid-column: 7 / span 5;
  grid-row: 1 / span 2;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: center;

  & > *:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 1440px) {
    grid-column: 8 / span 6;
  }

  @media (max-width: 1024px) {
    grid-column: 1 / span 4;
    grid-row: 3;
    width: 100%;
  }
`;

const growingCircleContainerAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    display: none;
  }
`

const StyledGrowingCircleContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 2;
  animation: ${growingCircleContainerAnimation} cubic-bezier(.68,-0.55,.27,1.55) 2s 1 normal forwards;
  background-color: var(--color-SNOW);
  pointer-events: none;
`;

const growingCircleAnimation = keyframes`
  0% {
    transform: scale(0);
  }
  25% {
    transform: scale(3);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(12);
  }
`;

interface IStyledGrowingCircleProps {
  palette: IPalette;
}

const StyledGrowingCircle = styled.div`
  position: absolute;
  bottom: -25vh;
  left: -15vw;
  height: 550px;
  width: 550px;
  border-radius: 50%;
  z-index: 3;
  background-color: ${(props: IStyledGrowingCircleProps) => props.palette.background};
  animation: ${growingCircleAnimation} cubic-bezier(.79,.14,.15,.86) 2s 1 normal forwards;
`;

const StyledPlayButtonForLargeScreens = styled.div`
  display: none;
  width: 100%;
  @media(min-width: 1025px) {
    display: block;
  }
`

const StyledPlayButtonForSmallScreens = styled.div`
  display: none;
  grid-column: 1 / span 4;
  margin-top: 50px;
  @media(max-width: 1024px) {
    display: block;
  }
`

interface ITopGenreUserProps {
  slide: any;
  handleGetData: (apiEndpoint: string, abortSignal: AbortSignal) => any;
  handleThrowFallback: () => void;
  updateTrackURL: (trackURL: string) => void;
  palette: IPalette;
}

function addDisplayWidth (dataset: any) {
  const max = Math.max(...dataset.map((d: any) => d.percentage))
  return dataset.map((d: any) => {
    d.width = d.percentage / max * 100
    return d
  });
}

const TopGenreUser = (props: ITopGenreUserProps) => {
  const [genreData, setGenreData] = useState<any>();
  const [artistData, setArtistData] = useState<any>();

  useEffect(() => {
    const genreController = new AbortController();
    const artistsController = new AbortController();
    props
      .handleGetData('https://api.spotify.com/v1/me/top/artists', genreController.signal)
      .then((artists: any) => {
        const artistsItems = artists.items;
        // First we organize all of our genres with their respective "counts"
        const genres = artistsItems.reduce((accumulator: any, currentItem: any) => {
          const currentItemGenres = currentItem.genres;
          currentItemGenres.forEach((genre: any) => {
            if (accumulator[genre] !== undefined) {
              accumulator[genre].count = accumulator[genre].count + 1;
            } else {
              accumulator[genre] = {
                name: genre,
                count: 1
              };
            }
          });
          return accumulator;
        }, {});
        const sortedGenres = Object.keys(genres).sort((genreAKey, genreBKey) => {
          if (genres[genreAKey].count > genres[genreBKey].count) {
            return -1;
          } else if (genres[genreAKey].count === genres[genreBKey].count) {
            return 0;
          } else {
            return 1;
          }
        });
        // Now we grab the total amount of genres
        const totalGenres = Object.keys(genres).length;
        const percentagePerGenre = totalGenres / artists.items.length;
        // If the genres don't have at least 6 we're going to go to the fallback slide
        if (sortedGenres.length < 6) {
          props.handleThrowFallback();
        }
        const top6Genres = sortedGenres.slice(0, 6).map(genre => ({
          name: capitalize(genre),
          percentage: Math.round((genres[genre].count * percentagePerGenre * 100) / 100)
        }));
        setGenreData(top6Genres);
        // We also want to set few tracks to potentially play in the background. We're going to grab the first artist that meets the top genre requirement
        const topGenre = top6Genres[0].name.toLowerCase();
        const topArtistByGenre = artistsItems.filter(
          (artist: any) => artist.genres.indexOf(topGenre) > -1
        )[0];
        // Now that we have an artist, lets grab their top tracks
        // NOTE: Since this call is exclusively for background music, we don't need to throw a throbber or handle state for a second call
        props
          .handleGetData(
            `https://api.spotify.com/v1/artists/${topArtistByGenre.id}/top-tracks?country=US`,
            artistsController.signal
          )
          .then((artistTopTracks: any) => {
            // NOTE: We want to update the Track URL for the global track component, and we'll also use that track as our artist data
            const chosenTrack = artistTopTracks.tracks.filter(
              (track: any) => track.preview_url !== null
            )[0];
            setArtistData(chosenTrack);
            props.updateTrackURL(chosenTrack.preview_url);
          })
          .catch(() => props.handleThrowFallback());
      })
      .catch(() => props.handleThrowFallback());
    return () => {
      genreController.abort();
      artistsController.abort();
    };
  }, []);

  return (
    <StyledTopGenreUser>
      <StyledTopBar>
        <h2>
          <strong>Your Top Genre</strong>
        </h2>
      </StyledTopBar>
      {genreData !== undefined && (
        <Fragment>
          <StyledGenreText palette={props.palette}>
            <h1>{genreData[0].name}</h1>
            <p>
              You listen to {genreData[0].name} more than any other genre. Clearly, you&rsquo;ve got
              good taste.
            </p>
            {artistData != null &&
              <StyledPlayButtonForLargeScreens>
                <SlideAudioPlayer
                  trackName={artistData.name}
                  artistName={artistData.artists[0].name}
                  />
              </StyledPlayButtonForLargeScreens>
            }
          </StyledGenreText>
          <StyledGenreList>
            {
              addDisplayWidth(genreData)
              .map((genre: any, index: number) => (
                <ProgressBar
                label={genre.name}
                metric={genre.percentage}
                percentage={genre.width}
                isHighlighted={index === 0}
                palette={props.palette}
                />
                ))
              }
          </StyledGenreList>
          {artistData != null &&
            <StyledPlayButtonForSmallScreens>
              <SlideAudioPlayer
                trackName={artistData.name}
                artistName={artistData.artists[0].name}
                />
            </StyledPlayButtonForSmallScreens>
          }
        </Fragment>
      )}
      <StyledGrowingCircleContainer>
        <StyledGrowingCircle palette={props.palette} />
      </StyledGrowingCircleContainer>
    </StyledTopGenreUser>
  );
};

export default TopGenreUser;

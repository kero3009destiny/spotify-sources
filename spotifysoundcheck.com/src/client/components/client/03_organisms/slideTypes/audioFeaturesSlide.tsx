import React, { useEffect, useState, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import moment from 'moment';
import Sound from 'react-sound';
import { IPalette } from '../../../common/types';
import { NormalTextStyles } from '../../../common/01_atoms/text';

interface IStyledAudioFeaturesSlideProps {
  timeOfDay: string | null;
  palette: {
    morningColor: string,
    afternoonColor: string,
    eveningColor: string,
    default: string
  }
}

const StyledAudioFeaturesSlide = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 60px 15% 1fr 5% 80px;
  grid-gap: 24px;
  position: relative;
  background-color: ${(props: IStyledAudioFeaturesSlideProps) => {
    switch (props.timeOfDay) {
      case 'morning':
          return props.palette.morningColor;
      case 'afternoon':
          return props.palette.afternoonColor;
      case 'evening':
          return props.palette.eveningColor;
      case 'none':
      default:
        return props.palette.default;
    }
  }};
  transition: background-color 250ms ease-in;
  h2 {
    ${NormalTextStyles};
    font-weight: normal;
    grid-column: 2 / span 4;
    grid-row: 2;
    color: var(--color-DARKNESS);
  }
`;

const StyledText = styled.div`
  grid-column: 2 / span 9;
  grid-row: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: absolute;
  z-index: 2;
  h1 {
    font-size: 10vw;
    line-height: 10vw;
    letter-spacing: -8px;
    font-weight: bold;
    text-transform: none;
    color: var(--color-SNOW);
  }
  p {
    color: var(--color-SNOW);
  }
`;

const StyledBackground = styled.div`
  grid-column: 9 / span 4;
  grid-row: 3;
  background-image: url("data:image/svg+xml,%3Csvg width='601' height='462' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M477 111.5c0 9.665-7.835 17.5-17.5 17.5s-17.5-7.835-17.5-17.5S449.835 94 459.5 94s17.5 7.835 17.5 17.5M240 297a9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9 9 9 0 0 1 9 9M498 397a9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9 9 9 0 0 1 9 9M111 383a9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9 9 9 0 0 1 9 9M162.5 9L117 88h91zM587.5 292L574 316h27z' fill='%23FFC864'/%3E%3Cpath d='M53.837 215c-3.35-1.112-4.69-3.063-5.765-4.63-.958-1.396-1.714-2.498-3.889-3.22-2.174-.72-3.44-.29-5.046.255-1.803.612-4.047 1.374-7.396.262-3.35-1.112-4.69-3.063-5.765-4.63-.958-1.395-1.714-2.498-3.888-3.219-2.175-.722-3.441-.291-5.045.254-1.803.613-4.045 1.375-7.396.262-3.349-1.111-4.687-3.062-5.762-4.63-.957-1.394-1.713-2.496-3.885-3.217L1.163 189c3.349 1.111 4.687 3.061 5.762 4.63.957 1.394 1.713 2.496 3.885 3.217 2.174.721 3.44.291 5.046-.254 1.802-.612 4.045-1.375 7.395-.262 3.35 1.111 4.69 3.062 5.764 4.63.958 1.395 1.715 2.497 3.888 3.219 2.174.72 3.442.29 5.047-.254 1.802-.613 4.046-1.374 7.397-.262 3.35 1.112 4.689 3.063 5.765 4.63.958 1.395 1.714 2.497 3.888 3.219L53.837 215zM420.693 323c-2.387-.191-3.6-1.291-4.485-2.093-.726-.658-1.163-1.054-2.27-1.143-1.104-.087-1.605.233-2.434.765-1.013.65-2.396 1.541-4.786 1.349-2.387-.192-3.599-1.291-4.484-2.094-.724-.656-1.161-1.053-2.266-1.142-1.106-.087-1.605.233-2.433.765-1.012.65-2.394 1.543-4.785 1.349-2.386-.191-3.599-1.291-4.484-2.094-.724-.656-1.162-1.053-2.266-1.142l.307-3.52c2.387.191 3.599 1.291 4.484 2.094.724.656 1.161 1.053 2.265 1.142 1.105.087 1.606-.233 2.433-.765 1.012-.65 2.397-1.542 4.786-1.349 2.387.19 3.599 1.291 4.484 2.093.725.657 1.161 1.054 2.266 1.143 1.106.086 1.605-.234 2.434-.766 1.013-.65 2.397-1.54 4.786-1.349 2.388.192 3.6 1.291 4.486 2.093.725.658 1.163 1.055 2.269 1.144l-.307 3.52zM335.531 34L332 33.236c.473-2.316 1.69-3.371 2.58-4.142.719-.623 1.153-1 1.371-2.062.217-1.064-.034-1.59-.449-2.458-.512-1.074-1.214-2.543-.74-4.86.472-2.316 1.69-3.37 2.578-4.14.72-.622 1.153-.998 1.37-2.06.218-1.062-.034-1.587-.448-2.456-.513-1.072-1.215-2.542-.742-4.858.473-2.316 1.69-3.37 2.58-4.14.718-.622 1.152-.999 1.37-2.06l3.53.764c-.473 2.316-1.69 3.369-2.579 4.14-.72.622-1.154.998-1.37 2.06-.217 1.062.033 1.587.448 2.456.512 1.072 1.215 2.542.742 4.858-.473 2.316-1.69 3.37-2.579 4.14-.72.622-1.154.998-1.37 2.06-.217 1.064.033 1.589.448 2.457.512 1.073 1.214 2.543.742 4.86-.474 2.317-1.69 3.372-2.58 4.141-.72.624-1.154 1-1.37 2.064M280.593 462L278 459.31c1.835-1.854 3.385-2.278 4.63-2.62 1.074-.293 1.85-.506 2.99-1.657 1.14-1.151 1.358-1.943 1.66-3.04.349-1.27.784-2.851 2.619-4.705 1.834-1.853 3.383-2.277 4.628-2.617 1.074-.294 1.85-.506 2.988-1.656 1.139-1.15 1.356-1.943 1.657-3.038.35-1.27.784-2.85 2.619-4.703 1.834-1.854 3.383-2.278 4.629-2.618 1.073-.294 1.849-.506 2.987-1.656l2.593 2.69c-1.834 1.854-3.383 2.278-4.629 2.618-1.073.293-1.848.505-2.987 1.655-1.139 1.151-1.356 1.943-1.658 3.039-.35 1.269-.784 2.85-2.618 4.703-1.835 1.854-3.383 2.277-4.629 2.617-1.073.294-1.85.506-2.988 1.657-1.14 1.15-1.357 1.943-1.658 3.039-.35 1.27-.785 2.851-2.62 4.705-1.836 1.854-3.384 2.278-4.63 2.62-1.074.293-1.85.506-2.99 1.657M569.593 247L567 244.31c1.835-1.854 3.385-2.278 4.63-2.62 1.074-.293 1.85-.506 2.99-1.657 1.14-1.151 1.358-1.943 1.66-3.04.349-1.27.784-2.851 2.619-4.705 1.834-1.853 3.383-2.277 4.628-2.617 1.074-.294 1.85-.506 2.988-1.656 1.139-1.15 1.356-1.943 1.657-3.038.35-1.27.784-2.85 2.619-4.703 1.834-1.854 3.383-2.278 4.629-2.618 1.073-.294 1.849-.506 2.987-1.656l2.593 2.69c-1.834 1.854-3.383 2.278-4.629 2.618-1.073.293-1.848.505-2.987 1.655-1.139 1.151-1.356 1.943-1.658 3.039-.35 1.269-.784 2.85-2.618 4.703-1.835 1.854-3.383 2.277-4.629 2.617-1.073.294-1.85.506-2.988 1.657-1.14 1.15-1.357 1.943-1.658 3.039-.35 1.27-.785 2.851-2.62 4.705-1.836 1.854-3.384 2.278-4.63 2.62-1.074.293-1.85.506-2.99 1.657' fill='%23FFF'/%3E%3Cpath d='M569.593 247L567 244.31c1.835-1.854 3.385-2.278 4.63-2.62 1.074-.293 1.85-.506 2.99-1.657 1.14-1.151 1.358-1.943 1.66-3.04.349-1.27.784-2.851 2.619-4.705 1.834-1.853 3.383-2.277 4.628-2.617 1.074-.294 1.85-.506 2.988-1.656 1.139-1.15 1.356-1.943 1.657-3.038.35-1.27.784-2.85 2.619-4.703 1.834-1.854 3.383-2.278 4.629-2.618 1.073-.294 1.849-.506 2.987-1.656l2.593 2.69c-1.834 1.854-3.383 2.278-4.629 2.618-1.073.293-1.848.505-2.987 1.655-1.139 1.151-1.356 1.943-1.658 3.039-.35 1.269-.784 2.85-2.618 4.703-1.835 1.854-3.383 2.277-4.629 2.617-1.073.294-1.85.506-2.988 1.657-1.14 1.15-1.357 1.943-1.658 3.039-.35 1.27-.785 2.851-2.62 4.705-1.836 1.854-3.384 2.278-4.63 2.62-1.074.293-1.85.506-2.99 1.657M298.593 197L296 194.31c1.835-1.854 3.385-2.278 4.63-2.62 1.074-.293 1.85-.506 2.99-1.658 1.14-1.15 1.358-1.943 1.66-3.038.349-1.27.784-2.851 2.619-4.706 1.834-1.853 3.383-2.276 4.628-2.616 1.074-.295 1.85-.506 2.988-1.657 1.139-1.15 1.356-1.942 1.657-3.037.35-1.271.784-2.852 2.619-4.705 1.834-1.853 3.384-2.277 4.629-2.617 1.073-.293 1.849-.506 2.987-1.656l2.593 2.69c-1.835 1.854-3.384 2.278-4.629 2.618-1.073.293-1.849.505-2.987 1.655-1.139 1.15-1.356 1.943-1.658 3.038-.35 1.27-.784 2.851-2.618 4.705-1.835 1.853-3.383 2.276-4.629 2.616-1.073.294-1.85.506-2.988 1.657-1.14 1.15-1.357 1.943-1.658 3.039-.35 1.27-.785 2.851-2.62 4.705-1.836 1.854-3.385 2.278-4.63 2.62-1.075.293-1.85.506-2.99 1.657' fill='%23FFF'/%3E%3C/g%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  height: 100%;
  img {
    width: 350px;
    height: auto;
    object-fit: cover;
  }
`;

interface IAudioFeaturesSlideProps {
  spotifyAccessToken: string;
  palette: IPalette;
  slide: any;
  slideTime: number;
  onSlideEnd: any;
}

const AudioFeaturesSlide = (props: IAudioFeaturesSlideProps) => {
  const [selectedTrack, setSelectedTrack] = useState<any>(null);
  const [timeOfDay, setTimeOfDay] = useState<null | 'morning' | 'afternoon' | 'evening'>(null);

  let onSlideEndTimeout: any;
  // Component did mount
  useEffect(() => {
    // Set our timeout
    onSlideEndTimeout = setTimeout(() => props.onSlideEnd(), props.slideTime);
    // Fetch the users recently played tracks
    const controller = new AbortController();
    const signal = controller.signal;
    fetch('https://api.spotify.com/v1/me/player/recently-played', {
      headers: {
        Authorization: `Bearer ${props.spotifyAccessToken}`
      },
      signal
    })
      .then(res => res.json())
      .then(recentlyPlayedTracks => {
        // We want to organize the tracks to be a bit more readable in by the way our state is structured
        const organizedTracks = recentlyPlayedTracks.items.map((recentlyPlayedTrack: any) => ({
          ...recentlyPlayedTrack.track,
          context: {
            ...recentlyPlayedTrack.context,
            playedAt: recentlyPlayedTrack.played_at
          }
        }));
        // The selected track URL will be the last track in the list that has a preview url
        const filteredTracks = organizedTracks.filter((track: any) => track.preview_url !== null);
        const lastTrack = filteredTracks[filteredTracks.length - 1];
        // And we'll set that as our selected track url state
        setSelectedTrack(lastTrack);
      });
    return () => {
      controller.abort();
      clearTimeout(onSlideEndTimeout);
    }
  }, []);

  // Update time of day once we have the selected track
  useEffect(() => {
    if (selectedTrack !== null) {
      const tod: number = Number(moment(selectedTrack.context.playedAt).format('H'));
      if (tod < 12) {
        setTimeOfDay('morning');
      } else if (tod > 12 && tod < 18) {
        setTimeOfDay('afternoon');
      } else {
        setTimeOfDay('evening');
      }
    }
  }, [selectedTrack]);

  const getHeaderCopy = () => {
    switch (timeOfDay) {
      case 'morning':
        return 'Your high-energy morning';
      case 'afternoon':
        return 'Your energetic afternoon';
      case 'evening':
        return 'Your mellow nightcap';
      default:
        return 'Loading your radical music tastes...';
    }
  };

  const {
    fields: {
      afternoonColor = props.palette.background,
      morningColor = props.palette.background,
      eveningColor = props.palette.background
    }
  } = props.slide;

  return (
    <StyledAudioFeaturesSlide
      timeOfDay={timeOfDay}
      palette={{
        morningColor,
        afternoonColor,
        eveningColor,
        default: props.palette.background
      }}
    >
      <h2>
        <strong>When you stream</strong>
      </h2>
      {selectedTrack !== null && (
        <Fragment>
          <StyledText>
            <h1>{getHeaderCopy()}</h1>
            <p>
              You last listened to {selectedTrack.name} by {selectedTrack.artists[0].name} at{' '}
              {moment(selectedTrack.context.playedAt).format('ha, dddd')}.
            </p>
          </StyledText>
          <StyledBackground>
            <img src={selectedTrack.album.images[1].url} />
          </StyledBackground>
        </Fragment>
      )}
    </StyledAudioFeaturesSlide>
  );
};

const mapStateToProps = (state: any) => ({
  spotifyAccessToken: state.user.access_token
});

export default connect(mapStateToProps)(AudioFeaturesSlide);

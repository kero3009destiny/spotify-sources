import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'i18n/nexti18n';
import { useIsMounted } from 'utils/use-is-mounted';
import {
  eventTrack,
  AUDIO_COMPLETE,
  AUDIO_PROGRESS,
  AUDIO_PLAY_PAUSE,
} from 'utils/google-tag-manager';

import LoadingSVG from './assets/loading.svg';
import PauseButtonSVG from './assets/pause.svg';
import PlayButtonSVG from './assets/play.svg';

import * as Styled from './AudioPlayer.styled';

/**
 * PlayButton Component
 * @param {object} props
 * @param {boolean} props.isPlaying - If audio is playing or not
 * @param {string} props.title - The title of the audio
 * @param {Function} props.onClick - on click handler
 * @returns {ReactComponent}
 */
const PlayButton = ({ isPlaying, isLoading, title = '', onClick }) => {
  const { t } = useTranslation();
  const alt = isPlaying ? t('pauseAudio') : t('playAudio');
  const PlayingComponentStateSVG = isPlaying ? PauseButtonSVG : PlayButtonSVG;
  return (
    <Styled.PlayButton alt={`${alt} ${title}`} onClick={onClick}>
      {isLoading ? (
        <Styled.Loading>
          <LoadingSVG />
        </Styled.Loading>
      ) : (
        <PlayingComponentStateSVG />
      )}
    </Styled.PlayButton>
  );
};

/**
 * ProgressBar Component
 * @param {object} props
 * @param {number} props.currentTime - value indicating the current playback position, in seconds, of the audio
 * @param {number} props.duration - value which indicates the duration (total length) of the audio in seconds
 * @returns {ReactComponent}
 */
const ProgressBar = ({ progress }) => (
  <Styled.ProgressContainer>
    <Styled.ProgressBar style={{ transform: `translateX(${progress}%)` }} />
  </Styled.ProgressContainer>
);

/**
 * Timer Component
 * @param {object} props
 * @param {number} props.currentTime - value indicating the current playback position, in seconds, of the audio
 * @param {number} props.duration - value which indicates the duration (total length) of the audio in seconds
 * @returns {ReactComponent}
 */
const Timer = ({ currentTime, duration }) => {
  const currentTimeString = currentTime
    ? new Date(currentTime * 1000).toISOString().substring(14, 19)
    : '00:00';
  const durationString = duration
    ? new Date(duration * 1000).toISOString().substring(14, 19)
    : '00:00';

  return (
    <Styled.Timer>{`${currentTimeString} / ${durationString}`}</Styled.Timer>
  );
};

const PROGRESS_WAY_POINTS = [0, 25, 50, 75, 100];

/**
 * AudioPlayer Component
 * @param {object} props
 * @param {string} props.title - The title of the audio
 * @param {string} props.caption - The caption of the audio
 * @param {string} pageContext - Page context (eg. PageDetail).
 * @param {string} modifier - Overrides pageContext modifier
 * @param {object} props.data - The data of the audio
 * @param {string} props.data.url - The audio url from the api
 * @param {string} props.data.contentType - The audio type from the api (eg. audio/mpeg)
 * @param {string} props.data.fileName - The name of the file
 * @returns {ReactComponent}
 */
const AudioPlayer = ({
  title = '',
  caption = '',
  data = {},
  pageContext = '',
  modifier = '',
}) => {
  const playerRef = useRef(null);
  const setRef = useRef(new Set());
  const [isPlaying, setPlayingStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const isMounted = useIsMounted();

  const onTimeUpdate = useCallback(() => {
    if (!playerRef.current) return;

    const {
      currentTime: currentTimeFromRef,
      duration: durationFromRef,
    } = playerRef.current;
    const progressFromRef = (currentTimeFromRef / durationFromRef) * 100;

    setCurrentTime(currentTimeFromRef);
    setDuration(durationFromRef);
    setProgress(progressFromRef);
    setIsLoading(false);

    const progressRounded = Math.floor(progressFromRef);
    if (
      isPlaying &&
      PROGRESS_WAY_POINTS.includes(progressRounded) &&
      !setRef.current.has(progressRounded)
    ) {
      setRef.current.add(progressRounded);
      eventTrack(AUDIO_PROGRESS, {
        data,
        title,
        progress: `${progressRounded}%`,
      });
    }
  }, [playerRef.current, isPlaying]);

  const onAudioEnded = useCallback(() => {
    if (!playerRef.current) return;

    setPlayingStatus(false);
    eventTrack(AUDIO_COMPLETE, { data, title });
  }, [playerRef.current]);

  const onAudioWaiting = useCallback(() => {
    setIsLoading(true);
  }, []);

  const onButtonPress = useCallback(() => {
    if (!playerRef.current) return;

    const action = isPlaying ? 'pause' : 'play';
    /**
     * Play and stop APIs would make more sense to be fired inside a react hook effect
     * but since Safari Audio Policies we cannot do it that way. It needs to happen in the event fired by the user.
     */
    playerRef.current[action]();
    setPlayingStatus(prevIsPlaying => !prevIsPlaying);
  }, [playerRef.current, isPlaying]);

  useEffect(() => {
    if (!isMounted) return;

    eventTrack(AUDIO_PLAY_PAUSE, {
      isPlaying,
      data,
      progress: `${Math.floor(progress)}%`,
    });
  }, [isPlaying]);

  useEffect(() => {
    if (playerRef.current) {
      onTimeUpdate();
    }
  }, [playerRef.current]);

  return (
    <Styled.Root modifier={modifier || pageContext}>
      <Styled.Container modifier={modifier || pageContext}>
        {title && <Styled.Title>{title}</Styled.Title>}
        <Styled.Player>
          <Styled.PlayerControls>
            <PlayButton
              isPlaying={isPlaying}
              isLoading={isLoading}
              title={title}
              onClick={onButtonPress}
            />
            <ProgressBar isPlaying={isPlaying} progress={progress} />
            <Timer currentTime={currentTime} duration={duration} />
          </Styled.PlayerControls>
          <Styled.Audio
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={onTimeUpdate}
            ref={data.url && playerRef}
            preload="metadata"
            onEnded={onAudioEnded}
            onWaiting={onAudioWaiting}
          >
            {data.url && <source src={data.url} type={data.contentType} />}
            Your browser does not support the audio element.
          </Styled.Audio>
        </Styled.Player>
        {caption && <Styled.Caption>{caption}</Styled.Caption>}
      </Styled.Container>
    </Styled.Root>
  );
};

AudioPlayer.propTypes = {
  /**
   * Title of the audio
   */
  title: PropTypes.string,
  /**
   * Caption of the audio
   */
  caption: PropTypes.string,
  /**
   * Data of the audio
   */
  data: PropTypes.shape({
    /**
     * Audio url from the api
     */
    url: PropTypes.string,
    /**
     * Audio type from the api "audio/mpeg"
     */
    contentType: PropTypes.string,
  }),
  /**
   * Page context (eg. PageDetail).
   */
  pageContext: PropTypes.string,
  /**
   * Overrides pageContext modifier
   */
  modifier: PropTypes.string,
};

export default AudioPlayer;

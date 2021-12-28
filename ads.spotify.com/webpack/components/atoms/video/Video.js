import React, { useState, useCallback, useEffect } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

import {
  eventTrack,
  VIDEO_COMPLETE,
  VIDEO_PLAY_PAUSE,
  VIDEO_PROGRESS,
} from 'utils/google-tag-manager';

import * as Styled from './Video.styled';

const PROGRESS_WAY_POINTS = [0, 25, 50, 75, 100];
/**
 * VideoPlayer component
 * @param {string} url The source of the video
 * @param {string} videoId - The id video
 * @param {string} videoName - the video name set by author
 * @param {string} type - The video player <Youtube | Vimeo | Default>
 * @param {string} caption - The video caption set by author
 * @param {boolean} controls - Shows or hide video player controls
 * @param {boolean} muted - mutes or unmutes audio
 * @returns {ReactComponent}
 */
const VideoPlayer = ({
  url,
  videoId,
  videoName,
  type,
  caption,
  playing: playingArg = false,
  controls,
  muted,
  volume,
}) => {
  const [progress, setProgress] = useState(0);
  const [indexPoint, setIndexPoint] = useState(0);
  const [playing, setPlaying] = useState(false);

  const taggingProgress = useCallback(
    ({ played }) => {
      const percentagePlayed = Math.floor(played * 100);
      const currentProgressPoint = PROGRESS_WAY_POINTS[indexPoint];

      setProgress(percentagePlayed);

      if (percentagePlayed >= currentProgressPoint && playing) {
        eventTrack(VIDEO_PROGRESS, {
          progress: `${currentProgressPoint}%`,
          videoName,
          videoUrl: url,
          videoPlayer: type,
          videoId,
          videoCaption: caption,
        });
        setIndexPoint(prevIndexPoint => prevIndexPoint + 1);
      }
    },
    [playing, indexPoint],
  );

  const taggingPlayPause = useCallback(
    isPlaying => {
      setPlaying(isPlaying);
      eventTrack(VIDEO_PLAY_PAUSE, {
        isPlaying,
        progress: `${progress}%`,
        videoName,
        videoUrl: url,
        videoPlayer: type,
        videoCaption: caption,
        videoId,
      });
    },
    [progress],
  );

  const taggingEnd = useCallback(() => {
    eventTrack(VIDEO_COMPLETE, {
      videoName,
      videoUrl: url,
      videoPlayer: type,
      videoId,
      videoCaption: caption,
    });
  });

  const handlePlay = () => taggingPlayPause(true);

  const handlePause = () => taggingPlayPause(false);

  useEffect(() => {
    if (playingArg) {
      handlePlay();
    } else {
      handlePause();
    }
  }, [playingArg]);

  return (
    <Styled.VideoContainer>
      <Styled.Video>
        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          controls={controls}
          volume={volume}
          muted={muted}
          onProgress={taggingProgress}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={taggingEnd}
          playing={playing}
        />
      </Styled.Video>
    </Styled.VideoContainer>
  );
};

export const TYPES = {
  YOUTUBE: 'YouTube',
  VIMEO: 'Vimeo',
  DEFAULT: 'Default',
};

const VIDEO_TYPES = {
  [TYPES.YOUTUBE]: {
    VideoComponent: VideoPlayer,
    srcFormatter: videoId => `https://www.youtube.com/embed/${videoId}`,
  },
  [TYPES.VIMEO]: {
    VideoComponent: VideoPlayer,
    srcFormatter: videoId => `https://player.vimeo.com/video/${videoId}`,
  },
  [TYPES.DEFAULT]: {
    VideoComponent: VideoPlayer,
    srcFormatter: url => url,
  },
};

/**
 * @typedef VideoData
 * @property {ReactComponent} VideoComponent - A component that handles the video render
 * @property {Function} srcFormatter - A function that handles the URL format for the video
 */

/**
 * getVideoByType - Gets the video data by type
 * @param {string} type - Video Type
 * @returns {VideoData}
 */
const getVideoByType = type => VIDEO_TYPES[type] || VIDEO_TYPES[TYPES.DEFAULT];

/**
 * Video component
 * @param {object} props
 * @returns {ReactComponent}
 */
const Video = ({
  type = 'Video',
  videoId,
  videoName = '',
  caption = '',
  url,
  playing,
  controls = true,
  muted = false,
  volume = 1,
}) => {
  const { VideoComponent, srcFormatter } = getVideoByType(type);
  return (
    <Styled.Root>
      <VideoComponent
        url={srcFormatter(videoId || url)}
        videoId={videoId}
        videoName={videoName}
        type={type}
        caption={caption}
        playing={playing}
        controls={controls}
        muted={muted}
        volume={volume}
      />
      {caption && <Styled.Caption>{caption}</Styled.Caption>}
    </Styled.Root>
  );
};

Video.propTypes = {
  /**
   * An optional Video Type otherwise defaults to DEFAULT
   */
  type: PropTypes.oneOf([TYPES.YOUTUBE, TYPES.VIMEO]),
  /**
   * Video Id
   */
  videoId: PropTypes.string,
  /**
   * Video Name
   */
  videoName: PropTypes.string,
  /**
   * An optional caption at the bottom of the video
   */
  caption: PropTypes.string,
  /**
   * An optional number from 0-1 to set the volume
   */
  volume: PropTypes.number,
};

export default Video;

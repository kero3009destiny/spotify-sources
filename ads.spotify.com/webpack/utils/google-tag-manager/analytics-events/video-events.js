import lowerCase from 'lodash/lowerCase';
import { TYPES, CATEGORY } from './event-types';

/**
 * Joins common attributes to track video events with custom data
 * @param {object} data
 * @returns {object} joined data
 */
const videoEvent = data => ({
  event: TYPES.videoEvent,
  eventCategory: CATEGORY.video,
  ...data,
});

/**
 * The VIDEO_PLAY_PAUSE event map function
 * @param {boolean} isPlaying - Whether video is playing or not
 * @param {string} progress - The current percentage time on the video player
 * @param {string} videoName - The video name
 * @param {string} videoUrl - The video url
 * @param {string} videoPlayer - The video player <Youtube | Vimeo | Default>
 * @param {string} videoId - The video id
 * @param {string} videoCaption - The video caption
 */
export const VIDEO_PLAY_PAUSE = ({
  isPlaying,
  progress,
  videoName,
  videoUrl,
  videoPlayer,
  videoId,
  videoCaption,
}) =>
  videoEvent({
    eventAction: isPlaying ? 'play' : 'pause',
    eventLabel: progress,
    videoName: lowerCase(videoName),
    videoUrl,
    videoPlayer: videoPlayer.toLowerCase(),
    videoId,
    videoCaption: lowerCase(videoCaption),
  });

/**
 * The VIDEO_COMPLETE event map function
 * @param {string} videoName - The video name
 * @param {string} videoUrl - The video url
 * @param {string} videoPlayer - The video player <Youtube | Vimeo | Default>
 * @param {string} videoId - The video id
 * @param {string} videoCaption - The video caption
 */
export const VIDEO_COMPLETE = ({
  videoName,
  videoUrl,
  videoPlayer,
  videoId,
  videoCaption,
}) =>
  videoEvent({
    eventAction: 'complete',
    eventLabel: videoUrl,
    videoName: lowerCase(videoName),
    videoUrl,
    videoPlayer: videoPlayer.toLowerCase(),
    videoId,
    videoCaption: lowerCase(videoCaption),
  });

/**
 * The VIDEO_PROGRESS event map function
 * @param {string} progress - The current percentage time on the video player
 * @param {string} videoName - The video name
 * @param {string} videoUrl - The video url
 * @param {string} videoPlayer - The video player <Youtube | Vimeo | Default>
 * @param {string} videoId - The video id
 * @param {string} videoCaption - The video caption
 */
export const VIDEO_PROGRESS = ({
  progress,
  videoName,
  videoUrl,
  videoPlayer,
  videoId,
  videoCaption,
}) =>
  videoEvent({
    eventAction: progress,
    eventLabel: videoUrl,
    videoName: lowerCase(videoName),
    videoUrl,
    videoPlayer: videoPlayer.toLowerCase(),
    videoId,
    videoCaption: lowerCase(videoCaption),
  });

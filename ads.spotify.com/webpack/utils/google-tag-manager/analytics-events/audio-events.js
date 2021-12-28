import lowerCase from 'lodash/lowerCase';
import { TYPES, CATEGORY } from './event-types';

/**
 * Joins common attributes to track audio events with custom data
 * @param {object} data
 * @returns {object} joined data
 */
const audioEvent = data => ({
  event: TYPES.trackEvent,
  eventCategory: CATEGORY.audio,
  ...data,
});

/**
 * The AUDIO_PLAY_PAUSE event map function
 * @param {object} data - The audio data
 * @param {string} data.fileName - The audio name file
 * @param {boolean} isPlaying - Whether video is playing or not
 * @param {string} progress - The audio progress
 */
export const AUDIO_PLAY_PAUSE = ({ data, isPlaying, progress }) =>
  audioEvent({
    eventAction: isPlaying ? 'play' : 'pause',
    eventLabel: progress,
    fileName: data.fileName,
  });

/**
 * The AUDIO_COMPLETE event map function
 * @param {string} title - The audio headline
 * @param {object} data - The audio data
 * @param {string} data.fileName - The audio name file
 */
export const AUDIO_COMPLETE = ({ data, title }) =>
  audioEvent({
    eventAction: 'complete',
    eventLabel: lowerCase(title),
    fileName: data.fileName,
  });

/**
 * The AUDIO_PROGRESS event map function
 * @param {string} title - The audio headline
 * @param {number} progress - The audio progress
 * @param {object} data - The audio data
 * @param {string} data.fileName - The audio name file
 */
export const AUDIO_PROGRESS = ({ data, title, progress }) =>
  audioEvent({
    eventAction: progress,
    eventLabel: lowerCase(title),
    fileName: data.fileName,
  });

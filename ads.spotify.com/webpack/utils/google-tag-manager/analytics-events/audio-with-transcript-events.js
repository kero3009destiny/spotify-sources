import lowerCase from 'lodash/lowerCase';
import { TYPES, CATEGORY } from './event-types';
import { getLowerCase } from './event-utils';

/**
 * Joins common attributes to track audio events with custom data
 * @param {object} data
 * @returns {object} joined data
 */
const audioWithTranscriptEvent = data => ({
  event: TYPES.trackEvent,
  eventCategory: CATEGORY.audioWithTranscript,
  ...data,
});

/**
 * The AUDIO_TRANSCRIPT_PLAY_PAUSE event map function
 * @param {object} audio - The audio data
 * @param {string} audio.url - The audio name file
 * @param {boolean} isPlaying - Whether video is playing or not
 * @param {string} progress - The audio progress
 */
export const AUDIO_TRANSCRIPT_PLAY_PAUSE = ({ audio, isPlaying, progress }) =>
  audioWithTranscriptEvent({
    eventAction: isPlaying ? 'play' : 'pause',
    eventLabel: progress,
    fileName: getLowerCase(audio, 'url'),
  });

/**
 * The AUDIO_TRANSCRIPT_COMPLETE event map function
 * @param {object} audio - The audio data
 * @param {string} audio.url - The audio name file
 * @param {string} title - The audio headline
 */
export const AUDIO_TRANSCRIPT_COMPLETE = ({ audio, title }) =>
  audioWithTranscriptEvent({
    eventAction: 'complete',
    eventLabel: lowerCase(title),
    fileName: getLowerCase(audio, 'url'),
  });

/**
 * The AUDIO_TRANSCRIPT_PROGRESS event map function
 * @param {object} audio - The audio data
 * @param {string} audio.url - The audio name file
 * @param {string} title - The audio headline
 * @param {number} progress - The audio progress
 */
export const AUDIO_TRANSCRIPT_PROGRESS = ({ audio, title, progress }) =>
  audioWithTranscriptEvent({
    eventAction: progress,
    eventLabel: lowerCase(title),
    fileName: getLowerCase(audio, 'url'),
  });

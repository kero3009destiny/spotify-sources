import { combineReducers } from 'redux';

import { createAsyncReducers } from '../../utils/asyncDucksHelpers';

import { mapI18NToCTAs, mapI18NToVOOptions } from './mappers';

import * as types from './types';

export function audienceSegments(state = {}, action) {
  switch (action.type) {
    case types.FETCH_AUDIENCE_SEGMENTS_SUCCEEDED:
      return action.payload;

    case types.FETCH_AUDIENCE_SEGMENTS_FAILED:
      return {};

    default:
      return state;
  }
}

export function moments(state = {}, action) {
  switch (action.type) {
    case types.FETCH_MOMENTS_SUCCEEDED:
      return action.payload;

    case types.FETCH_MOMENTS_FAILED:
      return {};

    default:
      return state;
  }
}

export function voiceoverOptions(state = {}, action) {
  switch (action.type) {
    case types.FETCH_VOICEOVER_OPTIONS_SUCCEEDED:
      return mapI18NToVOOptions(action.payload);

    case types.FETCH_VOICEOVER_OPTIONS_FAILED:
      return {};

    default:
      return state;
  }
}

export function ctaOptions(state = [], action) {
  switch (action.type) {
    case types.FETCH_CTA_OPTIONS_SUCCEEDED:
      return mapI18NToCTAs(action.payload);

    case types.FETCH_CTA_OPTIONS_FAILED:
    default:
      return state;
  }
}

export const fetchingCtaOptions = 'fetchingCtaOptions';
export const fetchCtaOptionsSuccess = 'fetchCtaOptionsSuccess';
export const fetchCtaOptionsError = 'fetchCtaOptionsError';

const ctaOptionsReducers = createAsyncReducers(
  fetchingCtaOptions,
  types.FETCH_CTA_OPTIONS_REQUESTED,
  fetchCtaOptionsSuccess,
  types.FETCH_CTA_OPTIONS_SUCCEEDED,
  fetchCtaOptionsError,
  types.FETCH_CTA_OPTIONS_FAILED,
);

export function companionImages(state = {}, action) {
  switch (action.type) {
    case types.FETCH_STOCK_COMPANION_IMAGES_SUCCEEDED:
      return action.payload;

    case types.FETCH_STOCK_COMPANION_IMAGES_FAILED:
    default:
      return state;
  }
}

export function contextualTargetingCategories(state = {}, action) {
  switch (action.type) {
    case types.FETCH_CATEGORIES_SUCCEEDED:
      return action.payload;

    case types.FETCH_CATEGORIES_FAILED:
    default:
      return state;
  }
}

export default combineReducers({
  audienceSegments,
  moments,
  voiceoverOptions,
  ctaOptions,
  ...ctaOptionsReducers,
  companionImages,
  contextualTargetingCategories,
});

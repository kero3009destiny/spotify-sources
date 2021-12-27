import * as types from './types';

export function fetchAudienceSegments() {
  return {
    type: types.FETCH_AUDIENCE_SEGMENTS_REQUESTED,
  };
}

export function fetchAudienceSegmentsSucceeded(segments) {
  return {
    type: types.FETCH_AUDIENCE_SEGMENTS_SUCCEEDED,
    payload: segments,
  };
}

export function fetchAudienceSegmentsFailed(error) {
  return {
    type: types.FETCH_AUDIENCE_SEGMENTS_FAILED,
    error: true,
    payload: error,
  };
}

export function fetchMoments() {
  return {
    type: types.FETCH_MOMENTS_REQUESTED,
  };
}

export function fetchMomentsSucceeded(segments) {
  return {
    type: types.FETCH_MOMENTS_SUCCEEDED,
    payload: segments,
  };
}

export function fetchMomentsFailed(error) {
  return {
    type: types.FETCH_MOMENTS_FAILED,
    error: true,
    payload: error,
  };
}

export function fetchVoiceoverOptions() {
  return {
    type: types.FETCH_VOICEOVER_OPTIONS_REQUESTED,
  };
}

export function fetchVoiceoverOptionsSucceeded(options) {
  return {
    type: types.FETCH_VOICEOVER_OPTIONS_SUCCEEDED,
    payload: options,
  };
}

export function fetchVoiceoverOptionsFailed(error) {
  return {
    type: types.FETCH_VOICEOVER_OPTIONS_FAILED,
    error: true,
    payload: error,
  };
}

export function fetchCtaOptions() {
  return {
    type: types.FETCH_CTA_OPTIONS_REQUESTED,
  };
}

export function fetchCtaOptionsSucceeded(options) {
  return {
    type: types.FETCH_CTA_OPTIONS_SUCCEEDED,
    payload: options,
  };
}

export function fetchCtaOptionsFailed(error) {
  return {
    type: types.FETCH_CTA_OPTIONS_FAILED,
    error: true,
    payload: error,
  };
}

export function fetchStockCompanionImages() {
  return {
    type: types.FETCH_STOCK_COMPANION_IMAGES_REQUESTED,
  };
}

export function fetchStockCompanionImagesSucceeded(options) {
  return {
    type: types.FETCH_STOCK_COMPANION_IMAGES_SUCCEEDED,
    payload: options,
  };
}

export function fetchStockCompanionImagesFailed(error) {
  return {
    type: types.FETCH_STOCK_COMPANION_IMAGES_FAILED,
    error: true,
    payload: error,
  };
}

export function fetchContextualTargetingCategories() {
  return {
    type: types.FETCH_CATEGORIES_REQUESTED,
  };
}

export function fetchContextualTargetingCategoriesSucceeded(categories) {
  return {
    type: types.FETCH_CATEGORIES_SUCCEEDED,
    payload: categories,
  };
}

export function fetchContextualTargetingCategoriesFailed(error) {
  return {
    type: types.FETCH_CATEGORIES_FAILED,
    error: true,
    payload: error,
  };
}

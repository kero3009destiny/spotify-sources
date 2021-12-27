import * as types from './types';

export function setNewFeatureShown(featureName) {
  return {
    type: types.SET_NEW_FEATURE_SHOWN,
    payload: { featureName },
  };
}

export function getHasNewFeatureBeenShown(featureName) {
  return {
    type: types.GET_HAS_NEW_FEATURE_BEEN_VIEWED,
    payload: { featureName },
  };
}

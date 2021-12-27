import get from 'lodash/get';

export const hasUserSeenNewFeature = (
  state: TSFixMe,
  featureName: string,
): boolean => {
  return get(state, `newFeatures.hasUserSeenNewFeature[${featureName}]`, false);
};

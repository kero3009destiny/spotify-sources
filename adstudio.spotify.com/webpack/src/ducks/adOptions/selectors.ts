import { fetchCtaOptionsSuccess } from './reducer';

import { ContextualTargetingCategories } from 'types/common/campaignHierarchy/types';

export const getAudienceSegments = (state: any) =>
  state.adOptions.audienceSegments;
export const getMoments = (state: any) => state.adOptions.moments;
export const getVoiceoverOptions = (state: any) =>
  state.adOptions.voiceoverOptions;
export const getCtaOptions = (state: any) => state.adOptions.ctaOptions;
export const getCtaOptionsSucceeded = (state: any) =>
  state.adOptions[fetchCtaOptionsSuccess];
export const getStockCompanionImages = (state: any) =>
  state.adOptions.companionImages;
export const getContextualTargetingCategories = (state: any) =>
  state.adOptions
    .contextualTargetingCategories as ContextualTargetingCategories;
export const getSafetyCategoriesList = (state: any) =>
  getContextualTargetingCategories(state)?.contentSafetyCategoriesList ?? [];
export const getContextualTargetingCategoriesList = (state: any) =>
  getContextualTargetingCategories(state)?.contextualTargetingCategoriesList ??
  [];

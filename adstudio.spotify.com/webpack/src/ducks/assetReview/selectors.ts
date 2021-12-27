import { AssetReviewState, PendingUserApprovalCreativesState } from './reducer';

import { PendingCreativeResponseRow } from 'types/common/state/api/assets';

export const getAssetReviewState = (state: TSFixMe): AssetReviewState => {
  return state.assetReview;
};

export const getPendingUserApprovalCreativesState = (
  state: TSFixMe,
): PendingUserApprovalCreativesState => {
  return getAssetReviewState(state).pendingUserApprovalCreatives;
};

export const selectPendingUserApprovalCreativeCount = (state: TSFixMe) => {
  return getAssetReviewState(state).pendingUserApprovalCreatives.items.length;
};

export const selectHasPendingUserApprovalCreatives = (state: TSFixMe) => {
  return selectPendingUserApprovalCreativeCount(state) > 0;
};

export const selectPendingUserApprovalCreatives = (
  state: TSFixMe,
  maxCount: number,
): PendingCreativeResponseRow[] => {
  return getPendingUserApprovalCreativesState(state).items.slice(0, maxCount);
};

export const selectPendingUserApprovalCreativesAreLoading = (
  state: TSFixMe,
) => {
  return getAssetReviewState(state).fetchingPendingUserApprovalCreatives;
};

export const isReviewingAsset = (state: TSFixMe): boolean => {
  const assetReviewState = getAssetReviewState(state);
  return (
    assetReviewState.approvingVoiceover ||
    assetReviewState.rejectingVoiceover ||
    assetReviewState.revisingVoiceoverBackground ||
    assetReviewState.revisingVoiceoverById
  );
};

export const assetScriptReviewSucceeded = (state: TSFixMe): boolean => {
  const assetReviewState = getAssetReviewState(state);
  return (
    assetReviewState.approveScriptSuccess ||
    assetReviewState.reviseScriptByIdSuccess
  );
};

export const assetScriptReviewError = (
  state: TSFixMe,
): string | boolean | Error => {
  const assetReviewState = getAssetReviewState(state);
  return (
    assetReviewState.approveScriptError ||
    assetReviewState.reviseScriptByIdError
  );
};

export const assetReviewSucceeded = (state: TSFixMe): boolean => {
  const assetReviewState = getAssetReviewState(state);
  return (
    assetReviewState.approveVoiceoverSuccess ||
    assetReviewState.rejectVoiceoverSuccess ||
    assetReviewState.reviseVoiceoverBackgroundSuccess ||
    assetReviewState.reviseVoiceoverByIdSuccess
  );
};

export const assetReviewError = (state: TSFixMe): string | boolean | Error => {
  const assetReviewState = getAssetReviewState(state);
  return (
    assetReviewState.approveVoiceoverError ||
    assetReviewState.rejectVoiceoverError ||
    assetReviewState.reviseVoiceoverBackgroundError ||
    assetReviewState.reviseVoiceoverByIdError
  );
};

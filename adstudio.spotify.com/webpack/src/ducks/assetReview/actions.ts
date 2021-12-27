import {
  APPROVE_SCRIPT_FAILED,
  APPROVE_SCRIPT_START,
  APPROVE_SCRIPT_SUCCEEDED,
  APPROVE_VOICEOVER_FAILED,
  APPROVE_VOICEOVER_START,
  APPROVE_VOICEOVER_SUCCEEDED,
  ApproveScriptErrorAction,
  ApproveScriptStartAction,
  ApproveScriptSuccessAction,
  ApproveVoiceoverErrorAction,
  ApproveVoiceoverStartAction,
  ApproveVoiceoverSuccessAction,
  ASSET_REVIEW_RESET,
  AssetReviewResetAction,
  FETCH_PENDING_USER_APPROVAL_CREATIVES_FAILED,
  FETCH_PENDING_USER_APPROVAL_CREATIVES_START,
  FETCH_PENDING_USER_APPROVAL_CREATIVES_SUCCEEDED,
  FetchPendingUserApprovalCreativesErrorAction,
  FetchPendingUserApprovalCreativesStartAction,
  FetchPendingUserApprovalCreativesSuccessAction,
  REJECT_VOICEOVER_FAILED,
  REJECT_VOICEOVER_START,
  REJECT_VOICEOVER_SUCCEEDED,
  RejectVoiceoverErrorAction,
  RejectVoiceoverStartAction,
  RejectVoiceoverSuccessAction,
  REVISE_SCRIPT_BY_ID_FAILED,
  REVISE_SCRIPT_BY_ID_START,
  REVISE_SCRIPT_BY_ID_SUCCEEDED,
  REVISE_VOICEOVER_BACKGROUND_FAILED,
  REVISE_VOICEOVER_BACKGROUND_START,
  REVISE_VOICEOVER_BACKGROUND_SUCCEEDED,
  REVISE_VOICEOVER_BY_ID_FAILED,
  REVISE_VOICEOVER_BY_ID_START,
  REVISE_VOICEOVER_BY_ID_SUCCEEDED,
  ReviseScriptByIdErrorAction,
  ReviseScriptByIdStartAction,
  ReviseScriptByIdSuccessAction,
  ReviseVoiceoverBackgroundErrorAction,
  ReviseVoiceoverBackgroundStartAction,
  ReviseVoiceoverBackgroundSuccessAction,
  ReviseVoiceoverByIdErrorAction,
  ReviseVoiceoverByIdStartAction,
  ReviseVoiceoverByIdSuccessAction,
} from './types';
import {
  ApproveVoiceoverRequest,
  ApproveVoiceoverScriptRequest,
  BackgroundRevisionRequest,
  GetPendingUserApprovalAdsRequest,
  PendingUserApprovalCreativesResponse,
  RejectVoiceoverRequest,
  RevisionRequest,
  ScriptRevisionRequest,
} from 'types/common/state/api/assets';

export const getPendingUserApprovalCreatives = (
  payload: GetPendingUserApprovalAdsRequest,
): FetchPendingUserApprovalCreativesStartAction => ({
  type: FETCH_PENDING_USER_APPROVAL_CREATIVES_START,
  payload,
});

export const getPendingUserApprovalCreativesSuccess = (
  payload: PendingUserApprovalCreativesResponse,
): FetchPendingUserApprovalCreativesSuccessAction => ({
  type: FETCH_PENDING_USER_APPROVAL_CREATIVES_SUCCEEDED,
  payload,
});

export const getPendingUserApprovalCreativesFailed = (
  payload: Error,
): FetchPendingUserApprovalCreativesErrorAction => ({
  type: FETCH_PENDING_USER_APPROVAL_CREATIVES_FAILED,
  payload,
  error: payload,
});

export const approveVoiceover = (
  payload: ApproveVoiceoverRequest,
): ApproveVoiceoverStartAction => ({
  type: APPROVE_VOICEOVER_START,
  payload,
});

export const approveVoiceoverSuccess = (): ApproveVoiceoverSuccessAction => ({
  type: APPROVE_VOICEOVER_SUCCEEDED,
  payload: {},
});

export const approveVoiceoverFailed = (
  payload: Error,
): ApproveVoiceoverErrorAction => ({
  type: APPROVE_VOICEOVER_FAILED,
  payload,
  error: payload,
});

export const approveScript = (
  payload: ApproveVoiceoverScriptRequest,
): ApproveScriptStartAction => ({
  type: APPROVE_SCRIPT_START,
  payload,
});

export const approveScriptSuccess = (): ApproveScriptSuccessAction => ({
  type: APPROVE_SCRIPT_SUCCEEDED,
  payload: {},
});

export const approveScriptFailed = (
  payload: Error,
): ApproveScriptErrorAction => ({
  type: APPROVE_SCRIPT_FAILED,
  payload,
  error: payload,
});

export const rejectVoiceover = (
  payload: RejectVoiceoverRequest,
): RejectVoiceoverStartAction => ({
  type: REJECT_VOICEOVER_START,
  payload,
});

export const rejectVoiceoverSuccess = (): RejectVoiceoverSuccessAction => ({
  type: REJECT_VOICEOVER_SUCCEEDED,
  payload: {},
});

export const rejectVoiceoverFailed = (
  payload: Error,
): RejectVoiceoverErrorAction => ({
  type: REJECT_VOICEOVER_FAILED,
  payload,
  error: payload,
});

export const reviseVoiceoverById = (
  payload: RevisionRequest,
): ReviseVoiceoverByIdStartAction => ({
  type: REVISE_VOICEOVER_BY_ID_START,
  payload,
});

export const reviseVoiceoverByIdSuccess = (): ReviseVoiceoverByIdSuccessAction => ({
  type: REVISE_VOICEOVER_BY_ID_SUCCEEDED,
  payload: {},
});

export const reviseVoiceoverByIdFailed = (
  payload: Error,
): ReviseVoiceoverByIdErrorAction => ({
  type: REVISE_VOICEOVER_BY_ID_FAILED,
  payload,
  error: payload,
});

export const reviseScriptById = (
  payload: ScriptRevisionRequest,
): ReviseScriptByIdStartAction => ({
  type: REVISE_SCRIPT_BY_ID_START,
  payload,
});

export const reviseScriptByIdSuccess = (): ReviseScriptByIdSuccessAction => ({
  type: REVISE_SCRIPT_BY_ID_SUCCEEDED,
  payload: {},
});

export const reviseScriptByIdFailed = (
  payload: Error,
): ReviseScriptByIdErrorAction => ({
  type: REVISE_SCRIPT_BY_ID_FAILED,
  payload,
  error: payload,
});

export const reviseVoiceoverBackground = (
  payload: BackgroundRevisionRequest,
): ReviseVoiceoverBackgroundStartAction => ({
  type: REVISE_VOICEOVER_BACKGROUND_START,
  payload,
});

export const reviseVoiceoverBackgroundSuccess = (): ReviseVoiceoverBackgroundSuccessAction => ({
  type: REVISE_VOICEOVER_BACKGROUND_SUCCEEDED,
  payload: {},
});

export const reviseVoiceoverBackgroundFailed = (
  payload: Error,
): ReviseVoiceoverBackgroundErrorAction => ({
  type: REVISE_VOICEOVER_BACKGROUND_FAILED,
  payload,
  error: payload,
});

export const assetReviewReset = (): AssetReviewResetAction => ({
  type: ASSET_REVIEW_RESET,
});

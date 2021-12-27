import { Action } from 'redux';

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

export const FETCH_PENDING_USER_APPROVAL_CREATIVES_START =
  'FETCH_PENDING_USER_APPROVAL_CREATIVES_START';
export const FETCH_PENDING_USER_APPROVAL_CREATIVES_SUCCEEDED =
  'FETCH_PENDING_USER_APPROVAL_CREATIVES_SUCCEEDED';
export const FETCH_PENDING_USER_APPROVAL_CREATIVES_FAILED =
  'FETCH_PENDING_USER_APPROVAL_CREATIVES_FAILED';
export const APPROVE_VOICEOVER_START = 'APPROVE_VOICEOVER_START';
export const APPROVE_VOICEOVER_SUCCEEDED = 'APPROVE_VOICEOVER_SUCCEEDED';
export const APPROVE_VOICEOVER_FAILED = 'APPROVE_VOICEOVER_FAILED';
export const APPROVE_SCRIPT_START = 'APPROVE_SCRIPT_START';
export const APPROVE_SCRIPT_SUCCEEDED = 'APPROVE_SCRIPT_SUCCEEDED';
export const APPROVE_SCRIPT_FAILED = 'APPROVE_SCRIPT_FAILED';
export const REJECT_VOICEOVER_START = 'REJECT_VOICEOVER_START';
export const REJECT_VOICEOVER_SUCCEEDED = 'REJECT_VOICEOVER_SUCCEEDED';
export const REJECT_VOICEOVER_FAILED = 'REJECT_VOICEOVER_FAILED';
export const REVISE_VOICEOVER_BY_ID_START = 'REVISE_VOICEOVER_BY_ID_START';
export const REVISE_VOICEOVER_BY_ID_SUCCEEDED =
  'REVISE_VOICEOVER_BY_ID_SUCCEEDED';
export const REVISE_VOICEOVER_BY_ID_FAILED = 'REVISE_VOICEOVER_BY_ID_FAILED';
export const REVISE_SCRIPT_BY_ID_START = 'REVISE_SCRIPT_BY_ID_START';
export const REVISE_SCRIPT_BY_ID_SUCCEEDED = 'REVISE_SCRIPT_BY_ID_SUCCEEDED';
export const REVISE_SCRIPT_BY_ID_FAILED = 'REVISE_SCRIPT_BY_ID_FAILED';
export const REVISE_VOICEOVER_BACKGROUND_START =
  'REVISE_VOICEOVER_BACKGROUND_START';
export const REVISE_VOICEOVER_BACKGROUND_SUCCEEDED =
  'REVISE_VOICEOVER_BACKGROUND_SUCCEEDED';
export const REVISE_VOICEOVER_BACKGROUND_FAILED =
  'REVISE_VOICEOVER_BACKGROUND_FAILED';
export const ASSET_REVIEW_RESET = 'ASSET_REVIEW_RESET';

export interface FetchPendingUserApprovalCreativesStartAction extends Action {
  type: typeof FETCH_PENDING_USER_APPROVAL_CREATIVES_START;
  payload: GetPendingUserApprovalAdsRequest;
}

export interface FetchPendingUserApprovalCreativesSuccessAction extends Action {
  type: typeof FETCH_PENDING_USER_APPROVAL_CREATIVES_SUCCEEDED;
  payload: PendingUserApprovalCreativesResponse;
}

export interface FetchPendingUserApprovalCreativesErrorAction extends Action {
  type: typeof FETCH_PENDING_USER_APPROVAL_CREATIVES_FAILED;
  payload: Error;
  error: Error;
}

export interface ApproveVoiceoverStartAction extends Action {
  type: typeof APPROVE_VOICEOVER_START;
  payload: ApproveVoiceoverRequest;
}

export interface ApproveVoiceoverSuccessAction extends Action {
  type: typeof APPROVE_VOICEOVER_SUCCEEDED;
  payload: {};
}

export interface ApproveVoiceoverErrorAction extends Action {
  type: typeof APPROVE_VOICEOVER_FAILED;
  payload: Error;
  error: Error;
}

export interface ApproveScriptStartAction extends Action {
  type: typeof APPROVE_SCRIPT_START;
  payload: ApproveVoiceoverScriptRequest;
}

export interface ApproveScriptSuccessAction extends Action {
  type: typeof APPROVE_SCRIPT_SUCCEEDED;
  payload: {};
}

export interface ApproveScriptErrorAction extends Action {
  type: typeof APPROVE_SCRIPT_FAILED;
  payload: Error;
  error: Error;
}

export interface RejectVoiceoverStartAction extends Action {
  type: typeof REJECT_VOICEOVER_START;
  payload: RejectVoiceoverRequest;
}

export interface RejectVoiceoverSuccessAction extends Action {
  type: typeof REJECT_VOICEOVER_SUCCEEDED;
  payload: {};
}

export interface RejectVoiceoverErrorAction extends Action {
  type: typeof REJECT_VOICEOVER_FAILED;
  payload: Error;
  error: Error;
}

export interface ReviseVoiceoverByIdStartAction extends Action {
  type: typeof REVISE_VOICEOVER_BY_ID_START;
  payload: RevisionRequest;
}

export interface ReviseVoiceoverByIdSuccessAction extends Action {
  type: typeof REVISE_VOICEOVER_BY_ID_SUCCEEDED;
  payload: {};
}

export interface ReviseVoiceoverByIdErrorAction extends Action {
  type: typeof REVISE_VOICEOVER_BY_ID_FAILED;
  payload: Error;
  error: Error;
}

export interface ReviseScriptByIdStartAction extends Action {
  type: typeof REVISE_SCRIPT_BY_ID_START;
  payload: ScriptRevisionRequest;
}

export interface ReviseScriptByIdSuccessAction extends Action {
  type: typeof REVISE_SCRIPT_BY_ID_SUCCEEDED;
  payload: {};
}

export interface ReviseScriptByIdErrorAction extends Action {
  type: typeof REVISE_SCRIPT_BY_ID_FAILED;
  payload: Error;
  error: Error;
}

export interface ReviseVoiceoverBackgroundStartAction extends Action {
  type: typeof REVISE_VOICEOVER_BACKGROUND_START;
  payload: BackgroundRevisionRequest;
}

export interface ReviseVoiceoverBackgroundSuccessAction extends Action {
  type: typeof REVISE_VOICEOVER_BACKGROUND_SUCCEEDED;
  payload: {};
}

export interface ReviseVoiceoverBackgroundErrorAction extends Action {
  type: typeof REVISE_VOICEOVER_BACKGROUND_FAILED;
  payload: Error;
  error: Error;
}

export interface AssetReviewResetAction extends Action {
  type: typeof ASSET_REVIEW_RESET;
}

export type FetchPendingUserApprovalCreativesAction =
  | FetchPendingUserApprovalCreativesStartAction
  | FetchPendingUserApprovalCreativesSuccessAction
  | FetchPendingUserApprovalCreativesErrorAction;

export type ApproveVoiceoverAction =
  | ApproveVoiceoverStartAction
  | ApproveVoiceoverSuccessAction
  | ApproveVoiceoverErrorAction;

export type RejectVoiceoverAction =
  | RejectVoiceoverStartAction
  | RejectVoiceoverSuccessAction
  | RejectVoiceoverErrorAction;

export type ReviseVoiceoverByIdAction =
  | ReviseVoiceoverByIdStartAction
  | ReviseVoiceoverByIdSuccessAction
  | ReviseVoiceoverByIdErrorAction;

export type ReviseVoiceoverBackgroundAction =
  | ReviseVoiceoverBackgroundStartAction
  | ReviseVoiceoverBackgroundSuccessAction
  | ReviseVoiceoverBackgroundErrorAction;

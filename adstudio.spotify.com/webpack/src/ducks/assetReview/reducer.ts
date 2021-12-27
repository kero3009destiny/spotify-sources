import { combineReducers, Reducer } from 'redux';

import { createAsyncReducers } from 'utils/asyncDucksHelpers';

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
  FetchPendingUserApprovalCreativesAction,
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
import { Paging } from 'types/common/state/api';
import { PendingCreativeResponseRow } from 'types/common/state/api/assets';

export interface PendingUserApprovalCreativesState {
  items: PendingCreativeResponseRow[];
  paging: Paging;
}

export interface AssetReviewState {
  pendingUserApprovalCreatives: PendingUserApprovalCreativesState;
  fetchingPendingUserApprovalCreatives: boolean;
  fetchPendingUserApprovalCreativesSuccess: boolean;
  fetchPendingUserApprovalCreativesError: Error | string | boolean;

  approvingVoiceover: boolean;
  approveVoiceoverSuccess: boolean;
  approveVoiceoverError: Error | string | boolean;

  approvingScript: boolean;
  approveScriptSuccess: boolean;
  approveScriptError: Error | string | boolean;

  rejectingVoiceover: boolean;
  rejectVoiceoverSuccess: boolean;
  rejectVoiceoverError: Error | string | boolean;

  revisingVoiceoverById: boolean;
  reviseVoiceoverByIdSuccess: boolean;
  reviseVoiceoverByIdError: Error | string | boolean;

  revisingScriptById: boolean;
  reviseScriptByIdSuccess: boolean;
  reviseScriptByIdError: Error | string | boolean;

  revisingVoiceoverBackground: boolean;
  reviseVoiceoverBackgroundSuccess: boolean;
  reviseVoiceoverBackgroundError: Error | string | boolean;
}

export const pendingUserApprovalCreativesDefaultState: PendingUserApprovalCreativesState = {
  items: [],
  paging: {
    limit: 20,
    offset: 0,
    total: 0,
  },
};

export const pendingUserApprovalCreativesReducer = (
  state: PendingUserApprovalCreativesState = pendingUserApprovalCreativesDefaultState,
  action: FetchPendingUserApprovalCreativesAction | AssetReviewResetAction,
): PendingUserApprovalCreativesState => {
  switch (action.type) {
    case FETCH_PENDING_USER_APPROVAL_CREATIVES_FAILED:
    case FETCH_PENDING_USER_APPROVAL_CREATIVES_START:
      return {
        ...state,
      };

    case FETCH_PENDING_USER_APPROVAL_CREATIVES_SUCCEEDED:
      return {
        ...state,
        items: action.payload.items,
        paging: action.payload.paging,
      };

    case ASSET_REVIEW_RESET:
      return pendingUserApprovalCreativesDefaultState;
    default:
      return state;
  }
};

const fetchingPendingUserApprovalCreatives =
  'fetchingPendingUserApprovalCreatives';
const fetchPendingUserApprovalCreativesSuccess =
  'fetchPendingUserApprovalCreativesSuccess';
const fetchPendingUserApprovalCreativesError =
  'fetchPendingUserApprovalCreativesError';

const fetchPendingUserApprovalCreativesReducers = createAsyncReducers<
  FetchPendingUserApprovalCreativesStartAction,
  FetchPendingUserApprovalCreativesSuccessAction,
  FetchPendingUserApprovalCreativesErrorAction
>(
  fetchingPendingUserApprovalCreatives,
  FETCH_PENDING_USER_APPROVAL_CREATIVES_START,
  fetchPendingUserApprovalCreativesSuccess,
  FETCH_PENDING_USER_APPROVAL_CREATIVES_SUCCEEDED,
  fetchPendingUserApprovalCreativesError,
  FETCH_PENDING_USER_APPROVAL_CREATIVES_FAILED,
  ASSET_REVIEW_RESET,
);

const approvingVoiceover = 'approvingVoiceover';
const approveVoiceoverSuccess = 'approveVoiceoverSuccess';
const approveVoiceoverError = 'approveVoiceoverError';

const approvingScript = 'approvingScript';
const approveScriptSuccess = 'approveScriptSuccess';
const approveScriptError = 'approveScriptError';

const approveVoiceoverReducers = createAsyncReducers<
  ApproveVoiceoverStartAction,
  ApproveVoiceoverSuccessAction,
  ApproveVoiceoverErrorAction
>(
  approvingVoiceover,
  APPROVE_VOICEOVER_START,
  approveVoiceoverSuccess,
  APPROVE_VOICEOVER_SUCCEEDED,
  approveVoiceoverError,
  APPROVE_VOICEOVER_FAILED,
  ASSET_REVIEW_RESET,
);

const approveScriptReducers = createAsyncReducers<
  ApproveScriptStartAction,
  ApproveScriptSuccessAction,
  ApproveScriptErrorAction
>(
  approvingScript,
  APPROVE_SCRIPT_START,
  approveScriptSuccess,
  APPROVE_SCRIPT_SUCCEEDED,
  approveScriptError,
  APPROVE_SCRIPT_FAILED,
  ASSET_REVIEW_RESET,
);

const rejectingVoiceover = 'rejectingVoiceover';
const rejectVoiceoverSuccess = 'rejectVoiceoverSuccess';
const rejectVoiceoverError = 'rejectVoiceoverError';

const rejectVoiceoverReducers = createAsyncReducers<
  RejectVoiceoverStartAction,
  RejectVoiceoverSuccessAction,
  RejectVoiceoverErrorAction
>(
  rejectingVoiceover,
  REJECT_VOICEOVER_START,
  rejectVoiceoverSuccess,
  REJECT_VOICEOVER_SUCCEEDED,
  rejectVoiceoverError,
  REJECT_VOICEOVER_FAILED,
  ASSET_REVIEW_RESET,
);

const revisingVoiceoverById = 'revisingVoiceoverById';
const reviseVoiceoverByIdSuccess = 'reviseVoiceoverByIdSuccess';
const reviseVoiceoverByIdError = 'reviseVoiceoverByIdError';

const revisingScriptById = 'revisingScriptById';
const reviseScriptByIdSuccess = 'reviseScriptByIdSuccess';
const reviseScriptByIdError = 'reviseScriptByIdError';

const reviseVoiceoverByIdReducers = createAsyncReducers<
  ReviseVoiceoverByIdStartAction,
  ReviseVoiceoverByIdSuccessAction,
  ReviseVoiceoverByIdErrorAction
>(
  revisingVoiceoverById,
  REVISE_VOICEOVER_BY_ID_START,
  reviseVoiceoverByIdSuccess,
  REVISE_VOICEOVER_BY_ID_SUCCEEDED,
  reviseVoiceoverByIdError,
  REVISE_VOICEOVER_BY_ID_FAILED,
  ASSET_REVIEW_RESET,
);

const reviseScriptByIdReducers = createAsyncReducers<
  ReviseScriptByIdStartAction,
  ReviseScriptByIdSuccessAction,
  ReviseScriptByIdErrorAction
>(
  revisingScriptById,
  REVISE_SCRIPT_BY_ID_START,
  reviseScriptByIdSuccess,
  REVISE_SCRIPT_BY_ID_SUCCEEDED,
  reviseScriptByIdError,
  REVISE_SCRIPT_BY_ID_FAILED,
  ASSET_REVIEW_RESET,
);

const revisingVoiceoverBackground = 'revisingVoiceoverBackground';
const reviseVoiceoverBackgroundSuccess = 'reviseVoiceoverBackgroundSuccess';
const reviseVoiceoverBackgroundError = 'reviseVoiceoverBackgroundError';

const reviseVoiceoverBackgroundReducers = createAsyncReducers<
  ReviseVoiceoverBackgroundStartAction,
  ReviseVoiceoverBackgroundSuccessAction,
  ReviseVoiceoverBackgroundErrorAction
>(
  revisingVoiceoverBackground,
  REVISE_VOICEOVER_BACKGROUND_START,
  reviseVoiceoverBackgroundSuccess,
  REVISE_VOICEOVER_BACKGROUND_SUCCEEDED,
  reviseVoiceoverBackgroundError,
  REVISE_VOICEOVER_BACKGROUND_FAILED,
  ASSET_REVIEW_RESET,
);

export default combineReducers<AssetReviewState>({
  pendingUserApprovalCreatives: pendingUserApprovalCreativesReducer,

  fetchingPendingUserApprovalCreatives: fetchPendingUserApprovalCreativesReducers[
    fetchingPendingUserApprovalCreatives
  ] as Reducer<boolean, FetchPendingUserApprovalCreativesStartAction>,
  fetchPendingUserApprovalCreativesSuccess: fetchPendingUserApprovalCreativesReducers[
    fetchPendingUserApprovalCreativesSuccess
  ] as Reducer<boolean, FetchPendingUserApprovalCreativesSuccessAction>,
  fetchPendingUserApprovalCreativesError: fetchPendingUserApprovalCreativesReducers[
    fetchPendingUserApprovalCreativesError
  ] as Reducer<
    Error | string | boolean,
    FetchPendingUserApprovalCreativesErrorAction
  >,

  approvingVoiceover: approveVoiceoverReducers[approvingVoiceover] as Reducer<
    boolean,
    ApproveVoiceoverStartAction
  >,
  approveVoiceoverSuccess: approveVoiceoverReducers[
    approveVoiceoverSuccess
  ] as Reducer<boolean, ApproveVoiceoverSuccessAction>,
  approveVoiceoverError: approveVoiceoverReducers[
    approveVoiceoverError
  ] as Reducer<Error | string | boolean, ApproveVoiceoverErrorAction>,

  approvingScript: approveScriptReducers[approvingScript] as Reducer<
    boolean,
    ApproveScriptStartAction
  >,
  approveScriptSuccess: approveScriptReducers[approveScriptSuccess] as Reducer<
    boolean,
    ApproveScriptSuccessAction
  >,
  approveScriptError: approveScriptReducers[approveScriptError] as Reducer<
    Error | string | boolean,
    ApproveScriptErrorAction
  >,

  rejectingVoiceover: rejectVoiceoverReducers[rejectingVoiceover] as Reducer<
    boolean,
    RejectVoiceoverStartAction
  >,
  rejectVoiceoverSuccess: rejectVoiceoverReducers[
    rejectVoiceoverSuccess
  ] as Reducer<boolean, RejectVoiceoverSuccessAction>,
  rejectVoiceoverError: rejectVoiceoverReducers[
    rejectVoiceoverError
  ] as Reducer<Error | string | boolean, RejectVoiceoverErrorAction>,

  revisingVoiceoverById: reviseVoiceoverByIdReducers[
    revisingVoiceoverById
  ] as Reducer<boolean, ReviseVoiceoverByIdStartAction>,
  reviseVoiceoverByIdSuccess: reviseVoiceoverByIdReducers[
    reviseVoiceoverByIdSuccess
  ] as Reducer<boolean, ReviseVoiceoverByIdSuccessAction>,
  reviseVoiceoverByIdError: reviseVoiceoverByIdReducers[
    reviseVoiceoverByIdError
  ] as Reducer<Error | string | boolean, ReviseVoiceoverByIdErrorAction>,

  revisingScriptById: reviseScriptByIdReducers[revisingScriptById] as Reducer<
    boolean,
    ReviseScriptByIdStartAction
  >,
  reviseScriptByIdSuccess: reviseScriptByIdReducers[
    reviseScriptByIdSuccess
  ] as Reducer<boolean, ReviseScriptByIdSuccessAction>,
  reviseScriptByIdError: reviseScriptByIdReducers[
    reviseScriptByIdError
  ] as Reducer<Error | string | boolean, ReviseScriptByIdErrorAction>,

  revisingVoiceoverBackground: reviseVoiceoverBackgroundReducers[
    revisingVoiceoverBackground
  ] as Reducer<boolean, ReviseVoiceoverBackgroundStartAction>,
  reviseVoiceoverBackgroundSuccess: reviseVoiceoverBackgroundReducers[
    reviseVoiceoverBackgroundSuccess
  ] as Reducer<boolean, ReviseVoiceoverBackgroundSuccessAction>,
  reviseVoiceoverBackgroundError: reviseVoiceoverBackgroundReducers[
    reviseVoiceoverBackgroundError
  ] as Reducer<Error | string | boolean, ReviseVoiceoverBackgroundErrorAction>,
});

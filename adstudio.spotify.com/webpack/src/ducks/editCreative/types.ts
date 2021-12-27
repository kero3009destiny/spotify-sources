import { Action } from 'redux';

import { FetchErrorAction } from 'utils/asyncDucksHelpers';

import { ExistingCreativeFormValues } from 'types/common/campaignHierarchy/types';

export const EDIT_CREATIVE = 'EDIT_CREATIVE';
export const EDIT_CREATIVE_FAILED = 'EDIT_CREATIVE_FAILED';
export const EDIT_CREATIVE_SUCCEEDED = 'EDIT_CREATIVE_SUCCEEDED';

export interface EditCreativeStartAction extends Action {
  type: typeof EDIT_CREATIVE;
  payload: {
    creative: ExistingCreativeFormValues;
  };
}

export interface EditCreativeSuccessAction {
  type: typeof EDIT_CREATIVE_SUCCEEDED;
}

export interface EditCreativeErrorAction extends FetchErrorAction {
  type: typeof EDIT_CREATIVE_FAILED;
}

export type EditCreativeAction =
  | EditCreativeStartAction
  | EditCreativeSuccessAction
  | EditCreativeErrorAction;

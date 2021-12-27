import { buildFetchErrorAction } from 'utils/asyncDucksHelpers';

import {
  EDIT_CREATIVE,
  EDIT_CREATIVE_FAILED,
  EDIT_CREATIVE_SUCCEEDED,
  EditCreativeErrorAction,
  EditCreativeStartAction,
  EditCreativeSuccessAction,
} from './types';
import { ExistingCreativeFormValues } from 'types/common/campaignHierarchy/types';

export const editCreative = (payload: {
  creative: ExistingCreativeFormValues;
}): EditCreativeStartAction => ({
  type: EDIT_CREATIVE,
  payload,
});

export const editCreativeSuccess = (): EditCreativeSuccessAction => ({
  type: EDIT_CREATIVE_SUCCEEDED,
});

export const editCreativeFailed = (error: Error): EditCreativeErrorAction =>
  buildFetchErrorAction(EDIT_CREATIVE_FAILED, error);

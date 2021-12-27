import {
  CREATE_CREATIVE_FOR_FLIGHT,
  CREATE_CREATIVE_FOR_FLIGHT_FAILED,
  CREATE_CREATIVE_FOR_FLIGHT_SUCCEEDED,
  CreateCreativeForFlightErrorAction,
  CreateCreativeForFlightStartAction,
  CreateCreativeForFlightSuccessAction,
  DUPLICATE_CREATIVE,
  DUPLICATE_CREATIVE_FAILED,
  DUPLICATE_CREATIVE_SUCCEEDED,
  DuplicateCreativeAction,
  DuplicateCreativeErrorAction,
  DuplicateCreativeSuccessAction,
  RESET_BUILD_CREATIVE,
  ResetBuildCreativeAction,
} from './types';
import {
  CreateCreativeFormValues,
  DuplicateCreativeFormValues,
} from 'types/common/campaignHierarchy/types';

export const createCreativeForFlight = (
  payload: CreateCreativeFormValues,
): CreateCreativeForFlightStartAction => ({
  type: CREATE_CREATIVE_FOR_FLIGHT,
  payload,
});

export const createCreativeForFlightSuccess = (): CreateCreativeForFlightSuccessAction => ({
  type: CREATE_CREATIVE_FOR_FLIGHT_SUCCEEDED,
});

export const createCreativeForFlightError = (
  response: Response,
): CreateCreativeForFlightErrorAction => ({
  type: CREATE_CREATIVE_FOR_FLIGHT_FAILED,
  error: true,
  payload: response,
});

export const duplicateCreative = (
  payload: DuplicateCreativeFormValues,
): DuplicateCreativeAction => ({
  type: DUPLICATE_CREATIVE,
  payload,
});

export const duplicateCreativeSuccess = (): DuplicateCreativeSuccessAction => ({
  type: DUPLICATE_CREATIVE_SUCCEEDED,
});

export const duplicateCreativeError = (): DuplicateCreativeErrorAction => ({
  type: DUPLICATE_CREATIVE_FAILED,
  error: true,
});

export const resetBuildCreative = (): ResetBuildCreativeAction => ({
  type: RESET_BUILD_CREATIVE,
});

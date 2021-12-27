import { buildFetchErrorAction } from 'utils/asyncDucksHelpers';

import {
  EDIT_FLIGHT,
  EDIT_FLIGHT_FAILED,
  EDIT_FLIGHT_SUCCEEDED,
  EditFlightErrorAction,
  EditFlightStartAction,
  EditFlightSuccessAction,
} from './types';
import { ExistingFlight } from 'types/common/campaignHierarchy/types';

export const editFlight = (payload: {
  flight: ExistingFlight;
}): EditFlightStartAction => ({
  type: EDIT_FLIGHT,
  payload,
});

export const editFlightSuccess = (): EditFlightSuccessAction => ({
  type: EDIT_FLIGHT_SUCCEEDED,
});

export const editFlightFailed = (error: Error): EditFlightErrorAction =>
  buildFetchErrorAction(EDIT_FLIGHT_FAILED, error);

import { responseOrUndefined, SagaFetchError } from 'utils/asyncDucksHelpers';

import {
  EDIT_FLIGHT_LINKS_FAILED,
  EDIT_FLIGHT_LINKS_START,
  EDIT_FLIGHT_LINKS_SUCCEEDED,
  EditFlightLinksErrorAction,
  EditFlightLinksPayload,
  EditFlightLinksStartAction,
  EditFlightLinksSuccessAction,
  PAUSE_RESUME_FLIGHT_LINK_FAILED,
  PAUSE_RESUME_FLIGHT_LINK_START,
  PAUSE_RESUME_FLIGHT_LINK_SUCCEEDED,
  PauseResumeFlightLinkErrorAction,
  PauseResumeFlightLinkPayload,
  PauseResumeFlightLinkStartAction,
  PauseResumeFlightLinkSuccessAction,
  RESET_FLIGHT_LINKS,
  ResetFlightLinksAction,
} from './types';

export const pauseResumeFlightLink = (
  payload: PauseResumeFlightLinkPayload,
): PauseResumeFlightLinkStartAction => ({
  type: PAUSE_RESUME_FLIGHT_LINK_START,
  payload,
});

export const pauseResumeFlightLinkSuccess = (
  payload: PauseResumeFlightLinkPayload,
): PauseResumeFlightLinkSuccessAction => ({
  type: PAUSE_RESUME_FLIGHT_LINK_SUCCEEDED,
  payload,
});

export const pauseResumeFlightLinkError = (
  startActionPayload: PauseResumeFlightLinkPayload,
  error: SagaFetchError,
): PauseResumeFlightLinkErrorAction => ({
  type: PAUSE_RESUME_FLIGHT_LINK_FAILED,
  error: true,
  payload: error,
  meta: {
    response: responseOrUndefined(error),
    ...startActionPayload,
  },
});

export const editFlightLinks = (
  payload: EditFlightLinksPayload,
): EditFlightLinksStartAction => ({
  type: EDIT_FLIGHT_LINKS_START,
  payload,
});

export const editFlightLinksSuccess = (
  payload: EditFlightLinksPayload,
): EditFlightLinksSuccessAction => ({
  type: EDIT_FLIGHT_LINKS_SUCCEEDED,
  payload,
});

export const editFlightLinksError = (
  payload: EditFlightLinksPayload,
  error: Error,
): EditFlightLinksErrorAction => ({
  type: EDIT_FLIGHT_LINKS_FAILED,
  payload,
  error,
});

export const resetFlightLinks = (): ResetFlightLinksAction => ({
  type: RESET_FLIGHT_LINKS,
});

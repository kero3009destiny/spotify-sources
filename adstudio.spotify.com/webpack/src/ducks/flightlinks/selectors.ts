import { FlightLinksState } from './reducer';

import { EditFlightLinksPayload } from './types';

export const getFlightLinksState = (state: TSFixMe): FlightLinksState => {
  return state.flightlinks;
};

export const getPausingOrResumingFlightLink = (state: TSFixMe): boolean => {
  return getFlightLinksState(state).pausingOrResumingFlightLink;
};

export const getPauseOrResumeFlightLinkSuccess = (state: TSFixMe): boolean => {
  return getFlightLinksState(state).pauseResumeFlightLinkSuccess;
};

export const getPauseOrResumeFlightLinkError = (
  state: TSFixMe,
): boolean | string => {
  return getFlightLinksState(state).pauseResumeFlightLinkError;
};

export const getEditingFlightLink = (state: TSFixMe): boolean => {
  return getFlightLinksState(state).editingFlightLinks;
};

export const getEditFlightLinkSuccess = (state: TSFixMe): boolean => {
  return getFlightLinksState(state).editFlightLinksSuccess;
};

export const getEditFlightLinkError = (state: TSFixMe): boolean | string => {
  return getFlightLinksState(state).editFlightLinksError;
};

export const getEditFlightLinksPayload = (
  state: TSFixMe,
): EditFlightLinksPayload | null => {
  return getFlightLinksState(state).editFlightLinksPayload;
};

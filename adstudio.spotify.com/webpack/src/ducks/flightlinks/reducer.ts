import { combineReducers, Reducer } from 'redux';

import { createAsyncReducers } from 'utils/asyncDucksHelpers';

import {
  EDIT_FLIGHT_LINKS_FAILED,
  EDIT_FLIGHT_LINKS_START,
  EDIT_FLIGHT_LINKS_SUCCEEDED,
  EditFlightLinksAction,
  EditFlightLinksErrorAction,
  EditFlightLinksPayload,
  EditFlightLinksStartAction,
  EditFlightLinksSuccessAction,
  PAUSE_RESUME_FLIGHT_LINK_FAILED,
  PAUSE_RESUME_FLIGHT_LINK_START,
  PAUSE_RESUME_FLIGHT_LINK_SUCCEEDED,
  PauseResumeFlightLinkErrorAction,
  PauseResumeFlightLinkStartAction,
  PauseResumeFlightLinkSuccessAction,
  RESET_FLIGHT_LINKS,
} from './types';

export interface FlightLinksState {
  pausingOrResumingFlightLink: boolean;
  pauseResumeFlightLinkSuccess: boolean;
  pauseResumeFlightLinkError: string | boolean;
  editingFlightLinks: boolean;
  editFlightLinksSuccess: boolean;
  editFlightLinksError: string | boolean;
  editFlightLinksPayload: EditFlightLinksPayload | null;
}

const pausingOrResumingFlightLink = 'pausingOrResumingFlightLink';
const pauseResumeFlightLinkSuccess = 'pauseResumeFlightLinkSuccess';
const pauseResumeFlightLinkError = 'pauseResumeFlightLinkError';

const pauseResumeFlightLinkReducers = createAsyncReducers<
  PauseResumeFlightLinkStartAction,
  PauseResumeFlightLinkSuccessAction,
  PauseResumeFlightLinkErrorAction
>(
  pausingOrResumingFlightLink,
  PAUSE_RESUME_FLIGHT_LINK_START,
  pauseResumeFlightLinkSuccess,
  PAUSE_RESUME_FLIGHT_LINK_SUCCEEDED,
  pauseResumeFlightLinkError,
  PAUSE_RESUME_FLIGHT_LINK_FAILED,
  RESET_FLIGHT_LINKS,
);

const editingFlightLinks = 'editingFlightLinks';
const editFlightLinksSuccess = 'editFlightLinksSuccess';
const editFlightLinksError = 'editFlightLinksError';

const editFlightLinksReducers = createAsyncReducers<
  EditFlightLinksStartAction,
  EditFlightLinksSuccessAction,
  EditFlightLinksErrorAction
>(
  editingFlightLinks,
  EDIT_FLIGHT_LINKS_START,
  editFlightLinksSuccess,
  EDIT_FLIGHT_LINKS_SUCCEEDED,
  editFlightLinksError,
  EDIT_FLIGHT_LINKS_FAILED,
  RESET_FLIGHT_LINKS,
);

const editFlightLinksPayload: Reducer<
  EditFlightLinksPayload | null,
  EditFlightLinksAction
> = (state = null, action) => {
  switch (action.type) {
    case EDIT_FLIGHT_LINKS_SUCCEEDED:
    case EDIT_FLIGHT_LINKS_FAILED:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers<FlightLinksState>({
  pausingOrResumingFlightLink: pauseResumeFlightLinkReducers[
    pausingOrResumingFlightLink
  ] as Reducer<boolean, PauseResumeFlightLinkStartAction>,
  pauseResumeFlightLinkSuccess: pauseResumeFlightLinkReducers[
    pauseResumeFlightLinkSuccess
  ] as Reducer<boolean, PauseResumeFlightLinkSuccessAction>,
  pauseResumeFlightLinkError: pauseResumeFlightLinkReducers[
    pauseResumeFlightLinkError
  ] as Reducer<string | boolean, PauseResumeFlightLinkErrorAction>,
  editingFlightLinks: editFlightLinksReducers[editingFlightLinks] as Reducer<
    boolean,
    EditFlightLinksStartAction
  >,
  editFlightLinksSuccess: editFlightLinksReducers[
    editFlightLinksSuccess
  ] as Reducer<boolean, EditFlightLinksSuccessAction>,
  editFlightLinksError: editFlightLinksReducers[
    editFlightLinksError
  ] as Reducer<string | boolean, EditFlightLinksErrorAction>,
  editFlightLinksPayload: editFlightLinksPayload,
});

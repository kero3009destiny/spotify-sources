import { BuildHierarchyError } from 'ducks/buildCampaign/types';

import {
  BuildCreativeAction,
  CREATE_CREATIVE_FOR_FLIGHT,
  CREATE_CREATIVE_FOR_FLIGHT_FAILED,
  CREATE_CREATIVE_FOR_FLIGHT_SUCCEEDED,
  DUPLICATE_CREATIVE,
  DUPLICATE_CREATIVE_FAILED,
  DUPLICATE_CREATIVE_SUCCEEDED,
  RESET_BUILD_CREATIVE,
} from './types';

export interface BuildCreativeState {
  addingCreativeToFlight: boolean;
  addCreativeToFlightSuccess: boolean;
  addCreativeToFlightError?: BuildHierarchyError;
  duplicatingCreative: boolean;
  duplicateCreativeSuccess: boolean;
  duplicateCreativeError: boolean;
}

export const initialState: BuildCreativeState = {
  addingCreativeToFlight: false,
  addCreativeToFlightSuccess: false,
  addCreativeToFlightError: undefined,
  duplicatingCreative: false,
  duplicateCreativeSuccess: false,
  duplicateCreativeError: false,
};

export default (
  state: BuildCreativeState = initialState,
  action: BuildCreativeAction,
) => {
  switch (action.type) {
    case CREATE_CREATIVE_FOR_FLIGHT:
      return {
        ...state,
        addingCreativeToFlight: true,
        addCreativeToFlightSuccess: false,
        addCreativeToFlightError: undefined,
      };
    case CREATE_CREATIVE_FOR_FLIGHT_SUCCEEDED:
      return {
        ...state,
        addingCreativeToFlight: false,
        addCreativeToFlightSuccess: true,
        addCreativeToFlightError: undefined,
      };
    case CREATE_CREATIVE_FOR_FLIGHT_FAILED: {
      const error =
        action.payload.status === 403
          ? BuildHierarchyError.Forbidden
          : BuildHierarchyError.GenericError;

      return {
        ...state,
        addingCreativeToFlight: false,
        addCreativeToFlightSuccess: false,
        addCreativeToFlightError: error,
      };
    }
    case DUPLICATE_CREATIVE:
      return {
        ...state,
        duplicatingCreative: true,
        duplicateCreativeSuccess: false,
        duplicateCreativeError: false,
      };
    case DUPLICATE_CREATIVE_SUCCEEDED:
      return {
        ...state,
        duplicatingCreative: false,
        duplicateCreativeSuccess: true,
        duplicateCreativeError: false,
      };
    case DUPLICATE_CREATIVE_FAILED:
      return {
        ...state,
        duplicatingCreative: false,
        duplicateCreativeSuccess: false,
        duplicateCreativeError: true,
      };
    case RESET_BUILD_CREATIVE:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

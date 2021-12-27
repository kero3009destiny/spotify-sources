import {
  EDIT_FLIGHT,
  EDIT_FLIGHT_FAILED,
  EDIT_FLIGHT_SUCCEEDED,
  EditFlightAction,
} from './types';

export interface EditFlightState {
  editingFlight: boolean;
  editFlightSuccess: boolean;
  editFlightError: boolean;
}

export const defaultEditFlightState: EditFlightState = {
  editingFlight: false,
  editFlightSuccess: false,
  editFlightError: false,
};

export default (
  state: EditFlightState = defaultEditFlightState,
  action: EditFlightAction,
) => {
  switch (action.type) {
    case EDIT_FLIGHT:
      return {
        ...state,
        editingFlight: true,
        editFlightSuccess: false,
        editFlightError: false,
      };

    case EDIT_FLIGHT_SUCCEEDED:
      return {
        ...state,
        editingFlight: false,
        editFlightSuccess: true,
        editFlightError: false,
      };

    case EDIT_FLIGHT_FAILED:
      return {
        ...state,
        editingFlight: false,
        editFlightSuccess: false,
        editFlightError: true,
      };

    default:
      return state;
  }
};

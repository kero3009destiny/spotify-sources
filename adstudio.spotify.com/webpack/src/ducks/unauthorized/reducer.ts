import { UnauthorizedEvents, UnauthorizedTypes } from './types';

export type UnauthorizedState = boolean;

const defaultState: UnauthorizedState = false;

export default (
  state: UnauthorizedState = defaultState,
  action: UnauthorizedTypes,
) => {
  switch (action.type) {
    case UnauthorizedEvents.unauthorizedUser:
      return action.payload.status;
    default:
      return state;
  }
};

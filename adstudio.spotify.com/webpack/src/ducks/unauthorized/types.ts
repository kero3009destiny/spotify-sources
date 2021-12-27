import { Action } from 'redux';

export enum UnauthorizedEvents {
  isUserAuthorized = 'IS_USER_AUTHORIZED',
  unauthorizedUser = 'UNAUTHORIZED_USER',
  startEventListener = 'START_EVENT_LISTENER',
}

export interface StartEventListener extends Action {
  type: typeof UnauthorizedEvents.startEventListener;
}

export interface IsUserAuthorized extends Action {
  type: typeof UnauthorizedEvents.isUserAuthorized;
}

export interface ActiveUserIsUnauthorized extends Action {
  type: typeof UnauthorizedEvents.unauthorizedUser;
  payload: {
    status: boolean;
  };
}

export type UnauthorizedTypes = ActiveUserIsUnauthorized | IsUserAuthorized;

import {
  ActiveUserIsUnauthorized,
  IsUserAuthorized,
  StartEventListener,
  UnauthorizedEvents,
} from './types';

export const starSourceForUnauthenticatedEvents = (): StartEventListener => ({
  type: UnauthorizedEvents.startEventListener,
});

export const unauthorizedResponse = (): IsUserAuthorized => ({
  type: UnauthorizedEvents.isUserAuthorized,
});

export const setUnauthorizedStatus = (
  status: boolean,
): ActiveUserIsUnauthorized => ({
  type: UnauthorizedEvents.unauthorizedUser,
  payload: {
    status,
  },
});

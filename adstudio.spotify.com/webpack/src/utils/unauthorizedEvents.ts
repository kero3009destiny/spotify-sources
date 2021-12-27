import {
  CustomEvents,
  eventEmitterFactory,
  eventListenerFactory,
  UNAUTHORIZED_TYPE,
} from './customEvents';

export const unauthorizedResponseEmitter = eventEmitterFactory<
  UNAUTHORIZED_TYPE
>(CustomEvents.UNAUTHORIZED);

export const unauthorizedResponseListener = eventListenerFactory(
  CustomEvents.UNAUTHORIZED,
);

export const unauthorizedResponse = (r: Response) => {
  if (r.status === 403) {
    unauthorizedResponseEmitter(r);
  }
  return r;
};

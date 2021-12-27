export type UNAUTHORIZED_TYPE = Response;

export enum CustomEvents {
  UNAUTHORIZED = 'unauthorizedRequest',
}

declare global {
  interface DocumentEventMap {
    [CustomEvents.UNAUTHORIZED]: CustomEvent<UNAUTHORIZED_TYPE>;
  }
}

export const eventEmitterFactory = <T>(name: string) => (value: T) =>
  dispatchEvent(new CustomEvent<T>(name, value));

export const eventListenerFactory = (eventType: CustomEvents) => (
  callbackFn: (ev: CustomEvent) => any,
) => {
  document.addEventListener<typeof eventType>(eventType, callbackFn);
  return () => document.removeEventListener(eventType, callbackFn);
};

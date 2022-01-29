// ignore-string-externalization
import {
  createClientIdContext,
  createUserAgentContext,
  createApplicationContext,
} from '@spotify-internal/event-sender/es5/contexts';
import { createEventSender, EventData } from '@spotify-internal/event-sender';
import { getSpotifyClientId, getVersion } from '@mrkt/features/env';
import { transport } from '@mrkt/features/transport';

function getContext() {
  const applicationContext = createApplicationContext({
    version: getVersion(),
  });
  const context = [
    createClientIdContext(getSpotifyClientId()),
    applicationContext,
  ];

  // user agent should only be set in the browser
  if (process.browser) {
    return [...context, createUserAgentContext()];
  }

  return context;
}

/**
 * Instance of @spotify-internal/event-sender
 * @see https://backstage.spotify.net/docs/event-sender-js/
 */
export const eventSender = createEventSender({
  transport,
  context: getContext(),
});

export type GabitoEvent = EventData & {
  data: {
    [key: string]: string | number | boolean | string[] | null | undefined;
  };
};

/**
 * @deprecated
 * use eventSender.send(event, { authorize: true })
 */
export function logGabitoEvent(event: GabitoEvent) {
  eventSender.send(event, { authorize: true });
}

/**
 * @deprecated
 * use eventSender.send(event)
 */
export function logNonAuthGabitoEvent(event: GabitoEvent) {
  eventSender.send(event, { authorize: false });
}

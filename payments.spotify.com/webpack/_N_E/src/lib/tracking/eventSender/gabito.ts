import { createEventSender, EventSender } from '@spotify-internal/event-sender';
import { createBaseTransport, Transport, TransportEvent } from '@spotify-internal/transport';
import { getPublicRuntimeConfigValue } from '../../config';
import { getCookie } from '../../cookie';

// Compatible with Next.js
import { createCorrelationIdContext, createUserAgentContext } from '@spotify-internal/event-sender/es5/contexts';
import { createProviders } from '@spotify-internal/transport/es5/providers/spotify_com';
import { requestTransformerCreator } from '@spotify-internal/transport/es5/plugins/request_transformer';

export type GabitoEventSender = {
  send: typeof EventSender['prototype']['send'];
};

const publishEnabled = getPublicRuntimeConfigValue<boolean>('analytics.gabito.transport');
const loggerEnabled = getPublicRuntimeConfigValue<boolean>('analytics.gabito.logger');

function createSpotifyComTransport(): Promise<Transport> {
  const transport = createBaseTransport({
    providers: createProviders() as any,
  });

  // @ts-ignore
  transport.addPlugin(requestTransformerCreator, {
    optionsOverrides: {
      authorize: false,
    },
  });

  return new Promise((resolve, reject) => {
    transport.once(TransportEvent.CONNECTED, () => {
      transport.authenticate().then(() => resolve(transport), reject);
    });

    transport.connect();
  });
}

let transportCache: Transport | undefined;

export async function getTransport(): Promise<Transport> {
  if (!transportCache) {
    transportCache = await createSpotifyComTransport();
  }
  return transportCache;
}

async function createGabitoEventSender(): Promise<GabitoEventSender> {
  if (publishEnabled) {
    const transport = await getTransport();
    const spTCookie = getCookie('sp_t');
    const correlationId = spTCookie ? createCorrelationIdContext(spTCookie) : undefined;

    return createEventSender({
      transport,
      context: [...(correlationId ? [correlationId] : []), createUserAgentContext()],
    });
  }

  return {
    send(event) {
      if (loggerEnabled) {
        // eslint-disable-next-line no-console
        console.log(`Gabito Event:`, event);
      }
      return Promise.resolve();
    },
  };
}

let eventSenderInstance: GabitoEventSender | undefined;

export async function getEventSender(): Promise<GabitoEventSender> {
  if (!eventSenderInstance) {
    eventSenderInstance = await createGabitoEventSender();
  }
  return eventSenderInstance;
}

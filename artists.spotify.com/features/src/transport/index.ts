// ignore-string-externalization
import {
  createBaseTransport,
  TransportEvent,
} from '@spotify-internal/transport';
import { tokenProvider } from '@mrkt/features/auth';

// https://backstage.spotify.net/docs/js-sdk-transport/manual/instantiating/#creating-transport-instances
export const transport = createBaseTransport({
  providers: {
    async endpoints() {
      return {
        webgate: 'https://generic.wg.spotify.com',
        webapi: 'https://api.spotify.com',
      };
    },
    token: tokenProvider,
  },
});

// https://backstage.spotify.net/docs/js-sdk-transport/manual/lifecycle/#authentication
transport.on(TransportEvent.CONNECTED, () => {
  // Authenticate after connection
  transport.authenticate().catch(error => {
    // ignore when logged out
    if (error.message === 'logged out') return;
    throw error;
  });
});

// do not connect in tests
if (process.env.NODE_ENV !== 'test') {
  transport.connect();
}

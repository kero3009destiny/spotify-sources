import { createMrktUBIContext } from '@spotify-internal/event-definitions/es5/events/createMrktUBIContext';
import { UbiProd1ImpressionEvent } from '@spotify-internal/event-definitions/es5/events/createUbiProd1Impression';
import { UbiProd1InteractionEvent } from '@spotify-internal/event-definitions/es5/events/createUbiProd1Interaction';
import { eventSender } from '@mrkt/features/gabito';
import { UBI } from '@spotify-internal/ubi-logger-js';

export const createUbiEventLogger = (
  artistId: string | null = null,
  organizationUri: string | null = null,
  authorize = true,
) => {
  if (typeof window === 'undefined') {
    return {
      logImpression() {},
      logInteraction() {},
    };
  }

  return UBI.getUBILogger({
    send: async event => {
      await eventSender.send(event, { authorize, flush: true });
      if (artistId || organizationUri) {
        await eventSender.send(
          createMrktUBIContext({
            ubi_event_id:
              (event as UbiProd1ImpressionEvent).data.impression_id ||
              (event as UbiProd1InteractionEvent).data.interaction_id,
            creator_uri: artistId ? `spotify:artist:${artistId}` : '',
            organization_uri: organizationUri,
          }),
        );
      }
    },
  });
};

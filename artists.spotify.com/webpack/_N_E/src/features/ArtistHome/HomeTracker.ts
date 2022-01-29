// ignore-string-externalization
import { createMrktHomeCardImpressionBrowser } from '@spotify-internal/event-definitions/es5/events/createMrktHomeCardImpressionBrowser';
import { createMrktHomeCardInteractionBrowser } from '@spotify-internal/event-definitions/es5/events/createMrktHomeCardInteractionBrowser';
import { PageId } from '../PlatformEvents';
import { useCurrentOrgOrNull } from '../../features/artists/src/useCurrentOrgOrNull';
import { logGabitoEvent } from '@mrkt/features/gabito';
export var useHomeTracker = function useHomeTracker() {
  var currentOrgOrNull = useCurrentOrgOrNull();
  var orgUri = currentOrgOrNull ? currentOrgOrNull.uri : '';
  return {
    makeHomeCardEvent: function makeHomeCardEvent(cardId, cardSource, target, creatorUri, notificationClass, cardPosition) {
      return {
        card_id: cardId,
        card_source: cardSource === 'UNRECOGNIZED' || cardSource === 'UNKNOWN' ? 'UNKNOWN_TYPE' : cardSource,
        target: target,
        page_id: PageId.ArtistHome,
        page_uri: window.location.href,
        creator_uri: creatorUri,
        organization_uri: orgUri,
        notification_class: notificationClass,
        card_position: cardPosition
      };
    },
    trackImpression: function trackImpression(event) {
      logGabitoEvent(createMrktHomeCardImpressionBrowser(event));
    },
    trackInteraction: function trackInteraction(event) {
      logGabitoEvent(createMrktHomeCardInteractionBrowser(event));
    }
  };
};
// ignore-string-externalization
import { PageId } from '../PlatformEvents';
import { createWebAudienceEventFactory } from '@spotify-internal/ubi-sdk-s4a-web-audience';
export var ubiAudienceSpec = function ubiAudienceSpec() {
  var pageId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : PageId.ArtistAudience;
  return createWebAudienceEventFactory({
    data: {
      identifier: pageId,
      uri: window.location.href
    }
  });
};
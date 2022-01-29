import _defineProperty from "/var/jenkins_home/workspace/tingle.3b6a912d-4d0a-4635-8445-e49fdb128ace/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
// ignore-string-externalization
import { SpotifyHelpers } from '@spotify-internal/tracing-web';
// TODO: extract/centralize this so it's not buried in the platform and can be
// shared with other ownership initiatives.
var requestOwnership = new Map();
requestOwnership.set('activity-feed', {
  owner: 'alohomora',
  tribe: 'creator-core'
});
requestOwnership.set('canvaz-view', {
  owner: 'imagine',
  tribe: 'creator-studio'
});
requestOwnership.set('buyerxp-campaign-view', {
  owner: 'buyer-experience',
  tribe: 'creator-studio'
});
requestOwnership.set('creator-search-service', {
  owner: 'bedrock-squad',
  tribe: 'creator-core'
});
requestOwnership.set('hyperlink', {
  owner: 'hype',
  tribe: 'creator-studio'
});
requestOwnership.set('marketplace-mgmt', {
  owner: 'alohomora',
  tribe: 'creator-core'
});
requestOwnership.set('marquee-assistant', {
  owner: 'elevate-promo',
  tribe: 'creator-studio'
});
requestOwnership.set('marquee-forecaster', {
  owner: 'elevate-promo',
  tribe: 'creator-studio'
});
requestOwnership.set('nms-form', {
  owner: 's4a-stardust',
  tribe: 's4x'
});
requestOwnership.set('nms-form-data', {
  owner: 's4a-stardust',
  tribe: 's4x'
});
requestOwnership.set('nms-submission', {
  owner: 's4a-stardust',
  tribe: 's4x'
});
requestOwnership.set('roster-view-service', {
  owner: 's4a-stardust',
  tribe: 's4x'
});
requestOwnership.set('s4a-graphql.spotify.com', {
  owner: 'platypus-squad',
  tribe: 'creator-core'
});
requestOwnership.set('s4a-onboarding', {
  owner: 'alohomora',
  tribe: 'creator-core'
});
requestOwnership.set('s4a-service', {
  owner: 'bedrock-squad',
  tribe: 'creator-core'
});
requestOwnership.set('s4x-access', {
  owner: 'imagine',
  tribe: 'creator-studio'
});
requestOwnership.set('s4x-home-service', {
  owner: 'creator-highlights',
  tribe: 's4x'
});
requestOwnership.set('s4x-insights-api', {
  owner: 's4x-understand',
  tribe: 's4x'
});
requestOwnership.set('s4x-me', {
  owner: 'bedrock-squad',
  tribe: 'creator-core'
});
requestOwnership.set('s4x-wallet', {
  owner: 's4x-moneybadger',
  tribe: 'creator-core'
});
requestOwnership.set('sfx-home-shareables', {
  owner: 'creator-highlights',
  tribe: 's4x'
});
requestOwnership.set('sponcerts', {
  owner: 's4a-stardust',
  tribe: 's4x'
});
requestOwnership.set('team-account-settings', {
  owner: 's4x-moneybadger',
  tribe: 'creator-core'
});
requestOwnership.set('upcoming-view-service', {
  owner: 's4a-stardust',
  tribe: 's4x'
});
requestOwnership.set('romaine-stats-view', {
  owner: 's4a-stardust',
  tribe: 's4x'
});
var OWNERSHIP_OWNER_TAG = 'ownership.owner';
var OWNERSHIP_TRIBE_TAG = 'ownership.tribe';
export function addOwnershipInfo(span, req) {
  var _span$addTags2;

  var wgInfo = SpotifyHelpers.extractWebgateInfo(req);
  if (!wgInfo) return;
  var ownership = requestOwnership.get(wgInfo.service);

  if (!ownership) {
    var _span$addTags;

    if (false) {
      // eslint-disable-next-line no-console
      console.warn("Request to service ".concat(wgInfo.service, " did not have tracing ownership information registered."));
    }

    span.addTags((_span$addTags = {}, _defineProperty(_span$addTags, OWNERSHIP_OWNER_TAG, 'unknown'), _defineProperty(_span$addTags, OWNERSHIP_TRIBE_TAG, 'unknown'), _span$addTags));
    return;
  }

  span.addTags((_span$addTags2 = {}, _defineProperty(_span$addTags2, OWNERSHIP_OWNER_TAG, ownership.owner), _defineProperty(_span$addTags2, OWNERSHIP_TRIBE_TAG, ownership.tribe), _span$addTags2));
}
import { ADMIN, useArtistPermissions } from '../../../../features/artists';
import { useGetArtistRollout } from './api/getArtistRollout';
import { useCurrentArtist } from './artist';
import { useMerchRollout } from './rollout';

function useHasAdmin(_artistID) {
  var _useCurrentArtist;

  var currentArtistID = (_useCurrentArtist = useCurrentArtist()) === null || _useCurrentArtist === void 0 ? void 0 : _useCurrentArtist.id;
  var artistID = _artistID || currentArtistID;
  var permissions = useArtistPermissions(artistID);
  return permissions.includes(ADMIN);
}

export function useHasAdminForArtists(artists) {
  return artists.filter(function useAdminArtistsFilter(artist) {
    var permissions = useArtistPermissions(artist.id);
    return permissions.includes(ADMIN);
  });
}
// This hook needs to make sure that consumers don't evaluate the response until
// the auth APIs have been resolved. At this stage in the app lifecycle, we
// assume that permissions and experimentation-platform rollouts have resolved
// to a value, but we can't make the same assumptions about merch-service
// artist-level rollouts because me initialize these network requests upon render.
export function useAuthorizedForMerchAccess(artistID) {
  // User-level rollout is controlled via experimentation platform (link below)
  // https://backstage.spotify.net/experimentation/rollout/overview/8907
  var merchIsRolledOutToUser = useMerchRollout(); // Artist-level rollout is controlled via an allowlist (link below)
  // https://ghe.spotify.net/creator/merch/blob/master/merch-service/src/main/java/com/spotify/merch/shopify/RolloutHelper.java

  var _useGetArtistRollout = useGetArtistRollout(artistID),
      merchIsRolledOutToArtist = _useGetArtistRollout.rolledOut,
      loading = _useGetArtistRollout.loading;

  var userHasAdminPermissionForCurrentArtist = useHasAdmin(artistID);
  return {
    value: merchIsRolledOutToUser && merchIsRolledOutToArtist && userHasAdminPermissionForCurrentArtist,
    loading: loading
  };
}
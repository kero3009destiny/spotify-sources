import { VIEWER, useCurrentArtistPermissions } from '../../../features/artists';
import { useArtistProfilePermissionsRollout } from './useArtistProfilePermissionsRollout';
export var useShouldFallback = function useShouldFallback() {
  var permissions = useCurrentArtistPermissions();
  var artistProfilePermissionsRolledOut = useArtistProfilePermissionsRollout();

  if (!artistProfilePermissionsRolledOut) {
    return !permissions.includes(VIEWER);
  }

  return false;
};
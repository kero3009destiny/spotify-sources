import { VIEWER, useCurrentArtistPermissions } from '../../../features/artists';
import { useArtistProfilePermissionsRollout } from './useArtistProfilePermissionsRollout';
export function useIsArtistProfileEnabledForCurrentUser() {
  var artistProfile1PPermissionsRolledOut = useArtistProfilePermissionsRollout();
  var currentArtistPermissions = useCurrentArtistPermissions();

  if (!artistProfile1PPermissionsRolledOut) {
    return currentArtistPermissions.includes(VIEWER);
  }

  return true;
}
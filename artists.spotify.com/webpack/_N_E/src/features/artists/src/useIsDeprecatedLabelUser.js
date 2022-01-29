// ignore-string-externalization
import { useCurrentArtistPermissions } from './useCurrentArtistPermissions';
import { VIEWER } from './permissions';
export function useIsDeprecatedLabelUser() {
  // until the VIEWER permission is killed
  // We need a way to distinguish a 1P user with full Artist Permissions
  var permissions = useCurrentArtistPermissions();
  return !permissions.includes(VIEWER);
}
/* eslint-disable-next-line import/no-default-export */

export default useIsDeprecatedLabelUser;
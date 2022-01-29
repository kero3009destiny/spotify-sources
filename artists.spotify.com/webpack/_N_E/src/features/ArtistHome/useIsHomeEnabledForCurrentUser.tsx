// ignore-string-externalization
import { HOME_VIEW, VIEWER, useCurrentArtistPermissions } from '../artists';
export function useIsHomeEnabledForCurrentUser() {
  var permissions = useCurrentArtistPermissions();
  return permissions.includes(VIEWER) || permissions.includes(HOME_VIEW);
}
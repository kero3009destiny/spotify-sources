import { CATALOG_VIEW, useCurrentArtistPermissions, useIsDeprecatedLabelUser } from '../artists';
export function useMusicPermissionCheck() {
  var permissions = useCurrentArtistPermissions();
  var isDeprecatedLabelUser = useIsDeprecatedLabelUser();
  return !(isDeprecatedLabelUser && !permissions.includes(CATALOG_VIEW));
}
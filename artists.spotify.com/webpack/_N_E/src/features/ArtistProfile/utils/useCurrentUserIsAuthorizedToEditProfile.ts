import { ADMIN, EDITOR, useCurrentArtistPermissions } from '../../artists';
import { useArtistProfilePermissionsRollout } from './useArtistProfilePermissionsRollout';
import { useCurrentArtistProfile } from './useCurrentArtistProfile';
export function useCurrentUserIsAuthorizedToEditProfile() {
  var currentArtistPermissions = useCurrentArtistPermissions();
  var artistProfile = useCurrentArtistProfile();
  var artistProfileIsEditable = artistProfile === null || artistProfile === void 0 ? void 0 : artistProfile.isEditable;
  var artistProfile1PPermissionsRolledOut = useArtistProfilePermissionsRollout();

  if (artistProfile1PPermissionsRolledOut) {
    return artistProfileIsEditable !== null && artistProfileIsEditable !== void 0 ? artistProfileIsEditable : false;
  }

  return currentArtistPermissions.includes(ADMIN) || currentArtistPermissions.includes(EDITOR);
}
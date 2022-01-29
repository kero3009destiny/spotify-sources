import { ADMIN, useCurrentArtistPermissions } from '../../../artists';

function useAdmin() {
  var permissions = useCurrentArtistPermissions();
  return permissions.includes(ADMIN);
}

export function useAuthorized() {
  var admin = useAdmin();
  return admin;
}
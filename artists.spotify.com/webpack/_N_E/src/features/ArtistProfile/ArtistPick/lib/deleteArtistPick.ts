// ignore-string-externalization
import { IDENTITY_API, del } from '../../../../shared/lib/api';
export function deleteArtistPick(artistId, team) {
  var endpoint = "".concat(IDENTITY_API, "/v1/profile/").concat(artistId, "/pinned?organizationUri=").concat(team);
  return del(endpoint);
}
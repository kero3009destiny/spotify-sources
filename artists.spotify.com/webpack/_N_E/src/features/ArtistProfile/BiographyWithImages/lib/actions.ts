// ignore-string-externalization
import { IDENTITY_API, webgateFetchJson } from '../../../../shared/lib/api';
export var save = function save(artistId, biography, organizationUri) {
  var endpoint = "".concat(IDENTITY_API, "/v1/profile/").concat(artistId, "/biography?organizationUri=").concat(organizationUri);
  return webgateFetchJson(endpoint, {
    body: JSON.stringify({
      body: biography
    }),
    method: 'PATCH'
  });
};
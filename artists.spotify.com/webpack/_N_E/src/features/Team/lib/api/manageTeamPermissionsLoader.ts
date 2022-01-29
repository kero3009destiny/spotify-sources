// ignore-string-externalization
import { createLoader } from '@spotify-internal/creator-data-loading';
import { webgateFetchJson } from '@mrkt/features/webgate-fetch';
import { MARKETPLACE_MGMT_API } from '../../../../shared/lib/api';
export var manageTeamsPermissionsLoader = createLoader(function (_ref) {
  var organizationUri = _ref.organizationUri;
  return webgateFetchJson("".concat(MARKETPLACE_MGMT_API, "/v1/team/").concat(organizationUri, "/manageTeamPermissions"));
});
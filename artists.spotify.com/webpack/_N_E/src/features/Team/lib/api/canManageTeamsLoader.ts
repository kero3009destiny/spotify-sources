// ignore-string-externalization
import { createLoader } from '@spotify-internal/creator-data-loading';
import { webgateFetchJson } from '@mrkt/features/webgate-fetch';
import { MARKETPLACE_MGMT_API } from '../../../../shared/lib/api';
export var canManageTeamsLoader = createLoader(function () {
  return webgateFetchJson("".concat(MARKETPLACE_MGMT_API, "/v1/team/hasmanageteam"));
});
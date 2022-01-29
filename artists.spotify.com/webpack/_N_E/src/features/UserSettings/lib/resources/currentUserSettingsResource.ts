// ignore-string-externalization
import { webgateFetchJson, webgateFetch } from '../../../../shared/lib/api';
import { createResource } from '../../../../shared/lib/createResource';
export var SETTINGS_RESOURCE_URL = "https://generic.wg.spotify.com/marketplace-mgmt/v0/settings";
export var currentUserSettingsResource = createResource(function () {
  return (// Handle server errors gracefully by responding with a blank object. Long term this will
    // be moved to the backend.
    webgateFetchJson(SETTINGS_RESOURCE_URL).catch(function () {
      return {
        email: '',
        firstname: '',
        lastname: '',
        locale: '',
        twofactorstatus: false
      };
    })
  );
});
export var patchCurrentUserSettings = function patchCurrentUserSettings(newUserSettings) {
  return webgateFetch("".concat(SETTINGS_RESOURCE_URL), {
    method: 'PATCH',
    body: JSON.stringify(newUserSettings)
  }).then(function (result) {
    currentUserSettingsResource.invalidate();
    return result;
  });
};
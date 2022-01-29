// ignore-string-externalization
import { MARKETPLACE_MGMT_API, webgateFetch, webgateFetchJson } from '../../../../shared/lib/api';
import { createResource } from '../../../../shared/lib/createResource';
var RESOURCE_URL = "".concat(MARKETPLACE_MGMT_API, "/v0/settings/subscribed/all"); // Handle server errors gracefully by responding with a blank object. Long term this will
// be moved to the backend.

export var currentUserEmailPreferencesResource = createResource(function () {
  return webgateFetchJson(RESOURCE_URL).then(function (value) {
    return value.preferenceList;
  }).catch(function () {
    return [{
      preferenceType: 'NOTIFY_CREATOR_MARKETING',
      isSubscribed: false
    }, {
      preferenceType: 'NOTIFY_CREATOR_UPDATES',
      isSubscribed: false
    }];
  });
});
export var postCurrentUserEmailPreferences = function postCurrentUserEmailPreferences(newEmailPreferences) {
  return webgateFetch(RESOURCE_URL, {
    method: 'POST',
    body: JSON.stringify({
      preferenceList: newEmailPreferences
    })
  }).then(function () {
    return currentUserEmailPreferencesResource.invalidate();
  });
};
import { currentUserSettingsResource } from './resources';
export var useCurrentUserDetails = function useCurrentUserDetails() {
  var userSettings = currentUserSettingsResource.read();
  return {
    firstName: userSettings.firstname,
    lastName: userSettings.lastname,
    businessEmail: userSettings.email,
    currentLanguage: userSettings.locale,
    twofactorstatus: userSettings.twofactorstatus
  };
};
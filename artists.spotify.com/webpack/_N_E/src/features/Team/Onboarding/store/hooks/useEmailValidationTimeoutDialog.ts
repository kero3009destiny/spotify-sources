import { createUbiEventLogger } from '@mrkt/features/ubi';
import { createWebAccessEmailValidationTimeoutDialogEventFactory } from '@spotify-internal/ubi-sdk-s4a-web-access-email-validation-timeout-dialog';
import { PageId } from '../../../../PlatformEvents';
var UBIEventLogger = createUbiEventLogger();
var spec = createWebAccessEmailValidationTimeoutDialogEventFactory({
  data: {
    identifier: PageId.TeamManagement,
    uri: window.location.href
  }
});
export var useWebAccessEmailValidationTimeoutLogger = function useWebAccessEmailValidationTimeoutLogger() {
  return function () {
    UBIEventLogger.logImpression(spec.impression());
  };
};
export var useWebAccessEmailValidationTimeoutDismissalLogger = function useWebAccessEmailValidationTimeoutDismissalLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.okButtonFactory().hitLogout());
  };
};
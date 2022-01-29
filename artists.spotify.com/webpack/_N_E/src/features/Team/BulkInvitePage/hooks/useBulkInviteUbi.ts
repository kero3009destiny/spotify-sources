import { createUbiEventLogger } from '@mrkt/features/ubi';
import { createWebBulkInviteEventFactory } from '@spotify-internal/ubi-sdk-s4a-web-bulk-invite';
import { PageId } from '../../../PlatformEvents';
var UBIEventLogger = createUbiEventLogger();
var spec = createWebBulkInviteEventFactory({
  data: {
    identifier: PageId.TeamManagementBulkInvite,
    uri: window.location.href
  }
});
export var useBulkInviteDownloadTemplateCsvFileLogger = function useBulkInviteDownloadTemplateCsvFileLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.downloadTemplateLinkFactory().hitDownloadFile());
  };
};
export var useBulkInviteUploadCsvFileHitLogger = function useBulkInviteUploadCsvFileHitLogger() {
  // TODO: update interactions to upload file once new actions are available and added to the spec
  return function () {
    UBIEventLogger.logInteraction(spec.uploadCsvFileFactory().hitDownloadFile());
  };
};
export var useBulkInviteUploadCsvFileDragLogger = function useBulkInviteUploadCsvFileDragLogger() {
  // TODO: update interactions to upload file once new actions are available and added to the spec
  return function () {
    UBIEventLogger.logInteraction(spec.uploadCsvFileFactory().dragDownloadFile());
  };
};
export var useBulkInviteCsvParsingErrorLogger = function useBulkInviteCsvParsingErrorLogger() {
  return function () {
    UBIEventLogger.logImpression(spec.csvFileParsingErrorFactory().impression());
  };
};
export var useBulkInviteCsvMissingHeadersErrorLogger = function useBulkInviteCsvMissingHeadersErrorLogger() {
  return function () {
    UBIEventLogger.logImpression(spec.csvMissingHeadersErrorFactory().impression());
  };
};
export var useBulkInviteInvalidFileTypeErrorLogger = function useBulkInviteInvalidFileTypeErrorLogger() {
  return function () {
    UBIEventLogger.logImpression(spec.invalidFileTypeErrorFactory().impression());
  };
};
export var useBulkInviteEditButtonLogger = function useBulkInviteEditButtonLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.invitationRowFactory().editButtonFactory().hitUiReveal());
  };
};
export var useBulkInviteSendInvitesButtonLogger = function useBulkInviteSendInvitesButtonLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.sendButtonFactory().hitInviteTeamMember({
      inviteType: 'bulk'
    }));
  };
};
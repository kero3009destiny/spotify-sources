import { createUbiEventLogger } from '@mrkt/features/ubi';
import { PageId } from '../../../PlatformEvents';
import { createWebTeamMemberDetailsFormEventFactory } from '@spotify-internal/ubi-sdk-s4a-web-team-member-details-form';
var UBIEventLogger = createUbiEventLogger();
var spec = createWebTeamMemberDetailsFormEventFactory({
  data: {
    identifier: PageId.Roster,
    uri: window.location.href
  }
});
export var useWebTeamMemberDetailsFormFirstNameTextboxLogger = function useWebTeamMemberDetailsFormFirstNameTextboxLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.firstNameTextboxFactory().hitFocusInputField());
  };
};
export var useWebTeamMemberDetailsFormLastNameTextboxLogger = function useWebTeamMemberDetailsFormLastNameTextboxLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.lastNameTextboxFactory().hitFocusInputField());
  };
};
export var useWebTeamMemberDetailsFormBusinessEmailTextboxLogger = function useWebTeamMemberDetailsFormBusinessEmailTextboxLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.businessEmailTextboxFactory().hitFocusInputField());
  };
};
export var useWebTeamMemberDetailsFormRoleDropdownLogger = function useWebTeamMemberDetailsFormRoleDropdownLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.roleDropdownFactory().hitUiReveal());
  };
};
export var useWebTeamMemberDetailsFormRoleDropdownElementSelectLogger = function useWebTeamMemberDetailsFormRoleDropdownElementSelectLogger() {
  return function (id) {
    UBIEventLogger.logInteraction(spec.roleDropdownFactory().roleOptionsFactory({
      identifier: id
    }).hitUiSelect());
  };
};
export var useWebTeamMemberDetailsFormCompanyTextboxLogger = function useWebTeamMemberDetailsFormCompanyTextboxLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.companyTextboxFactory().hitFocusInputField());
  };
};
export var useWebTeamMemberDetailsFormAdminRadioButtonLogger = function useWebTeamMemberDetailsFormAdminRadioButtonLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.adminRadioButtonFactory().hitUiSelect());
  };
};
export var useWebTeamMemberDetailsFormEditorRadioButtonLogger = function useWebTeamMemberDetailsFormEditorRadioButtonLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.editorRadioButtonFactory().hitUiSelect());
  };
};
export var useWebTeamMemberDetailsFormReaderRadioButtonLogger = function useWebTeamMemberDetailsFormReaderRadioButtonLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.readerRadioButtonFactory().hitUiSelect());
  };
};
import { createWebTeamEventFactory } from '@spotify-internal/ubi-sdk-s4a-web-team';
import { createUbiEventLogger } from '@mrkt/features/ubi';
import { PageId } from '../../../PlatformEvents';
var UBIEventLogger = createUbiEventLogger();
var spec = createWebTeamEventFactory({
  data: {
    identifier: PageId.TeamManagement,
    uri: window.location.href
  }
});
export var useWebTeamBreadcrumbLinkLogger = function useWebTeamBreadcrumbLinkLogger(url) {
  return function () {
    UBIEventLogger.logInteraction(spec.breadcrumbLinkFactory().hitUiNavigate({
      destination: url
    }));
  };
};
export var useWebTeamAccessLevelPopoverRevealLogger = function useWebTeamAccessLevelPopoverRevealLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.accessLevelPopoverTriggerFactory().hitUiReveal());
  };
};
export var useWebTeamAccessLevelPopoverLeaveTeamRevealLogger = function useWebTeamAccessLevelPopoverLeaveTeamRevealLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.accessLevelPopoverTriggerFactory().accessLevelPopoverFactory().leaveTeamLinkFactory().hitUiReveal());
  };
};
export var useWebTeamLeaveTeamRestrictedLogger = function useWebTeamLeaveTeamRestrictedLogger(id) {
  return function () {
    UBIEventLogger.logInteraction(spec.accessLevelPopoverTriggerFactory().accessLevelPopoverFactory().leaveTeamLinkFactory().leaveTeamDialogFactory({
      identifier: id
    }).gotItButtonFactory().hitUiHide());
  };
};
export var useWebTeamAccessLevelPopoverLeaveTeamConfirmLogger = function useWebTeamAccessLevelPopoverLeaveTeamConfirmLogger(id) {
  return function () {
    UBIEventLogger.logInteraction(spec.accessLevelPopoverTriggerFactory().accessLevelPopoverFactory().leaveTeamLinkFactory().leaveTeamDialogFactory({
      identifier: id
    }).leaveTeamConfirmButtonFactory().hitRemoveTeamMember());
  };
};
export var useWebTeamAccessLevelPopoverLeaveTeamCancelLinkLogger = function useWebTeamAccessLevelPopoverLeaveTeamCancelLinkLogger(id) {
  return function () {
    UBIEventLogger.logInteraction(spec.accessLevelPopoverTriggerFactory().accessLevelPopoverFactory().leaveTeamLinkFactory().leaveTeamDialogFactory({
      identifier: id
    }).cancelButtonFactory().hitUiHide());
  };
};
export var useWebTeamSaveBillingContactLogger = function useWebTeamSaveBillingContactLogger(id) {
  return function () {
    UBIEventLogger.logInteraction(spec.accessLevelPopoverTriggerFactory().accessLevelPopoverFactory().leaveTeamLinkFactory().leaveTeamDialogFactory({
      identifier: id
    }).billingContactDropdownFactory().billingContactSaveButtonFactory().hitSaveBillingInfo({
      hasCountry: '',
      hasEmail: ''
    }));
  };
};
export var useWebTeamCancelBillingContactLogger = function useWebTeamCancelBillingContactLogger(id) {
  return function () {
    UBIEventLogger.logInteraction(spec.accessLevelPopoverTriggerFactory().accessLevelPopoverFactory().leaveTeamLinkFactory().leaveTeamDialogFactory({
      identifier: id
    }).billingContactDropdownFactory().billingContactCancelButtonFactory().hitUiHide());
  };
};
export var useWebTeamTeamPageTeamMemberTabNavigateLogger = function useWebTeamTeamPageTeamMemberTabNavigateLogger(url) {
  return function () {
    UBIEventLogger.logInteraction(spec.teamPageTabsFactory().teamMembersTabFactory().hitUiNavigate({
      destination: url
    }));
  };
};
export var useWebTeamTeamPageActivityTabNavigateLogger = function useWebTeamTeamPageActivityTabNavigateLogger(url) {
  return function () {
    UBIEventLogger.logInteraction(spec.teamPageTabsFactory().activityTabFactory().hitUiNavigate({
      destination: url
    }));
  };
};
export var useWebTeamTeamPageBillingTabNavigateLogger = function useWebTeamTeamPageBillingTabNavigateLogger(url) {
  return function () {
    UBIEventLogger.logInteraction(spec.teamPageTabsFactory().billingTabFactory().hitUiNavigate({
      destination: url
    }));
  };
};
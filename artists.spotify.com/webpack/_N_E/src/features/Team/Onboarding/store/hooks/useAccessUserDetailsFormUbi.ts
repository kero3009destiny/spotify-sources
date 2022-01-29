import { createUbiEventLogger } from '@mrkt/features/ubi';
import { PageId } from '../../../../PlatformEvents';
import { createWebAccessUserDetailsFormEventFactory } from '@spotify-internal/ubi-sdk-s4a-web-access-user-details-form';
var UBIEventLogger = createUbiEventLogger();
var spec = createWebAccessUserDetailsFormEventFactory({
  data: {
    identifier: PageId.TeamManagement,
    uri: window.location.href
  }
});
export var useRestartFlowLinkLogger = function useRestartFlowLinkLogger() {
  return function (url) {
    UBIEventLogger.logInteraction(spec.restartFlowLinkFactory().hitUiNavigate({
      destination: url
    }));
  };
};
export var useLabelOrDistributorFormRadioLogger = function useLabelOrDistributorFormRadioLogger() {
  return function (id) {
    UBIEventLogger.logInteraction(spec.labelOrDistributorFormRadioFactory({
      identifier: id
    }).hitUiSelect());
  };
};
export var useLogoutButtonLogger = function useLogoutButtonLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.logOutButtonFactory().hitLogout());
  };
};
export var useFirstNameTextboxLogger = function useFirstNameTextboxLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.firstNameTextboxFactory().hitFocusInputField());
  };
};
export var useLastNameTextboxLogger = function useLastNameTextboxLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.lastNameTextboxFactory().hitFocusInputField());
  };
};
export var useBusinessEmailTextboxLogger = function useBusinessEmailTextboxLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.businessEmailTextboxFactory().hitFocusInputField());
  };
};
export var useRoleDropdownLogger = function useRoleDropdownLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.roleDropdownFactory().hitUiReveal());
  };
};
export var useSelectRoleOptionLogger = function useSelectRoleOptionLogger() {
  return function (id) {
    UBIEventLogger.logInteraction(spec.roleDropdownFactory().roleOptionsFactory({
      identifier: id
    }).hitUiSelect());
  };
};
export var useCompanyTextboxLogger = function useCompanyTextboxLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.companyTextboxFactory().hitFocusInputField());
  };
};
export var useCompanyWebsiteTextboxLogger = function useCompanyWebsiteTextboxLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.companyWebsiteTextboxFactory().hitFocusInputField());
  };
};
export var useSocialLinkTextboxLogger = function useSocialLinkTextboxLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.socialLinkTextboxFactory().hitFocusInputField());
  };
};
export var useTermsAndConditionsCheckboxLogger = function useTermsAndConditionsCheckboxLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.termsAndConditionsCheckboxFactory().hitAcceptTerms());
  };
};
export var useGoBackButtonLogger = function useGoBackButtonLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.actionButtonsFactory().goBackButtonFactory().hitUiReveal());
  };
};
export var useNextButtonLogger = function useNextButtonLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.actionButtonsFactory().nextButtonFactory().hitUiReveal());
  };
};
export var useSubmitButtonLogger = function useSubmitButtonLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.actionButtonsFactory().submitButtonFactory().hitRequestTeamAccess());
  };
};
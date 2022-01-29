import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
// ignore-string-externalization
export var OnboardingActionType;

(function (OnboardingActionType) {
  OnboardingActionType["LABEL_ONBOARDING_FLOW_UPDATE_DETAILS"] = "LABEL_ONBOARDING_FLOW_UPDATE_DETAILS";
  OnboardingActionType["LABEL_ONBOARDING_FLOW_UPDATE_STATE"] = "LABEL_ONBOARDING_FLOW_UPDATE_STATE";
  OnboardingActionType["ARTIST_ACCESS_FLOW_UPDATE_STATE"] = "ARTIST_ACCESS_FLOW_UPDATE_STATE";
  OnboardingActionType["ARTIST_ACCESS_FLOW_UPDATE_DETAILS"] = "ARTIST_ACCESS_FLOW_UPDATE_DETAILS";
})(OnboardingActionType || (OnboardingActionType = {}));

export var createOnboardingActionDispatchers = function createOnboardingActionDispatchers(dispatch) {
  return {
    clearSelectedMedia: function clearSelectedMedia(selectedMediaKey) {
      return dispatch({
        type: OnboardingActionType.LABEL_ONBOARDING_FLOW_UPDATE_DETAILS,
        details: _defineProperty({}, selectedMediaKey, null)
      });
    },
    goToArtistAccessFlowStep: function goToArtistAccessFlowStep(step) {
      return dispatch({
        type: OnboardingActionType.ARTIST_ACCESS_FLOW_UPDATE_STATE,
        state: {
          step: step
        }
      });
    },
    setArtistAccessFlowDetails: function setArtistAccessFlowDetails(details) {
      return dispatch({
        type: OnboardingActionType.ARTIST_ACCESS_FLOW_UPDATE_DETAILS,
        details: details
      });
    },
    setArtistAccessFlowCodeVerificationStatus: function setArtistAccessFlowCodeVerificationStatus(codeVerificationStatus) {
      return dispatch({
        type: OnboardingActionType.ARTIST_ACCESS_FLOW_UPDATE_STATE,
        state: {
          codeVerificationStatus: codeVerificationStatus
        }
      });
    },
    setLabelAccessFlowDetails: function setLabelAccessFlowDetails(details) {
      return dispatch({
        type: OnboardingActionType.LABEL_ONBOARDING_FLOW_UPDATE_DETAILS,
        details: details
      });
    },
    goToLabelAccessFlowStep: function goToLabelAccessFlowStep(step) {
      return dispatch({
        type: OnboardingActionType.LABEL_ONBOARDING_FLOW_UPDATE_STATE,
        state: {
          step: step
        }
      });
    },
    setLabelAccessFlowCodeVerificationStatus: function setLabelAccessFlowCodeVerificationStatus(codeVerificationStatus) {
      return dispatch({
        type: OnboardingActionType.LABEL_ONBOARDING_FLOW_UPDATE_STATE,
        state: {
          codeVerificationStatus: codeVerificationStatus
        }
      });
    }
  };
};
export var isOnboardingActionType = function isOnboardingActionType(action) {
  return action.type && action.type in OnboardingActionType;
};
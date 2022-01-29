// ignore-string-externalization
export var AddTeamsActionType;

(function (AddTeamsActionType) {
  AddTeamsActionType["ADD_TEAMS_UPDATE_STATE"] = "ADD_TEAMS_UPDATE_STATE";
  AddTeamsActionType["ADD_TEAMS_UPDATE_DETAILS"] = "ADD_TEAMS_UPDATE_DETAILS";
})(AddTeamsActionType || (AddTeamsActionType = {}));

export var createAddTeamsActionDispatchers = function createAddTeamsActionDispatchers(dispatch) {
  return {
    setSelectedTeamType: function setSelectedTeamType(selectedTeamType) {
      return dispatch({
        type: AddTeamsActionType.ADD_TEAMS_UPDATE_STATE,
        state: {
          selectedTeamType: selectedTeamType
        }
      });
    },
    setAddTeamsFlowDetails: function setAddTeamsFlowDetails(details) {
      return dispatch({
        type: AddTeamsActionType.ADD_TEAMS_UPDATE_DETAILS,
        details: details
      });
    },
    setCanRequestAccessError: function setCanRequestAccessError(canRequestAccessError) {
      return dispatch({
        type: AddTeamsActionType.ADD_TEAMS_UPDATE_STATE,
        state: {
          canRequestAccessError: canRequestAccessError
        }
      });
    },
    setShowErrors: function setShowErrors(showError) {
      return dispatch({
        type: AddTeamsActionType.ADD_TEAMS_UPDATE_STATE,
        state: {
          showError: showError
        }
      });
    },
    setValidationErrors: function setValidationErrors(formErrors) {
      return dispatch({
        type: AddTeamsActionType.ADD_TEAMS_UPDATE_STATE,
        state: {
          formErrors: formErrors
        }
      });
    },
    setRequestSubmissionError: function setRequestSubmissionError(requestSubmissionError) {
      return dispatch({
        type: AddTeamsActionType.ADD_TEAMS_UPDATE_STATE,
        state: {
          requestSubmissionError: requestSubmissionError
        }
      });
    },
    setRequestId: function setRequestId(requestId) {
      return dispatch({
        type: AddTeamsActionType.ADD_TEAMS_UPDATE_STATE,
        state: {
          requestId: requestId
        }
      });
    }
  };
};
export var isAddTeamsActionType = function isAddTeamsActionType(action) {
  return action.type && action.type in AddTeamsActionType;
};
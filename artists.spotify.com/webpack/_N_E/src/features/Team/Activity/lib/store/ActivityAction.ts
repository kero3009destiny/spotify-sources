// ignore-string-externalization
export var ActivityActionType;

(function (ActivityActionType) {
  ActivityActionType["ACTIVITY_SET_SELECTED_TEAM_MEMBER"] = "ACTIVITY_SET_SELECTED_TEAM_MEMBER";
})(ActivityActionType || (ActivityActionType = {}));

export var createActivityActionDispatchers = function createActivityActionDispatchers(dispatch) {
  return {
    selectActivityTeamMember: function selectActivityTeamMember(teamMember) {
      return dispatch({
        type: ActivityActionType.ACTIVITY_SET_SELECTED_TEAM_MEMBER,
        teamMember: teamMember
      });
    }
  };
};
export var isActivityActionType = function isActivityActionType(action) {
  return action.type && action.type in ActivityActionType;
};
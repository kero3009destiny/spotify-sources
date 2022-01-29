import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import { createOnboardingActionDispatchers } from '../../Onboarding/store';
import { createArtistsTabActionDispatchers } from '../../ArtistsTab/store/ArtistsTabAction';
import { createActivityActionDispatchers } from '../../Activity/lib/store/ActivityAction';
import { createBillingContactActionDispatchers } from '../../BillingContact/lib/store/BillingContactAction';
import { createAddTeamsActionDispatchers } from '../../AddTeams/store/AddTeamsAction';
import { createBulkInviteActionDispatchers } from '../../BulkInvitePage/store/BulkInviteAction';
export var TeamActionType;

(function (TeamActionType) {
  TeamActionType["SET_CURRENT_TEAM"] = "SET_CURRENT_TEAM";
  TeamActionType["UPDATE_STATE"] = "UPDATE_STATE";
  TeamActionType["QUEUE_TASK"] = "QUEUE_TASK";
  TeamActionType["UPDATE_TASK"] = "UPDATE_TASK";
  TeamActionType["CANCEL_TASK"] = "CANCEL_TASK";
  TeamActionType["OPTIMISTICALLY_CREATE_TEAM_MEMBER"] = "OPTIMISTICALLY_CREATE_TEAM_MEMBER";
  TeamActionType["OPTIMISTICALLY_DELETE_TEAM_MEMBER"] = "OPTIMISTICALLY_DELETE_TEAM_MEMBER";
  TeamActionType["OPTIMISTICALLY_UPDATE_TEAM_MEMBER"] = "OPTIMISTICALLY_UPDATE_TEAM_MEMBER";
  TeamActionType["OPTIMISTICALLY_REMOVE_EXPIRED_INVITE"] = "OPTIMISTICALLY_UPDATE_EXPIRED_INVITE";
  TeamActionType["OPTIMISTICALLY_CREATE_JOIN_REQUEST"] = "OPTIMISTICALLY_CREATE_JOIN_REQUEST";
  TeamActionType["OPTIMISTICALLY_DELETE_JOIN_REQUEST"] = "OPTIMISTICALLY_DELETE_JOIN_REQUEST";
  TeamActionType["SET_JOIN_REQUEST_ACCESS_LEVEL"] = "SET_JOIN_REQUEST_ACCESS_LEVEL";
  TeamActionType["SET_JOIN_REQUEST_ACCESS_LEVEL_APPROVAL_DIALOG"] = "SET_JOIN_REQUEST_ACCESS_LEVEL_APPROVAL_DIALOG";
  TeamActionType["SET_JOIN_REQUEST_REJECTION_REASON"] = "SET_JOIN_REQUEST_REJECTION_REASON";
  TeamActionType["SET_JOIN_REQUEST_STATUS"] = "SET_JOIN_REQUEST_STATUS";
  TeamActionType["OPTIMISTICALLY_DELETE_TEAM"] = "OPTIMISTICALLY_DELETE_TEAM";
})(TeamActionType || (TeamActionType = {}));

export var createTeamActionDispatchers = function createTeamActionDispatchers(dispatch) {
  return _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, createActivityActionDispatchers(dispatch)), createAddTeamsActionDispatchers(dispatch)), createArtistsTabActionDispatchers(dispatch)), createBillingContactActionDispatchers(dispatch)), createBulkInviteActionDispatchers(dispatch)), createOnboardingActionDispatchers(dispatch)), {}, {
    updateTaskStatus: function updateTaskStatus(taskId, status) {
      var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          promise = _ref.promise,
          error = _ref.error;

      return dispatch({
        type: TeamActionType.UPDATE_TASK,
        taskId: taskId,
        status: status,
        promise: promise,
        error: error
      });
    },
    cancelTask: function cancelTask(taskId) {
      return dispatch({
        type: TeamActionType.CANCEL_TASK,
        taskId: taskId
      });
    },
    setCurrentTeam: function setCurrentTeam(currentTeam) {
      return dispatch({
        type: TeamActionType.SET_CURRENT_TEAM,
        currentTeam: currentTeam
      });
    },
    setCurrentTeamDetails: function setCurrentTeamDetails(currentTeamDetails) {
      return dispatch({
        type: TeamActionType.UPDATE_STATE,
        state: {
          currentTeamDetails: currentTeamDetails
        }
      });
    },
    optimisticallyCreateJoinRequest: function optimisticallyCreateJoinRequest(joinRequest) {
      return dispatch({
        type: TeamActionType.OPTIMISTICALLY_CREATE_JOIN_REQUEST,
        joinRequest: joinRequest
      });
    },
    optimisticallyDeleteJoinRequest: function optimisticallyDeleteJoinRequest(joinRequestId) {
      return dispatch({
        type: TeamActionType.OPTIMISTICALLY_DELETE_JOIN_REQUEST,
        joinRequestId: joinRequestId
      });
    },
    setJoinRequests: function setJoinRequests(joinRequests) {
      return dispatch({
        type: TeamActionType.UPDATE_STATE,
        state: {
          joinRequests: joinRequests
        }
      });
    },
    setJoinRequestAccessLevel: function setJoinRequestAccessLevel(joinRequest, joinRequestAccessLevel) {
      return dispatch({
        type: TeamActionType.SET_JOIN_REQUEST_ACCESS_LEVEL,
        joinRequest: joinRequest,
        joinRequestAccessLevel: joinRequestAccessLevel
      });
    },
    setJoinRequestAccessLevelFromApprovalDialog: function setJoinRequestAccessLevelFromApprovalDialog(joinRequest, joinRequestAccessLevel) {
      return dispatch({
        type: TeamActionType.SET_JOIN_REQUEST_ACCESS_LEVEL_APPROVAL_DIALOG,
        joinRequest: joinRequest,
        joinRequestAccessLevel: joinRequestAccessLevel
      });
    },
    setJoinRequestRejectionReason: function setJoinRequestRejectionReason(joinRequest, joinRequestRejectionReason) {
      return dispatch({
        type: TeamActionType.SET_JOIN_REQUEST_REJECTION_REASON,
        joinRequest: joinRequest,
        joinRequestRejectionReason: joinRequestRejectionReason
      });
    },
    setJoinRequestStatus: function setJoinRequestStatus(joinRequest, joinRequestStatus) {
      return dispatch({
        type: TeamActionType.SET_JOIN_REQUEST_STATUS,
        joinRequest: joinRequest,
        joinRequestStatus: joinRequestStatus
      });
    },
    toggleJoinTableExpansion: function toggleJoinTableExpansion(joinTableIsExpanded) {
      return dispatch({
        type: TeamActionType.UPDATE_STATE,
        state: {
          joinTableIsExpanded: !joinTableIsExpanded
        }
      });
    },
    setLayoutType: function setLayoutType(layoutType) {
      return dispatch({
        type: TeamActionType.UPDATE_STATE,
        state: {
          layoutType: layoutType
        }
      });
    },
    setCurrentTeamMembers: function setCurrentTeamMembers(currentTeamMembers, currentTeamMemberCount) {
      return dispatch({
        type: TeamActionType.UPDATE_STATE,
        state: {
          currentTeamMembers: currentTeamMembers,
          currentTeamMemberCount: currentTeamMemberCount
        }
      });
    },
    setCurrentUser: function setCurrentUser(currentUser) {
      return dispatch({
        type: TeamActionType.UPDATE_STATE,
        state: {
          currentUser: currentUser
        }
      });
    },
    setArtists: function setArtists(artists) {
      return dispatch({
        type: TeamActionType.UPDATE_STATE,
        state: {
          artists: artists
        }
      });
    },
    setTeams: function setTeams(teams) {
      return dispatch({
        type: TeamActionType.UPDATE_STATE,
        state: {
          teams: teams
        }
      });
    },
    setIsEmployee: function setIsEmployee(isEmployee) {
      return dispatch({
        type: TeamActionType.UPDATE_STATE,
        state: {
          isEmployee: isEmployee
        }
      });
    },
    setHasGodMode: function setHasGodMode(hasGodMode) {
      return dispatch({
        type: TeamActionType.UPDATE_STATE,
        state: {
          hasGodMode: hasGodMode
        }
      });
    },
    setAdminAccessRequests: function setAdminAccessRequests(adminAccessRequests) {
      return dispatch({
        type: TeamActionType.UPDATE_STATE,
        state: {
          adminAccessRequests: adminAccessRequests
        }
      });
    },
    setPlatform: function setPlatform(platform) {
      return dispatch({
        type: TeamActionType.UPDATE_STATE,
        state: {
          platform: platform
        }
      });
    },
    setSelectedTeamMemberUsername: function setSelectedTeamMemberUsername(selectedTeamMemberUsername) {
      return dispatch({
        type: TeamActionType.UPDATE_STATE,
        state: {
          selectedTeamMemberUsername: selectedTeamMemberUsername
        }
      });
    },
    setSelectedTeamMember: function setSelectedTeamMember(selectedTeamMember) {
      return dispatch({
        type: TeamActionType.UPDATE_STATE,
        state: {
          selectedTeamMember: selectedTeamMember
        }
      });
    },
    showTeamMemberRemovalConfirmation: function showTeamMemberRemovalConfirmation(confirmTeamMemberRemoval) {
      return dispatch({
        type: TeamActionType.UPDATE_STATE,
        state: {
          confirmTeamMemberRemoval: confirmTeamMemberRemoval
        }
      });
    },
    hideTeamMemberRemovalConfirmation: function hideTeamMemberRemovalConfirmation() {
      return dispatch({
        type: TeamActionType.UPDATE_STATE,
        state: {
          confirmTeamMemberRemoval: null
        }
      });
    },
    showJoinRequestApprovalConfirmation: function showJoinRequestApprovalConfirmation(confirmJoinRequestApproval) {
      return dispatch({
        type: TeamActionType.UPDATE_STATE,
        state: {
          confirmJoinRequestApproval: confirmJoinRequestApproval
        }
      });
    },
    hideJoinRequestApprovalConfirmation: function hideJoinRequestApprovalConfirmation() {
      return dispatch({
        type: TeamActionType.UPDATE_STATE,
        state: {
          confirmJoinRequestApproval: null
        }
      });
    },
    showJoinRequestRemovalConfirmation: function showJoinRequestRemovalConfirmation(confirmJoinRequestRemoval) {
      return dispatch({
        type: TeamActionType.UPDATE_STATE,
        state: {
          confirmJoinRequestRemoval: confirmJoinRequestRemoval
        }
      });
    },
    hideJoinRequestRemovalConfirmation: function hideJoinRequestRemovalConfirmation() {
      return dispatch({
        type: TeamActionType.UPDATE_STATE,
        state: {
          confirmJoinRequestRemoval: null
        }
      });
    },
    setPrepopulatedInviteDetails: function setPrepopulatedInviteDetails(prepopulatedInviteDetails) {
      return dispatch({
        type: TeamActionType.UPDATE_STATE,
        state: {
          prepopulatedInviteDetails: prepopulatedInviteDetails
        }
      });
    },
    optimisticallyCreateTeamMember: function optimisticallyCreateTeamMember(teamMember) {
      return dispatch({
        type: TeamActionType.OPTIMISTICALLY_CREATE_TEAM_MEMBER,
        teamMember: teamMember
      });
    },
    optimisticallyDeleteTeamMember: function optimisticallyDeleteTeamMember(teamMemberId) {
      return dispatch({
        type: TeamActionType.OPTIMISTICALLY_DELETE_TEAM_MEMBER,
        teamMemberId: teamMemberId
      });
    },
    optimisticallyUpdateTeamMember: function optimisticallyUpdateTeamMember(teamMemberId, teamMember) {
      return dispatch({
        type: TeamActionType.OPTIMISTICALLY_UPDATE_TEAM_MEMBER,
        teamMember: teamMember,
        teamMemberId: teamMemberId
      });
    },
    optimisticallyRemoveExpiredInvite: function optimisticallyRemoveExpiredInvite(businessEmail) {
      return dispatch({
        type: TeamActionType.OPTIMISTICALLY_REMOVE_EXPIRED_INVITE,
        businessEmail: businessEmail
      });
    },
    setPendingInvite: function setPendingInvite(pendingInvite) {
      return dispatch({
        type: TeamActionType.UPDATE_STATE,
        state: {
          pendingInvite: pendingInvite
        }
      });
    },
    optimisticallyDeleteTeam: function optimisticallyDeleteTeam(teamUri) {
      return dispatch({
        type: TeamActionType.OPTIMISTICALLY_DELETE_TEAM,
        teamUri: teamUri
      });
    },
    setYourTeamsPageView: function setYourTeamsPageView(yourTeamsPageView) {
      return dispatch({
        type: TeamActionType.UPDATE_STATE,
        state: {
          yourTeamsPageView: yourTeamsPageView
        }
      });
    }
  });
};
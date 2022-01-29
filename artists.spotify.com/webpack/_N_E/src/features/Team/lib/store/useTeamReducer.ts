import _toConsumableArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import { TeamActionType } from './TeamAction';
import { assertUnreachable } from '../util/assertUnreachable';
import { isOnboardingActionType, onboardingReducer } from '../../Onboarding/store';
import { isCancellablePromise } from '../util/CancellablePromise';
import { isArtistsTabActionType } from '../../ArtistsTab/store/ArtistsTabAction';
import { artistsTabReducer } from '../../ArtistsTab/store/ArtistsTabReducer';
import { isActivityActionType } from '../../Activity/lib/store/ActivityAction';
import { activityReducer } from '../../Activity/lib/store/ActivityReducer';
import { isBillingContactActionType } from '../../BillingContact/lib/store/BillingContactAction';
import { billingContactReducer } from '../../BillingContact/lib/store/BillingContactReducer';
import { isAddTeamsActionType } from '../../AddTeams/store/AddTeamsAction';
import { addTeamsReducer } from '../../AddTeams/store/AddTeamsReducer';
import { isBulkInviteActionType } from '../../BulkInvitePage/store/BulkInviteAction';
import { bulkInviteReducer } from '../../BulkInvitePage/store/BulkInviteReducer';
export var useTeamReducer = function useTeamReducer() {
  return function (state, action) {
    if (isActivityActionType(action)) {
      return _objectSpread(_objectSpread({}, state), {}, {
        activity: activityReducer(state.activity, action)
      });
    }

    if (isAddTeamsActionType(action)) {
      return _objectSpread(_objectSpread({}, state), {}, {
        addTeams: addTeamsReducer(state.addTeams, action)
      });
    }

    if (isArtistsTabActionType(action)) {
      return _objectSpread(_objectSpread({}, state), {}, {
        artistsTab: artistsTabReducer(state.artistsTab, action)
      });
    }

    if (isBillingContactActionType(action)) {
      return _objectSpread(_objectSpread({}, state), {}, {
        billingContact: billingContactReducer(state.billingContact, action)
      });
    }

    if (isBulkInviteActionType(action)) {
      return _objectSpread(_objectSpread({}, state), {}, {
        bulkInvite: bulkInviteReducer(state.bulkInvite, action)
      });
    }

    if (isOnboardingActionType(action)) {
      return _objectSpread(_objectSpread({}, state), {}, {
        onboarding: onboardingReducer(state.onboarding, action)
      });
    }

    switch (action.type) {
      case TeamActionType.SET_CURRENT_TEAM:
        return _objectSpread(_objectSpread({}, state), {}, {
          currentTeam: action.currentTeam,
          currentTeamDetails: null,
          currentTeamMembers: null
        });

      case TeamActionType.OPTIMISTICALLY_CREATE_JOIN_REQUEST:
        return _objectSpread(_objectSpread({}, state), {}, {
          joinRequests: state.joinRequests ? [action.joinRequest].concat(_toConsumableArray(state.joinRequests)) : null
        });

      case TeamActionType.OPTIMISTICALLY_DELETE_JOIN_REQUEST:
        return _objectSpread(_objectSpread({}, state), {}, {
          joinRequests: state.joinRequests ? state.joinRequests.filter(function (joinRequest) {
            return joinRequest.id !== action.joinRequestId;
          }) : null
        });

      case TeamActionType.SET_JOIN_REQUEST_ACCESS_LEVEL:
        return _objectSpread(_objectSpread({}, state), {}, {
          joinRequests: state.joinRequests && state.joinRequests.map(function (req) {
            return req.id === action.joinRequest.id ? _objectSpread(_objectSpread({}, req), {}, {
              accessLevel: action.joinRequestAccessLevel
            }) : req;
          })
        });

      case TeamActionType.SET_JOIN_REQUEST_ACCESS_LEVEL_APPROVAL_DIALOG:
        return _objectSpread(_objectSpread({}, state), {}, {
          confirmJoinRequestApproval: state.confirmJoinRequestApproval && _objectSpread(_objectSpread({}, state.confirmJoinRequestApproval), {}, {
            accessLevel: action.joinRequestAccessLevel
          })
        });

      case TeamActionType.SET_JOIN_REQUEST_REJECTION_REASON:
        return _objectSpread(_objectSpread({}, state), {}, {
          confirmJoinRequestRemoval: state.confirmJoinRequestRemoval && _objectSpread(_objectSpread({}, state.confirmJoinRequestRemoval), {}, {
            rejectionReason: action.joinRequestRejectionReason
          })
        });

      case TeamActionType.SET_JOIN_REQUEST_STATUS:
        return _objectSpread(_objectSpread({}, state), {}, {
          joinRequests: state.joinRequests && state.joinRequests.map(function (req) {
            return req.id === action.joinRequest.id ? _objectSpread(_objectSpread({}, req), {}, {
              status: action.joinRequestStatus
            }) : req;
          })
        });

      case TeamActionType.UPDATE_STATE:
        return _objectSpread(_objectSpread({}, state), action.state);

      case TeamActionType.UPDATE_TASK:
        return _objectSpread(_objectSpread({}, state), {}, {
          taskStatus: _objectSpread(_objectSpread({}, state.taskStatus), {}, _defineProperty({}, action.taskId, action.status)),
          taskPromises: _objectSpread(_objectSpread({}, state.taskPromises), {}, _defineProperty({}, action.taskId, action.promise && action.status === 'running' ? action.promise : null)),
          taskErrors: _objectSpread(_objectSpread({}, state.taskErrors), {}, _defineProperty({}, action.taskId, action.error && action.status === 'error' ? action.error : null))
        });

      case TeamActionType.CANCEL_TASK:
        {
          var taskPromise = state.taskPromises[action.taskId];

          if (taskPromise && isCancellablePromise(taskPromise)) {
            // BAD BEHAVIOR
            // technically this is creating a side effect within a reducer which is a no-no,
            // however we can get away with it as it only affects the cancellablePromise's
            // internal state which prevents a future event from happening. There's no noticable
            // synchronous change to state, and this just changes the destiny of an already in flight
            // async operation... so it should be fine.
            var didCancel = taskPromise.cancel();

            if (didCancel) {
              return _objectSpread(_objectSpread({}, state), {}, {
                taskStatus: _objectSpread(_objectSpread({}, state.taskStatus), {}, _defineProperty({}, action.taskId, 'cancelled'))
              });
            }
          }

          return state;
        }

      case TeamActionType.OPTIMISTICALLY_CREATE_TEAM_MEMBER:
        return _objectSpread(_objectSpread({}, state), {}, {
          currentTeamMembers: state.currentTeamMembers ? [action.teamMember].concat(_toConsumableArray(state.currentTeamMembers)) : null
        });

      case TeamActionType.OPTIMISTICALLY_DELETE_TEAM_MEMBER:
        return _objectSpread(_objectSpread({}, state), {}, {
          currentTeamMembers: state.currentTeamMembers ? state.currentTeamMembers.filter(function (tm) {
            return tm.id !== action.teamMemberId;
          }) : null,
          selectedTeamMemberUsername: state.selectedTeamMemberUsername === action.teamMemberId ? null : state.selectedTeamMemberUsername
        });

      case TeamActionType.OPTIMISTICALLY_UPDATE_TEAM_MEMBER:
        return _objectSpread(_objectSpread({}, state), {}, {
          currentTeamMembers: state.currentTeamMembers ? state.currentTeamMembers.map(function (tm) {
            return tm.id === action.teamMemberId ? action.teamMember : tm;
          }) : null,
          selectedTeamMember: action.teamMember.status === 'active' && state.selectedTeamMember && state.selectedTeamMember.id === action.teamMemberId ? action.teamMember : state.selectedTeamMember
        });

      case TeamActionType.OPTIMISTICALLY_REMOVE_EXPIRED_INVITE:
        if (!state.currentTeamMembers || !state.currentTeamMembers.find(function (e) {
          return e.status === 'invite-expired' && e.businessEmail === action.businessEmail;
        })) {
          return state;
        }

        return _objectSpread(_objectSpread({}, state), {}, {
          currentTeamMembers: state.currentTeamMembers.filter(function (tm) {
            return !(tm.status === 'invite-expired' && tm.businessEmail === action.businessEmail);
          })
        });

      case TeamActionType.OPTIMISTICALLY_DELETE_TEAM:
        return _objectSpread(_objectSpread({}, state), {}, {
          teams: state.teams ? state.teams.filter(function (team) {
            return team.uri !== action.teamUri;
          }) : null
        });

      default:
        return assertUnreachable(action);
    }
  };
};
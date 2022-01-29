import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import { useMemo } from 'react';
import { useHistory } from 'react-router';
import { TeamType } from '../../model/Team';
import { useBannerActions } from '../../../../Banner';
import { removeTeamMemberTask } from './removeTeamMemberTask';
import { revokeInviteTask } from './revokeInviteTask';
import { sendInviteTask } from './sendInviteTask';
import { saveTeamMemberTask } from './saveTeamMemberTask';
import { acceptInviteTask } from './acceptInviteTask';
import { assertUnreachable } from '../../util/assertUnreachable';
import { trackTaskStatus } from '../../util/trackTaskStatus';
import { useTracker } from '../../api/useTracker';
import { useArtistsTabTaskDispatchers } from '../../../ArtistsTab/store/ArtistsTabTasks';
import { useBillingContactTaskDispatchers } from '../../../BillingContact/lib/store/BillingContactTasks';
import { removeJoinRequestTask } from './removeJoinRequestTask';
import { approveJoinRequestTask } from './approveJoinRequestTask';
import { useAddTeamsTaskDispatchers } from '../../../AddTeams/store/AddTeamsTasks';
import { useBulkInviteTaskDispatchers } from '../../../BulkInvitePage/store/BulkInviteTasks';
import { useOnboardingTaskDispatchers } from '../../../Onboarding/store/OnboardingTasks';
/**
 * Tasks are async store updates triggered by a function call, generally invoked by
 * a user interaction.
 *
 * Note: To perform an async store update via a state change (with useEffect), use
 * BackgroundTasks instead.
 */

export var useGlobalTaskDispatchers = function useGlobalTaskDispatchers(dispatchers) {
  var history = useHistory();
  var banner = useBannerActions();
  var tracker = useTracker();
  var updateTaskStatus = dispatchers.updateTaskStatus;
  return useMemo(function () {
    var taskDispatchers = {
      acceptInvite: function acceptInvite(pendingInvite, t) {
        return trackTaskStatus(acceptInviteTask({
          pendingInvite: pendingInvite,
          t: t
        }, _objectSpread(_objectSpread({}, dispatchers), taskDispatchers)), updateTaskStatus, 'accept-invite');
      },
      revokeInvite: function revokeInvite(teamMember, team, t) {
        return trackTaskStatus(revokeInviteTask({
          teamMember: teamMember,
          team: team,
          t: t
        }, _objectSpread(_objectSpread({}, dispatchers), taskDispatchers)), updateTaskStatus, 'revoke-invite');
      },
      sendInvite: function sendInvite(inviteDetails, team, t) {
        return trackTaskStatus(sendInviteTask({
          inviteDetails: inviteDetails,
          team: team,
          t: t
        }, _objectSpread(_objectSpread({}, dispatchers), taskDispatchers)), updateTaskStatus, 'send-invite');
      },
      approveJoinRequest: function approveJoinRequest(joinRequest, team, t) {
        return trackTaskStatus(approveJoinRequestTask({
          joinRequest: joinRequest,
          team: team,
          t: t
        }, _objectSpread(_objectSpread({}, dispatchers), taskDispatchers)), updateTaskStatus, 'approve-join-request');
      },
      removeJoinRequest: function removeJoinRequest(joinRequest, team, t) {
        return trackTaskStatus(removeJoinRequestTask({
          joinRequest: joinRequest,
          team: team,
          t: t
        }, _objectSpread(_objectSpread({}, dispatchers), taskDispatchers)), updateTaskStatus, 'remove-join-request');
      },
      removeTeamMember: function removeTeamMember(teamMember, team, t) {
        var teamMemberIsCurrentUser = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        return trackTaskStatus(removeTeamMemberTask({
          teamMember: teamMember,
          team: team,
          t: t,
          teamMemberIsCurrentUser: teamMemberIsCurrentUser
        }, _objectSpread(_objectSpread({}, dispatchers), taskDispatchers)), updateTaskStatus, 'remove-team-member');
      },
      saveTeamMemberDetails: function saveTeamMemberDetails(team, oldDetails, newDetails, isCurrentUser, t) {
        return trackTaskStatus(saveTeamMemberTask({
          team: team,
          oldDetails: oldDetails,
          newDetails: newDetails,
          isCurrentUser: isCurrentUser,
          t: t
        }, _objectSpread(_objectSpread({}, dispatchers), taskDispatchers)), updateTaskStatus, 'save-team-member-details');
      },

      /** Passthroughs to react hooks **/
      goToHomePage: function goToHomePage() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$team = _ref.team,
            team = _ref$team === void 0 ? null : _ref$team,
            _ref$replace = _ref.replace,
            replace = _ref$replace === void 0 ? false : _ref$replace;

        var queryParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var goto = replace ? history.replace : history.push;

        if (!team) {
          return goto('/');
        }

        switch (team.type) {
          case TeamType.artist:
            return goto("/artist/".concat(team.id, "/home").concat(queryParams));

          case TeamType.label:
            return goto('/');

          default:
            return assertUnreachable(team.type);
        }
      },
      goToTeamsPage: function goToTeamsPage() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref2$replace = _ref2.replace,
            replace = _ref2$replace === void 0 ? false : _ref2$replace;

        return (replace ? history.replace : history.push)("/team/roster");
      },
      goToTeamPage: function goToTeamPage(team) {
        var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref3$replace = _ref3.replace,
            replace = _ref3$replace === void 0 ? false : _ref3$replace;

        return (replace ? history.replace : history.push)("/team/".concat(team.type, "/").concat(team.id));
      },
      goToActivityPage: function goToActivityPage(team) {
        var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref4$replace = _ref4.replace,
            replace = _ref4$replace === void 0 ? false : _ref4$replace;

        return (replace ? history.replace : history.push)("/team/".concat(team.type, "/").concat(team.id, "/activity"));
      },
      goToBillingPage: function goToBillingPage(team) {
        var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref5$replace = _ref5.replace,
            replace = _ref5$replace === void 0 ? false : _ref5$replace;

        return (replace ? history.replace : history.push)("/team/".concat(team.type, "/").concat(team.id, "/billing"));
      },
      goToArtistsPage: function goToArtistsPage(team) {
        var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref6$replace = _ref6.replace,
            replace = _ref6$replace === void 0 ? false : _ref6$replace;

        return (replace ? history.replace : history.push)("/team/".concat(team.type, "/").concat(team.id, "/artists"));
      },
      setArtistSocialValidationPageUrlParams: function setArtistSocialValidationPageUrlParams(requestId, artistId) {
        var _ref7 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            _ref7$replace = _ref7.replace,
            replace = _ref7$replace === void 0 ? true : _ref7$replace;

        return (replace ? history.replace : history.push)("/team/access/artist/".concat(artistId, "/verify?caseId=").concat(requestId));
      },
      artistAccessRouteReset: function artistAccessRouteReset() {
        return history.replace('/team/access/artist');
      },
      showErrorBanner: function showErrorBanner(message) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
          id: 'team-error'
        };
        return banner.showError(message, options);
      },
      showSuccessBanner: function showSuccessBanner(message) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
          id: 'team-success'
        };
        return banner.showSuccess(message, options);
      },
      showWarningBanner: function showWarningBanner(message) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
          id: 'team-warning'
        };
        return banner.showWarning(message, options);
      },
      showInformationBanner: function showInformationBanner(message) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
          id: 'team-information'
        };
        return banner.showInfo(message, options);
      },
      hideBanner: function hideBanner(bannerId) {
        return banner.hide(bannerId);
      },
      trackEvent: function trackEvent(alohomoraEvent) {
        return tracker.trackEvent(alohomoraEvent);
      }
    };
    return taskDispatchers;
  }, [banner, dispatchers, history.push, history.replace, updateTaskStatus, tracker]);
};
export var useTeamTaskDispatchers = function useTeamTaskDispatchers(dispatchers) {
  var globalTaskDispatchers = useGlobalTaskDispatchers(dispatchers);
  var artistsTabTaskDispatchers = useArtistsTabTaskDispatchers(dispatchers, globalTaskDispatchers);
  var addTeamsTaskDispatchers = useAddTeamsTaskDispatchers(dispatchers, globalTaskDispatchers);
  var billingContactTaskDispatchers = useBillingContactTaskDispatchers(dispatchers, globalTaskDispatchers);
  var bulkInviteTaskDispatchers = useBulkInviteTaskDispatchers(dispatchers, globalTaskDispatchers);
  var onboardingTaskDispatchers = useOnboardingTaskDispatchers(dispatchers, globalTaskDispatchers);
  return useMemo(function () {
    return _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, artistsTabTaskDispatchers), addTeamsTaskDispatchers), billingContactTaskDispatchers), bulkInviteTaskDispatchers), onboardingTaskDispatchers), globalTaskDispatchers);
  }, [artistsTabTaskDispatchers, addTeamsTaskDispatchers, billingContactTaskDispatchers, bulkInviteTaskDispatchers, onboardingTaskDispatchers, globalTaskDispatchers]);
};
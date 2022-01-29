import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { JoinRequestStatusType, joinRequestToTeamMember } from '../../model/JoinRequest';
import { accessLevelName } from '../..';
import { approveJoinRequestApi } from '../../api/approveJoinRequestApi';
import { teamDetailsAndMembersLoader } from '../../api/teamDetailsAndMembersLoader';
var BANNER_ID = 'approve-join-request-task';
export var approveJoinRequestTask = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref, _ref2) {
    var joinRequest, team, t, optimisticallyCreateTeamMember, optimisticallyDeleteTeamMember, setJoinRequestStatus, optimisticallyCreateJoinRequest, optimisticallyDeleteJoinRequest, showErrorBanner, showSuccessBanner, showInformationBanner, trackEvent, setCurrentTeamDetails, setCurrentTeamMembers, accessLevelNameText, approvalMessage;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            joinRequest = _ref.joinRequest, team = _ref.team, t = _ref.t;
            optimisticallyCreateTeamMember = _ref2.optimisticallyCreateTeamMember, optimisticallyDeleteTeamMember = _ref2.optimisticallyDeleteTeamMember, setJoinRequestStatus = _ref2.setJoinRequestStatus, optimisticallyCreateJoinRequest = _ref2.optimisticallyCreateJoinRequest, optimisticallyDeleteJoinRequest = _ref2.optimisticallyDeleteJoinRequest, showErrorBanner = _ref2.showErrorBanner, showSuccessBanner = _ref2.showSuccessBanner, showInformationBanner = _ref2.showInformationBanner, trackEvent = _ref2.trackEvent, setCurrentTeamDetails = _ref2.setCurrentTeamDetails, setCurrentTeamMembers = _ref2.setCurrentTeamMembers;
            setJoinRequestStatus(joinRequest, JoinRequestStatusType.APPROVED);
            optimisticallyDeleteJoinRequest(joinRequest.id);
            optimisticallyCreateTeamMember(joinRequestToTeamMember(joinRequest));
            trackEvent({
              action_target: 'join-flow:approve-request-button',
              action_type: 'join-flow:click',
              action_intent: 'join-flow:approve-request',
              action_meta_str_1: "access-level:".concat(joinRequest.accessLevel)
            });
            accessLevelNameText = accessLevelName(joinRequest.accessLevel, t);
            approvalMessage = accessLevelNameText === 'Reader' ? t('JOIN_REQUEST_APPROVAL_MESSAGE_READER_ACCESS', '{teamMemberName} is now a {accessLevelNameText} on {teamName}.', 'This team member now has Reader level access on this team.', {
              teamMemberName: joinRequest.fullName,
              accessLevelNameText: accessLevelNameText,
              teamName: team.name
            }) : t('JOIN_REQUEST_APPROVAL_MESSAGE_ADMIN_OR_EDITOR_ACCESS', '{teamMemberName} is now an {accessLevelNameText} on {teamName}.', 'This team member now has Editor or Admin level access on this team.', {
              teamMemberName: joinRequest.fullName,
              accessLevelNameText: accessLevelNameText,
              teamName: team.name
            });
            _context.prev = 8;
            showInformationBanner("Approving ".concat(joinRequest.fullName, "..."), {
              id: BANNER_ID,
              showDismissButton: false
            });
            _context.next = 12;
            return approveJoinRequestApi(joinRequest, team);

          case 12:
            showSuccessBanner(approvalMessage, {
              id: BANNER_ID
            });
            _context.next = 20;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](8);
            showErrorBanner(t('JOIN_REQUEST_GENERIC_ERROR_MESSAGE', 'Something went wrong.', 'Something went wrong.'), {
              id: BANNER_ID
            });
            optimisticallyDeleteTeamMember(joinRequest.id);
            optimisticallyCreateJoinRequest(joinRequest);

          case 20:
            teamDetailsAndMembersLoader.clear({
              teamUri: team.uri
            });
            teamDetailsAndMembersLoader.load({
              teamUri: team.uri
            }).then(function (result) {
              var teamMemberCount = result.members.filter(function (tm) {
                return tm.status === 'active';
              }).length;
              setCurrentTeamMembers(result.members, teamMemberCount);
              setCurrentTeamDetails(result);
            });

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 15]]);
  }));

  return function approveJoinRequestTask(_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();
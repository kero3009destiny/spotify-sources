import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import PromisePool from 'es6-promise-pool';
import { BulkInviteStage } from '../BulkInviteState';
import { groupInvitesBySendableStatus } from '../../util/groupInvitesBySendableStatus';
import { sendInvite } from '../../../lib/api/sendInvite';
import { teamDetailsAndMembersLoader } from '../../../lib/api/teamDetailsAndMembersLoader';
import { bulkInvite } from '../../../lib/events';
var CONCURRENT_SENDS = 2;
var idCounter = 0;
export var sendInvitesTask = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(invites, team, positionForAnalytics, t, _ref) {
    var setStage, sendingInvite, sentInvite, finishedSending, errorSendingInvite, optimisticallyCreateTeamMember, trackEvent, send, invitesByStatus, sendableInvites, position, pool, resultSummary, startTime;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            setStage = _ref.setStage, sendingInvite = _ref.sendingInvite, sentInvite = _ref.sentInvite, finishedSending = _ref.finishedSending, errorSendingInvite = _ref.errorSendingInvite, optimisticallyCreateTeamMember = _ref.optimisticallyCreateTeamMember, trackEvent = _ref.trackEvent;

            send = /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(invite) {
                var tempId, tempTeamMember;
                return _regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        sendingInvite(invite.id);
                        _context.prev = 1;
                        _context.next = 4;
                        return sendInvite(team, invite.details);

                      case 4:
                        sentInvite(invite.id);
                        teamDetailsAndMembersLoader.clear({
                          teamUri: team.uri
                        });
                        tempId = "temp-bulk-invite-".concat(idCounter++);
                        tempTeamMember = _objectSpread({
                          status: 'invited',
                          inviteUuid: tempId,
                          id: tempId
                        }, invite.details);
                        optimisticallyCreateTeamMember(tempTeamMember);
                        return _context.abrupt("return", 'success');

                      case 12:
                        _context.prev = 12;
                        _context.t0 = _context["catch"](1);
                        errorSendingInvite(invite.id, t('BULK_INVITE_SEND_INVITE_ERROR_MESSAGE', 'Something went wrong. Try sending again.', 'Something went wrong sending the invites. Please try again.'));
                        return _context.abrupt("return", 'error');

                      case 16:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[1, 12]]);
              }));

              return function send(_x6) {
                return _ref3.apply(this, arguments);
              };
            }();

            invitesByStatus = groupInvitesBySendableStatus(invites);
            sendableInvites = invitesByStatus.sendable;
            setStage(BulkInviteStage.Sending);
            trackEvent(bulkInvite.sendInvites(positionForAnalytics, invitesByStatus.sendable.length, invitesByStatus.error.length));
            position = 0;
            pool = new PromisePool(function () {
              if (position === sendableInvites.length) {
                return undefined;
              }

              var invite = sendableInvites[position++];
              return send(invite);
            }, CONCURRENT_SENDS);
            resultSummary = {
              success: 0,
              error: 0
            };
            pool.addEventListener('fulfilled', // "e" is mistyped as Event in provided type (without data prop)
            function (e) {
              return resultSummary[e.data.result || 'error']++;
            });
            startTime = Date.now();
            _context2.next = 13;
            return pool.start();

          case 13:
            trackEvent(bulkInvite.sentInvites(resultSummary.success, resultSummary.error, Date.now() - startTime));
            finishedSending();

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function sendInvitesTask(_x, _x2, _x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
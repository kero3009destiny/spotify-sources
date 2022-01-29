import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { ArtistAccessFlowStep, LabelAccessFlowStep } from '../models';
import { ONBOARDING_API } from '../../../../../shared/lib/api';
import { WebgateFetchError, webgateFetchWithError } from '../../../lib/util/webgateFetchJsonWithError';
export var canCreateAccessRequestTask = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(organizationUri, isArtist, errorMessages, _ref) {
    var goToArtistAccessFlowStep, goToLabelAccessFlowStep, showErrorBanner, trackEvent, trackingString;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            goToArtistAccessFlowStep = _ref.goToArtistAccessFlowStep, goToLabelAccessFlowStep = _ref.goToLabelAccessFlowStep, showErrorBanner = _ref.showErrorBanner, trackEvent = _ref.trackEvent;
            trackingString = isArtist ? 'label-onboarding' : 'artist-access';
            webgateFetchWithError("".concat(ONBOARDING_API, "/v0/access/team/").concat(organizationUri, "/canRequestAccess"), {
              method: 'GET'
            }).then(function () {
              isArtist ? goToArtistAccessFlowStep(ArtistAccessFlowStep.SPEEDBUMP) : goToLabelAccessFlowStep(LabelAccessFlowStep.SPEEDBUMP);
            }).catch(function (e) {
              if (!(e instanceof WebgateFetchError)) {
                throw e;
              }

              var serverErrorBody = e.body;

              if (serverErrorBody === 'already-team-member') {
                showErrorBanner(errorMessages.alreadyOnTeam, {
                  compact: true
                });
                trackEvent({
                  action_target: "".concat(trackingString, ":find-artist-input"),
                  action_type: "".concat(trackingString, ":click"),
                  action_intent: "".concat(trackingString, ":already-team-member-error"),
                  action_meta_str_1: 'already-team-member'
                });
              } else if (serverErrorBody === 'request-already-pending') {
                showErrorBanner(errorMessages.pendingRequest, {
                  compact: true
                });
                trackEvent({
                  action_target: "".concat(trackingString, ":find-artist-input"),
                  action_type: "".concat(trackingString, ":click"),
                  action_intent: "".concat(trackingString, ":request-already-pending-error"),
                  action_meta_str_1: 'request-already-pending'
                });
              } else if (serverErrorBody === 'org-invite-only') {
                showErrorBanner(errorMessages.inviteOnly, {
                  compact: true
                });
                trackEvent({
                  action_target: "".concat(trackingString, ":find-artist-input"),
                  action_type: "".concat(trackingString, ":click"),
                  action_intent: "".concat(trackingString, ":org-invite-only-error"),
                  action_meta_str_1: 'org-invite-only'
                });
              } else {
                showErrorBanner(errorMessages.genericError, {
                  compact: true
                });
              }
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function canCreateAccessRequestTask(_x, _x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
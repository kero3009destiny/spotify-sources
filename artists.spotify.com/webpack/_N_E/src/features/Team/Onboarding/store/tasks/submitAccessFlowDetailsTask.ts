import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { ArtistAccessFlowStep, CodeVerificationStatus, LabelAccessFlowStep } from '../models';
import { submitRequest } from '../api/submitRequest';
var BANNER_ID = 'submit-label-onboarding-flow-details';
export var submitAccessFlowDetailsTask = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref, _ref2) {
    var details, isCreatingNewTeam, isArtist, t, isApp, goToLabelAccessFlowStep, goToArtistAccessFlowStep, trackEvent, setLabelAccessFlowCodeVerificationStatus, setArtistAccessFlowCodeVerificationStatus, showErrorBanner, hideBanner, actionTarget, trackingString, setVerificationStatus, res;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            details = _ref.details, isCreatingNewTeam = _ref.isCreatingNewTeam, isArtist = _ref.isArtist, t = _ref.t, isApp = _ref.isApp;
            goToLabelAccessFlowStep = _ref2.goToLabelAccessFlowStep, goToArtistAccessFlowStep = _ref2.goToArtistAccessFlowStep, trackEvent = _ref2.trackEvent, setLabelAccessFlowCodeVerificationStatus = _ref2.setLabelAccessFlowCodeVerificationStatus, setArtistAccessFlowCodeVerificationStatus = _ref2.setArtistAccessFlowCodeVerificationStatus, showErrorBanner = _ref2.showErrorBanner, hideBanner = _ref2.hideBanner;
            // if the user is creating a new team, they're coming from the add content page
            // if not, they're coming from the join team form
            actionTarget = isCreatingNewTeam ? 'add-content-page-submit-button' : 'join-team-page-submit-button';
            trackingString = isArtist ? 'label-onboarding' : 'artist-access';
            setVerificationStatus = isArtist ? setArtistAccessFlowCodeVerificationStatus : setLabelAccessFlowCodeVerificationStatus;
            hideBanner(BANNER_ID);
            trackEvent({
              action_target: "".concat(trackingString, ":").concat(actionTarget),
              action_type: "".concat(trackingString, ":click"),
              action_intent: "".concat(trackingString, ":submit-request"),
              action_meta_str_1: isCreatingNewTeam ? 'create-team' : 'join-team',
              action_meta_str_2: isApp ? 'mobile-app' : 'web'
            });
            _context.next = 9;
            return submitRequest(details, isCreatingNewTeam);

          case 9:
            res = _context.sent;

            if (res.ok) {
              _context.next = 13;
              break;
            }

            if (res.status === 410) {
              setVerificationStatus(CodeVerificationStatus.timeout);
            } else if (res.status === 409) {
              showErrorBanner(t('ONBOARDING_PENDING_REQUEST_ERROR', 'You have a pending request to join this team.', 'You already have a pending request to join this team.'), {
                id: BANNER_ID,
                compact: true
              });
            } else {
              showErrorBanner(t('CAN_CREATE_ACCESS_REQUEST_GENERIC_ERROR', 'Something went wrong', 'Something went wrong'), {
                id: BANNER_ID,
                compact: true
              });
            }

            return _context.abrupt("return");

          case 13:
            isArtist ? goToArtistAccessFlowStep(ArtistAccessFlowStep.DETAILS_CONFIRMATION) : goToLabelAccessFlowStep(LabelAccessFlowStep.DETAILS_CONFIRMATION);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function submitAccessFlowDetailsTask(_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();
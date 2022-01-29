import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { CodeVerificationStatus } from '../models';
import { verifyCode } from '../api/verifyCode';
export var verifyCodeLabelAccessFlowEmailTask = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(businessEmail, token, nextStep) {
    var isArtist,
        _ref2,
        setLabelAccessFlowCodeVerificationStatus,
        setArtistAccessFlowCodeVerificationStatus,
        goToLabelAccessFlowStep,
        goToArtistAccessFlowStep,
        trackEvent,
        setVerificationStatus,
        trackingString,
        response,
        _args = arguments;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isArtist = _args.length > 3 && _args[3] !== undefined ? _args[3] : false;
            _ref2 = _args.length > 4 ? _args[4] : undefined, setLabelAccessFlowCodeVerificationStatus = _ref2.setLabelAccessFlowCodeVerificationStatus, setArtistAccessFlowCodeVerificationStatus = _ref2.setArtistAccessFlowCodeVerificationStatus, goToLabelAccessFlowStep = _ref2.goToLabelAccessFlowStep, goToArtistAccessFlowStep = _ref2.goToArtistAccessFlowStep, trackEvent = _ref2.trackEvent;
            setVerificationStatus = isArtist ? setArtistAccessFlowCodeVerificationStatus : setLabelAccessFlowCodeVerificationStatus;
            trackingString = isArtist ? 'label-onboarding' : 'artist-access';

            if (token.match(/^\d*$/)) {
              _context.next = 7;
              break;
            }

            setVerificationStatus(CodeVerificationStatus.malformed);
            return _context.abrupt("return");

          case 7:
            if (!(token.length !== 6)) {
              _context.next = 10;
              break;
            }

            setVerificationStatus(CodeVerificationStatus.incorrectLength);
            return _context.abrupt("return");

          case 10:
            _context.next = 12;
            return verifyCode(token, businessEmail);

          case 12:
            response = _context.sent;
            setVerificationStatus(response);

            if (response === CodeVerificationStatus.success) {
              trackEvent({
                action_target: "".concat(trackingString, ":email-confirmation-code-entered"),
                action_type: "".concat(trackingString, ":on-change"),
                action_intent: "".concat(trackingString, ":enter-email-validation-code"),
                action_meta_str_1: 'completed-email-validation'
              });
              isArtist ? goToArtistAccessFlowStep(nextStep) : goToLabelAccessFlowStep(nextStep);
            }

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function verifyCodeLabelAccessFlowEmailTask(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
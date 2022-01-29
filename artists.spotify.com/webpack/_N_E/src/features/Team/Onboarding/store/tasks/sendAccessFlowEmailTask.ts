import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { webgateFetch } from '@mrkt/features/webgate-fetch';
import { logError } from '@mrkt/features/Platform';
import { ArtistAccessFlowStep, LabelAccessFlowStep } from '../models';
import { ONBOARDING_API } from '../../../../../shared/lib/api';
import { mapAcceptLanguage } from '@mrkt/features/i18n/hooks/useAcceptLanguage';
export var sendAccessFlowEmailTask = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(businessEmail, isArtist, locale, _ref) {
    var goToLabelAccessFlowStep, goToArtistAccessFlowStep, trackEvent, trackingString;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            goToLabelAccessFlowStep = _ref.goToLabelAccessFlowStep, goToArtistAccessFlowStep = _ref.goToArtistAccessFlowStep, trackEvent = _ref.trackEvent;
            trackingString = isArtist ? 'label-onboarding' : 'artist-access';
            _context.prev = 2;
            webgateFetch("".concat(ONBOARDING_API, "/v0/verifyEmail/").concat(businessEmail), {
              method: 'POST',
              headers: {
                'accept-language': mapAcceptLanguage(locale)
              }
            }).then(function (response) {
              if (response.status === 200) {
                trackEvent({
                  action_target: "".concat(trackingString, ":email-validation-next-button"),
                  action_type: "".concat(trackingString, ":click"),
                  action_intent: "".concat(trackingString, ":enter-email-validation-flow"),
                  action_meta_str_1: 'entered-email'
                });
                isArtist ? goToArtistAccessFlowStep(ArtistAccessFlowStep.CONFIRM_EMAIL) : goToLabelAccessFlowStep(LabelAccessFlowStep.CONFIRM_EMAIL);
              }

              return false;
            });
            _context.next = 10;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](2);
            logError(_context.t0);
            return _context.abrupt("return", false);

          case 10:
            return _context.abrupt("return", true);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 6]]);
  }));

  return function sendAccessFlowEmailTask(_x, _x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { ArtistAccessFlowStep } from '../models';
import { webgateFetchJson } from '@mrkt/features/webgate-fetch';
import { ONBOARDING_API } from '../../../../../shared/lib/api';
import { toFullName } from '../../../lib';
import { storeToken } from '../util/stateStorage';
export var createAccessCaseTask = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(details, _ref) {
    var setArtistAccessFlowDetails, goToArtistAccessFlowStep, setArtistSocialValidationPageUrlParams, selectedArtist, firstName, lastName, businessEmail, captcha, company, token, body, requestId;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            setArtistAccessFlowDetails = _ref.setArtistAccessFlowDetails, goToArtistAccessFlowStep = _ref.goToArtistAccessFlowStep, setArtistSocialValidationPageUrlParams = _ref.setArtistSocialValidationPageUrlParams;
            selectedArtist = details.selectedArtist, firstName = details.firstName, lastName = details.lastName, businessEmail = details.businessEmail, captcha = details.captcha, company = details.company, token = details.token;
            body = {
              role: details.role,
              fullName: "".concat(toFullName(firstName, lastName)),
              company: company,
              notificationEmail: businessEmail,
              captcha: captcha || '',
              artistUris: ["".concat(selectedArtist === null || selectedArtist === void 0 ? void 0 : selectedArtist.uri)],
              sourceUrl: ''
            };
            _context.next = 5;
            return webgateFetchJson("".concat(ONBOARDING_API, "/v1/access/request?emailVerificationCode=").concat(token, "&businessEmail=").concat(encodeURIComponent(businessEmail)), {
              method: 'POST',
              body: JSON.stringify(body)
            });

          case 5:
            requestId = _context.sent;
            setArtistAccessFlowDetails(requestId);
            storeToken(token);
            setArtistSocialValidationPageUrlParams(requestId.requestId, selectedArtist.id);
            goToArtistAccessFlowStep(ArtistAccessFlowStep.SOCIAL_VERIFICATION);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createAccessCaseTask(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();
import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { ArtistAccessFlowStep, CodeVerificationStatus } from '../models';
import { submitArtistClaim } from '../api/submitArtistClaim';
import { updateArtistClaim } from '../api/updateArtistClaim';
var ERROR_BANNER_ID = 'artist-access-submit-error-banner';
export var submitArtistClaimTask = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref, _ref2) {
    var details, errorMessage, isApp, goToArtistAccessFlowStep, showErrorBanner, trackEvent, setArtistAccessFlowCodeVerificationStatus, requestId, businessEmail, companyWebsiteUrl, selectedArtist, token, trackClick, showError, body;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            details = _ref.details, errorMessage = _ref.errorMessage, isApp = _ref.isApp;
            goToArtistAccessFlowStep = _ref2.goToArtistAccessFlowStep, showErrorBanner = _ref2.showErrorBanner, trackEvent = _ref2.trackEvent, setArtistAccessFlowCodeVerificationStatus = _ref2.setArtistAccessFlowCodeVerificationStatus;
            requestId = details.requestId, businessEmail = details.businessEmail, companyWebsiteUrl = details.companyWebsiteUrl, selectedArtist = details.selectedArtist, token = details.token;

            trackClick = function trackClick() {
              return trackEvent({
                action_target: 'artist-access:social-verification-page-submit-button',
                action_type: 'artist-access:click',
                action_intent: 'artist-access:submit-artist-claim-request',
                action_meta_str_1: 'artist-claim',
                action_meta_str_2: isApp ? 'mobile-app' : 'web'
              });
            };

            showError = function showError(errorCode) {
              if (errorCode === 410) {
                setArtistAccessFlowCodeVerificationStatus(CodeVerificationStatus.timeout);
              } else {
                showErrorBanner(errorMessage, {
                  id: ERROR_BANNER_ID,
                  compact: true
                });
              }
            };

            body = {
              artistToAdditionalInfo: _defineProperty({}, "".concat(selectedArtist === null || selectedArtist === void 0 ? void 0 : selectedArtist.uri), details.companyWebsiteUrl)
            };

            if (!(companyWebsiteUrl !== '')) {
              _context.next = 9;
              break;
            }

            updateArtistClaim(requestId, body, businessEmail, token).then(function () {
              submitArtistClaim(requestId, businessEmail, token).then(function () {
                trackClick();
                goToArtistAccessFlowStep(ArtistAccessFlowStep.DETAILS_CONFIRMATION);
              }).catch(function (e) {
                showError(e.status);
              });
            }).catch(function (e) {
              showError(e.status);
            });
            return _context.abrupt("return");

          case 9:
            submitArtistClaim(requestId, businessEmail, token).then(function () {
              trackClick();
              goToArtistAccessFlowStep(ArtistAccessFlowStep.DETAILS_CONFIRMATION);
            }).catch(function (e) {
              showError(e.status);
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function submitArtistClaimTask(_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();
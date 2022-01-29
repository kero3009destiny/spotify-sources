import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { claimedArtistLoader } from '../api/claimedArtistLoader';
import { ArtistAccessFlowStep } from '../models';
import { ONBOARDING_API } from '../../../../../shared/lib/api';
import { WebgateFetchError, webgateFetchWithError } from '../../../lib/util/webgateFetchJsonWithError';
var ERROR_BANNER_ID = 'select-artist-error-banner';
export var selectArtistAccessFlowArtistTask = function selectArtistAccessFlowArtistTask(artistId, locale, errorMessages, _ref) {
  var setArtistAccessFlowDetails = _ref.setArtistAccessFlowDetails,
      goToArtistAccessFlowStep = _ref.goToArtistAccessFlowStep,
      showErrorBanner = _ref.showErrorBanner;
  return Promise.all([claimedArtistLoader.load({
    id: artistId,
    locale: locale
  }), canCreateAccessRequest(artistId, showErrorBanner, errorMessages)]).then(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        claimedArtist = _ref3[0],
        canCreate = _ref3[1];

    var isClaimed = claimedArtist === null || claimedArtist === void 0 ? void 0 : claimedArtist.isClaimed;
    var instantAccess = !isClaimed && !!(claimedArtist !== null && claimedArtist !== void 0 && claimedArtist.distributor);

    if (canCreate && (isClaimed || instantAccess)) {
      // This user can create an access request, but the artist is claimed or uses the instant access flow
      setArtistAccessFlowDetails({
        selectedArtist: claimedArtist
      });
      goToArtistAccessFlowStep(ArtistAccessFlowStep.SPEEDBUMP);
    } else if (canCreate && claimedArtist) {
      // this user can create an access request for the selected artist
      setArtistAccessFlowDetails({
        selectedArtist: claimedArtist
      });
      goToArtistAccessFlowStep(ArtistAccessFlowStep.ENTER_EMAIL);
    } else if (!canCreate && claimedArtist) {
      // this user cannot create an access request for the selected artist
      setArtistAccessFlowDetails({
        selectedArtist: null
      });
    } else {
      // the selected artist was invalid/something weird happened
      setArtistAccessFlowDetails({
        selectedArtist: null
      });
      goToArtistAccessFlowStep(ArtistAccessFlowStep.VERIFY_ACCOUNT);
    }
  });
};

var canCreateAccessRequest = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(artistId, showErrorBanner, errorMessages) {
    var artistUri;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (artistId) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", false);

          case 2:
            artistUri = "spotify:artist:".concat(artistId);
            return _context.abrupt("return", webgateFetchWithError("".concat(ONBOARDING_API, "/v0/access/team/").concat(artistUri, "/canRequestAccess"), {
              method: 'GET'
            }).then(function () {
              return true;
            }).catch(function (e) {
              if (!(e instanceof WebgateFetchError)) {
                throw e;
              }

              var serverErrorBody = e.body;

              if (serverErrorBody === 'already-team-member') {
                showErrorBanner(errorMessages.alreadyOnTeam, {
                  id: ERROR_BANNER_ID,
                  compact: true
                });
              } else if (serverErrorBody === 'request-already-pending') {
                showErrorBanner(errorMessages.pendingRequest, {
                  id: ERROR_BANNER_ID,
                  compact: true
                });
              } else if (serverErrorBody === 'org-invite-only') {
                showErrorBanner(errorMessages.inviteOnly, {
                  id: ERROR_BANNER_ID,
                  compact: true
                });
              } else {
                showErrorBanner(errorMessages.genericError, {
                  id: ERROR_BANNER_ID,
                  compact: true
                });
              }

              return false;
            }));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function canCreateAccessRequest(_x, _x2, _x3) {
    return _ref4.apply(this, arguments);
  };
}();
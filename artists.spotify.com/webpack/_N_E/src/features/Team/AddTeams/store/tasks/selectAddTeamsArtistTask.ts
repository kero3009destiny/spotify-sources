import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { ONBOARDING_API } from '../../../../../shared/lib/api';
import { WebgateFetchError, webgateFetchWithError } from '../../../lib/util/webgateFetchJsonWithError';
import { claimedArtistLoader } from '../../../Onboarding/store/api/claimedArtistLoader';
import { createClaimRequestId } from '../api/createClaimRequestId';
import { storeArtistInfo } from '../../utils/stateStorage';
export var selectAddTeamsArtistTask = function selectAddTeamsArtistTask(artistId, history, queryParams, _ref) {
  var setAddTeamsFlowDetails = _ref.setAddTeamsFlowDetails,
      setCanRequestAccessError = _ref.setCanRequestAccessError,
      setRequestId = _ref.setRequestId;
  return Promise.all([claimedArtistLoader.load({
    id: artistId
  }), canCreateAccessRequest(artistId, setCanRequestAccessError)]).then(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        claimedArtist = _ref3[0],
        canCreate = _ref3[1];

    var isClaimed = claimedArtist === null || claimedArtist === void 0 ? void 0 : claimedArtist.isClaimed;

    if (canCreate && isClaimed) {
      // This user can create an access request, but the artist is claimed
      setAddTeamsFlowDetails({
        selectedTeam: claimedArtist
      });
      history.push("/add-team/join-request".concat(queryParams));
    } else if (canCreate && claimedArtist) {
      var _claimedArtist$images;

      // this user can create an access request for the selected artist
      createClaimRequestId(artistId, history, queryParams, setRequestId);
      storeArtistInfo({
        artistUri: claimedArtist.uri,
        artistName: claimedArtist.name,
        artistImageUrl: (_claimedArtist$images = claimedArtist.images[0]) === null || _claimedArtist$images === void 0 ? void 0 : _claimedArtist$images.url
      });
      setAddTeamsFlowDetails({
        selectedTeam: claimedArtist
      });
      history.push("/add-team/confirm".concat(queryParams));
    } else if (!canCreate && claimedArtist) {
      // this user cannot create an access request for the selected artist
      setAddTeamsFlowDetails({
        selectedTeam: null
      });
    } else {
      // the selected artist was invalid/something weird happened
      setAddTeamsFlowDetails({
        selectedTeam: null
      });
      history.push("/add-team".concat(queryParams));
    }
  });
};

var canCreateAccessRequest = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(artistId, setCanRequestAccessError) {
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
              setCanRequestAccessError(null);
              return true;
            }).catch(function (e) {
              if (!(e instanceof WebgateFetchError)) {
                throw e;
              }

              var serverErrorBody = e.body;

              if (serverErrorBody === 'already-team-member' || serverErrorBody === 'request-already-pending' || serverErrorBody === 'org-invite-only') {
                setCanRequestAccessError(serverErrorBody);
              } else {
                setCanRequestAccessError('unknown-error');
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

  return function canCreateAccessRequest(_x, _x2) {
    return _ref4.apply(this, arguments);
  };
}();
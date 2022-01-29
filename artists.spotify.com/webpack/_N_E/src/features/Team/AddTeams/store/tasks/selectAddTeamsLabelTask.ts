import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { ONBOARDING_API } from '../../../../../shared/lib/api';
import { WebgateFetchError, webgateFetchWithError } from '../../../lib/util/webgateFetchJsonWithError';
export var selectAddTeamsLabelTask = function selectAddTeamsLabelTask(selectedLabel, history, queryParams, _ref) {
  var setAddTeamsFlowDetails = _ref.setAddTeamsFlowDetails,
      setCanRequestAccessError = _ref.setCanRequestAccessError;
  var labelId = selectedLabel.uri.split(':')[2];
  return canCreateAccessRequest(labelId, setCanRequestAccessError).then(function (canCreate) {
    if (canCreate) {
      // This user can create an access request for this existing label team
      setAddTeamsFlowDetails({
        selectedTeam: selectedLabel
      });
      history.push("/add-team/join-request".concat(queryParams));
    } else if (!canCreate) {
      // this user cannot create an access request for the selected label team
      setAddTeamsFlowDetails({
        selectedTeam: null
      });
    } else {
      // the selected label was invalid/something weird happened
      setAddTeamsFlowDetails({
        selectedTeam: null
      });
      history.push("/add-team".concat(queryParams));
    }
  });
};

var canCreateAccessRequest = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(labelId, setCanRequestAccessError) {
    var labelUri;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (labelId) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", false);

          case 2:
            labelUri = "spotify:label:".concat(labelId);
            return _context.abrupt("return", webgateFetchWithError("".concat(ONBOARDING_API, "/v0/access/team/").concat(labelUri, "/canRequestAccess"), {
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
    return _ref2.apply(this, arguments);
  };
}();
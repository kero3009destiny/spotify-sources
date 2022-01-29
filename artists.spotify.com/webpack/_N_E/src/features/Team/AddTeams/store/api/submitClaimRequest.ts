import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { ONBOARDING_API } from '../../../../../shared/lib/api';
import { webgateFetchWithError } from '../../../lib/util/webgateFetchJsonWithError';
import { getStoredArtistInfo } from '../../utils/stateStorage';
export var submitClaimRequest = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(requestId, details) {
    var _getStoredArtistInfo, artistUri, body;

    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _getStoredArtistInfo = getStoredArtistInfo(), artistUri = _getStoredArtistInfo.artistUri;
            body = {
              role: details.role,
              artistToAdditionalInfo: _defineProperty({}, "".concat(artistUri), details.websiteLink || '')
            };
            return _context2.abrupt("return", webgateFetchWithError("".concat(ONBOARDING_API, "/v0/access/request/").concat(requestId, "/artists"), {
              method: 'PATCH',
              body: JSON.stringify(body)
            }).then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
              return _regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return webgateFetchWithError("".concat(ONBOARDING_API, "/v0/access/request/").concat(requestId, "/submit"), {
                        method: 'POST'
                      });

                    case 2:
                      return _context.abrupt("return", _context.sent);

                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }))));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function submitClaimRequest(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
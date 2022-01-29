import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { Logger } from '@mrkt/features/Platform';
import { webgateFetch } from '@mrkt/features/webgate-fetch';
import { useCurrentArtistIdOrNull } from '../../../artists';
import { fundraisingServiceUrl } from './constants';

function _put(_x, _x2, _x3) {
  return _put2.apply(this, arguments);
}

function _put2() {
  _put2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(link, providerOrOrg, artistId) {
    var endpoint;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            endpoint = "".concat(fundraisingServiceUrl, "/v1/artist/").concat(artistId);
            _context2.prev = 1;
            _context2.next = 4;
            return webgateFetch(endpoint, {
              body: JSON.stringify({
                link: link,
                provider: providerOrOrg
              }),
              method: 'put'
            });

          case 4:
            return _context2.abrupt("return", _context2.sent);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](1);
            Logger.logError('artist-fundraising-pick-put-error', _context2.t0);
            return _context2.abrupt("return", null);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 7]]);
  }));
  return _put2.apply(this, arguments);
}

export function usePut() {
  var artistId = useCurrentArtistIdOrNull();
  return /*#__PURE__*/function () {
    var _put3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(linkValue, providerOrOrgValue) {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!artistId) {
                _context.next = 4;
                break;
              }

              _context.next = 3;
              return _put(linkValue, providerOrOrgValue, artistId);

            case 3:
              return _context.abrupt("return", _context.sent);

            case 4:
              return _context.abrupt("return", null);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function put(_x4, _x5) {
      return _put3.apply(this, arguments);
    }

    return put;
  }();
}
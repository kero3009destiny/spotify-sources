import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.a145e465-b651-44f5-9906-e1b8a08e07b5/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.a145e465-b651-44f5-9906-e1b8a08e07b5/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { useEffect } from 'react';
import { webgateFetch, WEBGATE_DOMAIN } from '@mrkt/features/webgate-fetch';
import { createLoader, useRead } from '@spotify-internal/creator-data-loading';
import { useCurrentArtist } from '../../../features/artists';
export var EligibilityStatus;

(function (EligibilityStatus) {
  EligibilityStatus["ELIGIBLE"] = "ELIGIBLE";
  EligibilityStatus["INELIGIBLE"] = "INELIGIBLE";
  EligibilityStatus["PENDING"] = "PENDING";
  EligibilityStatus["UNKNOWN_STATUS"] = "UNKNOWN_STATUS";
})(EligibilityStatus || (EligibilityStatus = {}));

var UpcomingViewServiceLoader = createLoader( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(artistId) {
    var url, response, data;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = "".concat(WEBGATE_DOMAIN, "/upcoming-view-service/v1/artist/").concat(artistId, "/catalog");
            _context.prev = 1;
            _context.next = 4;
            return webgateFetch(url);

          case 4:
            response = _context.sent;

            if (!(response.status === 401 || response.status === 403)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", {
              status: 403
            });

          case 7:
            if (!(response.status === 204)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", {
              status: 204
            });

          case 9:
            if (!(response.status !== 200)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", {
              status: 500
            });

          case 11:
            _context.next = 13;
            return response.json();

          case 13:
            data = _context.sent;
            return _context.abrupt("return", {
              status: 200,
              payload: data
            });

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", {
              status: 500
            });

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 17]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
export function useUpcomingCatalog() {
  var artist = useCurrentArtist(); // bust the entire cache when a component that uses this hook unmounts.

  useEffect(function () {
    return function () {
      UpcomingViewServiceLoader.clearAll();
    };
  }, []);
  return useRead(UpcomingViewServiceLoader, artist.id);
}
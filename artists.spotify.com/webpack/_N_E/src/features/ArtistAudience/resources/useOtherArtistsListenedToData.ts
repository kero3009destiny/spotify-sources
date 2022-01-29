import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { useEffect } from 'react';
import { createLoader, useRead } from '@spotify-internal/creator-data-loading';
import { WEBAPI_DOMAIN, webapiFetch } from '../../../shared/lib/api';

function load(_x) {
  return _load.apply(this, arguments);
}

function _load() {
  _load = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(artistId) {
    var url, response, data;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = "".concat(WEBAPI_DOMAIN, "/v1/artists/").concat(artistId, "/related-artists");
            _context.prev = 1;
            _context.next = 4;
            return webapiFetch(url);

          case 4:
            response = _context.sent;
            _context.t0 = response.status;
            _context.next = _context.t0 === 200 ? 8 : _context.t0 === 204 ? 12 : _context.t0 === 400 ? 13 : _context.t0 === 401 ? 13 : _context.t0 === 403 ? 13 : _context.t0 === 404 ? 13 : 14;
            break;

          case 8:
            _context.next = 10;
            return response.json();

          case 10:
            data = _context.sent;
            return _context.abrupt("return", {
              status: 200,
              payload: data
            });

          case 12:
            return _context.abrupt("return", {
              status: 204
            });

          case 13:
            return _context.abrupt("return", {
              status: 403
            });

          case 14:
            return _context.abrupt("return", {
              status: response.status
            });

          case 15:
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t1 = _context["catch"](1);
            return _context.abrupt("return", _context.t1);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 17]]);
  }));
  return _load.apply(this, arguments);
}

var OtherArtistsListenedToLoader = createLoader(load, {
  cacheKeyFn: function cacheKeyFn(artistId) {
    return "".concat(artistId, ",");
  }
});
export function useOtherArtistsListenedToData(artistId) {
  useEffect(function () {
    return function cleanup() {
      OtherArtistsListenedToLoader.clear(artistId);
    };
  }, [artistId]);
  return useRead(OtherArtistsListenedToLoader, artistId);
}
import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import { createLoader } from '@spotify-internal/creator-data-loading';
import { webgateFetchJson } from '@mrkt/features/webgate-fetch';
import { ONBOARDING_API } from '../../../../../shared/lib/api';
import { mapAcceptLanguage } from '@mrkt/features/i18n/hooks/useAcceptLanguage';

function load(_x) {
  return _load.apply(this, arguments);
}

function _load() {
  _load = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(key) {
    var id, locale, artistData, claimedData;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = key.id, locale = key.locale;
            _context.prev = 1;

            if (id) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", null);

          case 4:
            _context.next = 6;
            return webgateFetchJson("https://api.spotify.com/v1/artists/".concat(id));

          case 6:
            artistData = _context.sent;
            _context.next = 9;
            return webgateFetchJson("".concat(ONBOARDING_API, "/v0/access/artist/").concat(id, "/claimed"), {
              headers: {
                'accept-language': mapAcceptLanguage(locale || 'en')
              }
            });

          case 9:
            claimedData = _context.sent;
            return _context.abrupt("return", _objectSpread(_objectSpread({}, artistData), claimedData));

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", null);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 13]]);
  }));
  return _load.apply(this, arguments);
}

export var claimedArtistLoader = createLoader(load);
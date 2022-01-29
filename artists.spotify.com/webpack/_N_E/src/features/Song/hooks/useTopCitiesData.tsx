import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import * as React from 'react';
import { createLoader, useRead } from '@spotify-internal/creator-data-loading';
import { useLocale } from '@mrkt/features/i18n/hooks/useLocale';
import { S4X_DATA_API, webgateFetch } from '../../../shared/lib/api';
import { useCurrentArtist } from '../../../features/artists';
import { mapAcceptLanguage } from '@mrkt/features/i18n/hooks/useAcceptLanguage';

function load(_x) {
  return _load.apply(this, arguments);
}

function _load() {
  _load = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref) {
    var artistId, locale, songId, url, response, data;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            artistId = _ref.artistId, locale = _ref.locale, songId = _ref.songId;
            url = "".concat(S4X_DATA_API, "/v2/artist/").concat(artistId, "/recording/").concat(songId, "/top-cities/streams?time-filter=28day&aggregation-level=recording");
            _context.prev = 2;
            _context.next = 5;
            return webgateFetch(url, {
              headers: {
                'Accept-Language': mapAcceptLanguage(locale || 'en')
              }
            });

          case 5:
            response = _context.sent;
            _context.t0 = response.status;
            _context.next = _context.t0 === 200 ? 9 : _context.t0 === 204 ? 13 : _context.t0 === 400 ? 14 : _context.t0 === 401 ? 14 : _context.t0 === 403 ? 14 : _context.t0 === 404 ? 14 : 15;
            break;

          case 9:
            _context.next = 11;
            return response.json();

          case 11:
            data = _context.sent;
            return _context.abrupt("return", {
              status: 200,
              payload: data
            });

          case 13:
            return _context.abrupt("return", {
              status: 204
            });

          case 14:
            return _context.abrupt("return", {
              status: 403
            });

          case 15:
            return _context.abrupt("return", {
              status: response.status
            });

          case 16:
            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t1 = _context["catch"](2);
            return _context.abrupt("return", _context.t1);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 18]]);
  }));
  return _load.apply(this, arguments);
}

var TopCitiesLoader = createLoader(load, {
  cacheKeyFn: function cacheKeyFn(props) {
    return "".concat(props.artistId, ",").concat(props.songId, ",").concat(props.locale);
  }
});
export function useTopCitiesData(songId) {
  var locale = useLocale();
  var artist = useCurrentArtist();
  var artistId = artist.id;
  React.useEffect(function () {
    return function cleanup() {
      TopCitiesLoader.clear({
        artistId: artistId,
        locale: locale,
        songId: songId
      });
    };
  }, [artistId, locale, songId]);
  return useRead(TopCitiesLoader, {
    artistId: artistId,
    locale: locale,
    songId: songId
  });
}
import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { useEffect } from 'react';
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
    var artistId, locale, countryCode, isoCountryCode, url, response, data;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            artistId = _ref.artistId, locale = _ref.locale, countryCode = _ref.countryCode;
            isoCountryCode = countryCode && countryCode !== 'worldwide' ? "&country=".concat(countryCode) : '';
            url = "".concat(S4X_DATA_API, "/v2/artist/").concat(artistId, "/audience/top-cities?time-filter=28day&aggregation-level=recording").concat(isoCountryCode);
            _context.prev = 3;
            _context.next = 6;
            return webgateFetch(url, {
              headers: {
                'Accept-Language': mapAcceptLanguage(locale || 'en')
              }
            });

          case 6:
            response = _context.sent;
            _context.t0 = response.status;
            _context.next = _context.t0 === 200 ? 10 : 14;
            break;

          case 10:
            _context.next = 12;
            return response.json();

          case 12:
            data = _context.sent;
            return _context.abrupt("return", {
              status: 200,
              payload: data
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
            _context.t1 = _context["catch"](3);
            return _context.abrupt("return", _context.t1);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 17]]);
  }));
  return _load.apply(this, arguments);
}

var TopCitiesLoader = createLoader(load, {
  cacheKeyFn: function cacheKeyFn(props) {
    return "".concat(props.artistId, ",").concat(props.countryCode, ",").concat(props.locale);
  }
});
export function useTopCitiesData(country) {
  var locale = useLocale();
  var artist = useCurrentArtist();
  var artistId = artist.id;
  var countryCode = country.code;
  useEffect(function () {
    return function cleanup() {
      TopCitiesLoader.clear({
        artistId: artistId,
        countryCode: countryCode,
        locale: locale
      });
    };
  }, [artistId, countryCode, locale]);
  return useRead(TopCitiesLoader, {
    artistId: artistId,
    countryCode: countryCode,
    locale: locale
  });
}
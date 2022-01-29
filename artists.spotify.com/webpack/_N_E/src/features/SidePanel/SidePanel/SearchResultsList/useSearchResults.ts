import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import { useEffect, useState } from 'react';
import * as Sentry from '@sentry/browser';
import { webgateFetch, WEBGATE_DOMAIN } from '../../../../shared/lib/api';
import { createWebCommonEventFactory } from '@spotify-internal/ubi-sdk-s4a-web-common';
import { createUbiEventLogger } from '@mrkt/features/ubi';
import { useCurrentArtistIdOrNull } from '../../../artists';
export var useSearchResults = function useSearchResults(q) {
  var _useState = useState([]),
      results = _useState[0],
      setResults = _useState[1];

  var artistId = useCurrentArtistIdOrNull();
  var UBIEventLogger = createUbiEventLogger(artistId);
  useEffect(function () {
    if (!q) {
      setResults([]);
      return undefined;
    }

    var subscribed = true;
    var uri = window.location.href;
    var spec = createWebCommonEventFactory({
      data: {
        identifier: 's4a-side-panel-keystroke-search',
        uri: uri
      }
    });
    UBIEventLogger.logInteraction(spec.sideNavPanelFactory().searchBarFactory().textAreaFactory().keyStrokeSearch());
    getSearchResults(q).then(function (artists) {
      return subscribed && setResults(artists);
    });
    return function () {
      subscribed = false;
    };
  }, [q]);
  return results;
};

function getSearchResults(_x) {
  return _getSearchResults.apply(this, arguments);
}

function _getSearchResults() {
  _getSearchResults = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(q) {
    var response, json;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return webgateFetch("".concat(WEBGATE_DOMAIN, "/creator-search-service/v0/artists?q=").concat(encodeURIComponent(q)));

          case 3:
            response = _context.sent;

            if (response.ok) {
              _context.next = 6;
              break;
            }

            throw new Error("".concat(response.status, " ").concat(response.url));

          case 6:
            _context.next = 8;
            return response.json();

          case 8:
            json = _context.sent;
            return _context.abrupt("return", json.artists.map(function (artist) {
              return _objectSpread({
                id: artist.uri.split(':')[2]
              }, artist);
            }));

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            Sentry.captureException(_context.t0);
            return _context.abrupt("return", []);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));
  return _getSearchResults.apply(this, arguments);
}
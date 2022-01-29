import _defineProperty from "/var/jenkins_home/workspace/tingle.3b6a912d-4d0a-4635-8445-e49fdb128ace/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.3b6a912d-4d0a-4635-8445-e49fdb128ace/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.3b6a912d-4d0a-4635-8445-e49fdb128ace/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import 'whatwg-fetch';
import { accessTokenManager, defaultWebgateHeaders } from '@mrkt/features/webgate-fetch';
import { toJSON, verifyResponse, API } from './helpers';
export * from './constants_DEPRECATED';
export { accessTokenManager, webgateFetch, webgateFetchJson } from '@mrkt/features/webgate-fetch';

var mapResponse = function mapResponse(response) {
  return toJSON(verifyResponse(response));
}; // DO NOT USE THIS! USE webgateFetch instead!


export var webgate = new API({
  defaultHeaders: defaultWebgateHeaders,
  getAccessToken: accessTokenManager.get.bind(accessTokenManager),
  mapResponse: mapResponse
}); // DO NOT USE THIS! USE webgateFetch instead!

export var webapi = new API({
  baseUrl: 'https://api.spotify.com',
  getAccessToken: accessTokenManager.get.bind(accessTokenManager),
  mapResponse: mapResponse
});
/** @deprecated use webapi instead */

export var webapiAnonymous = webapi; // export legacy helpers

var request = webgate.request,
    get = webgate.get,
    post = webgate.post,
    put = webgate.put,
    patch = webgate.patch,
    del = webgate.delete;
export { request, get, post, put, patch, del };
export function webapiFetch(_x) {
  return _webapiFetch.apply(this, arguments);
}

function _webapiFetch() {
  _webapiFetch = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(url) {
    var options,
        token,
        _args = arguments;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            _context.next = 3;
            return accessTokenManager.get();

          case 3:
            token = _context.sent;
            return _context.abrupt("return", fetch(url, _objectSpread(_objectSpread({}, options), {}, {
              credentials: 'same-origin',
              headers: _objectSpread(_objectSpread({
                accept: 'application/json',
                'content-type': 'application/json'
              }, options.headers), {}, {
                authorization: "Bearer ".concat(token)
              })
            })));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _webapiFetch.apply(this, arguments);
}
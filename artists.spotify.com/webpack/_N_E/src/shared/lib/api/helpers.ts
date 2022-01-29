import _classCallCheck from "/var/jenkins_home/workspace/tingle.3b6a912d-4d0a-4635-8445-e49fdb128ace/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.3b6a912d-4d0a-4635-8445-e49fdb128ace/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.3b6a912d-4d0a-4635-8445-e49fdb128ace/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.3b6a912d-4d0a-4635-8445-e49fdb128ace/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.3b6a912d-4d0a-4635-8445-e49fdb128ace/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _wrapNativeSuper from "/var/jenkins_home/workspace/tingle.3b6a912d-4d0a-4635-8445-e49fdb128ace/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/wrapNativeSuper";
import _defineProperty from "/var/jenkins_home/workspace/tingle.3b6a912d-4d0a-4635-8445-e49fdb128ace/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// ignore-string-externalization

/* eslint-disable no-underscore-dangle */
export var ResponseError = /*#__PURE__*/function (_Error) {
  _inherits(ResponseError, _Error);

  var _super = _createSuper(ResponseError);

  function ResponseError(statusCode) {
    var _this;

    _classCallCheck(this, ResponseError);

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    // @ts-ignore
    _this = _super.call.apply(_super, [this, statusCode].concat(args));

    _defineProperty(_assertThisInitialized(_this), "statusCode", void 0);

    _this.name = 'ResponseError';
    _this.statusCode = statusCode;
    return _this;
  }

  return ResponseError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
export var verifyResponse = function verifyResponse(response) {
  if (response.ok) {
    return response;
  }

  throw new ResponseError(response.status);
};
export var toJSON = function toJSON(response // fetch-mock does not set a `content-type` header by default, otherwise we could parse based on that
) {
  return response.text().then(function (text) {
    try {
      return JSON.parse(text);
    } catch (e) {
      return text;
    }
  });
};
/**
 * API helper
 *
 * @module API
 * @param {Object} config A configuration object
 * @param {String} config.baseUrl The base URL for making requests, it will be prepended to the final URL parameter
 * @param {String} config.defaultHeaders A set of default headers that will be included with each request.
 * @param {Function} config.getAccessToken The function to call for getting an access token
 * @param {Function} config.mapResponse A function to process the `Response` object
 * @param {Function} config.getCacheKey A function that return a cache key based on the outgoing request (defaults to return the request's URI)
 * @returns {API} instance
 *
 * @example
 * // basic usage
 * const accessTokenManager = new AccessTokenManager({
 *   url: `https://generic.wg.spotify.com/creator-auth-proxy/v1/web/token?client_id=${CLIENT_ID}`,
 *   options: { credentials: 'include' },
 * });
 *
 * const api = new API({ getAccessToken: accessTokenManager.get });
 * await api.get('https://api.spotify.com/v1/me');
 *
 * @example
 * // advanced usage
 * const api = new API({
 *   baseUrl: 'https://api.spotify.com',
 *   defaultHeaders: { 'Spotify-App-Version': '1.0.0', 'App-Platform': 'Browser' },
 *   getAccessToken: async () => 'some-access-token',
 *   mapResponse: () => console.log,
 * });
 * await api.get('/v1/me');
 */

export var API = function API() {
  var _this2 = this;

  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$baseUrl = _ref.baseUrl,
      baseUrl = _ref$baseUrl === void 0 ? '' : _ref$baseUrl,
      _ref$defaultHeaders = _ref.defaultHeaders,
      defaultHeaders = _ref$defaultHeaders === void 0 ? {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  } : _ref$defaultHeaders,
      _ref$getAccessToken = _ref.getAccessToken,
      getAccessToken = _ref$getAccessToken === void 0 ? function () {
    return Promise.resolve();
  } : _ref$getAccessToken,
      _ref$mapResponse = _ref.mapResponse,
      mapResponse = _ref$mapResponse === void 0 ? function (response) {
    return response;
  } : _ref$mapResponse,
      _ref$getCacheKey = _ref.getCacheKey,
      getCacheKey = _ref$getCacheKey === void 0 ? function (requestConfig) {
    return requestConfig.url;
  } : _ref$getCacheKey;

  _classCallCheck(this, API);

  _defineProperty(this, "_baseUrl", void 0);

  _defineProperty(this, "_defaultHeaders", void 0);

  _defineProperty(this, "_getAccessToken", void 0);

  _defineProperty(this, "_getCache", void 0);

  _defineProperty(this, "_getCacheKey", void 0);

  _defineProperty(this, "_mapResponse", void 0);

  _defineProperty(this, "request", function (url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _this2._getAccessToken().then(function (token) {
      var tokenHeaders = {};

      if (token) {
        tokenHeaders.Authorization = "Bearer ".concat(token);
      }

      var headers = new Headers(_objectSpread(_objectSpread(_objectSpread({}, _this2._defaultHeaders), tokenHeaders), options.headers));
      var isContentTypeJSON = headers.get('Content-Type') === 'application/json';
      var body = typeof options.body === 'object' && isContentTypeJSON ? JSON.stringify(options.body) : options.body;
      return {
        url: _this2._baseUrl + url,
        options: _objectSpread(_objectSpread({}, options), {}, {
          headers: headers,
          body: body
        })
      };
    }).then(function (requestConfig) {
      if (requestConfig.options.method === 'GET') {
        var cacheKey = _this2._getCacheKey(requestConfig);

        if (!_this2._getCache.has(cacheKey)) {
          var promise = fetch(requestConfig.url, requestConfig.options).then(function (response) {
            return response.text().then(function (data) {
              return {
                data: data,
                response: response
              };
            });
          }).catch(function (error) {
            _this2._getCache.delete(cacheKey);

            throw error;
          }).then(function (payload) {
            _this2._getCache.delete(cacheKey);

            return payload;
          });

          _this2._getCache.set(cacheKey, promise);
        }

        return _this2._getCache.get(cacheKey) // if data is empty then we use null for body.
        // @see https://ghe.spotify.net/creator/web-shared/issues/4
        .then(function (_ref2) {
          var data = _ref2.data,
              response = _ref2.response;
          return new Response(data || null, response);
        });
      }

      return fetch(requestConfig.url, requestConfig.options);
    }).catch(function (error) {
      // thanks for nothing Microsoft Edge...
      // @see https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8653298/
      if (error instanceof window.DOMException && error.code === 17) {
        return new Response(null, {
          status: 401
        });
      }

      throw error;
    }).then(_this2._mapResponse);
  });

  _defineProperty(this, "get", function (url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _this2.request(url, _objectSpread(_objectSpread({}, options), {}, {
      method: 'GET'
    }));
  });

  _defineProperty(this, "post", function (url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _this2.request(url, _objectSpread(_objectSpread({}, options), {}, {
      method: 'POST'
    }));
  });

  _defineProperty(this, "patch", function (url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _this2.request(url, _objectSpread(_objectSpread({}, options), {}, {
      method: 'PATCH'
    }));
  });

  _defineProperty(this, "put", function (url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _this2.request(url, _objectSpread(_objectSpread({}, options), {}, {
      method: 'PUT'
    }));
  });

  _defineProperty(this, "delete", function (url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _this2.request(url, _objectSpread(_objectSpread({}, options), {}, {
      method: 'DELETE'
    }));
  });

  this._baseUrl = baseUrl;
  this._defaultHeaders = defaultHeaders;
  this._getAccessToken = getAccessToken;
  this._mapResponse = mapResponse;
  this._getCacheKey = getCacheKey;
  this._getCache = new Map();
}
/**
 * Main method for performing `fetch` requests
 * @param {String} url The URL for the request
 * @param {Object} [options] Options for the `fetch` API
 * @return {Promise} `fetch` response
 */
;
import _defineProperty from "/var/jenkins_home/workspace/tingle.3b6a912d-4d0a-4635-8445-e49fdb128ace/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
// ignore-string-externalization
import localStorageFallback from 'local-storage-fallback';
import { setupTracer, createTracedFetch, Tags, FetchHelpers, BrowserHelpers, SpotifyHelpers } from '@spotify-internal/tracing-web';
import { getHash } from '@mrkt/features/env';
import { addOwnershipInfo } from './ownership';
export function initializeTracing(_ref) {
  var sessionId = _ref.sessionId;
  var isProduction = true;
  if (false) return; // It's safe to call this as many times, initialization internally only happens once.

  var tracer = setupTracer({
    dev: !isProduction,
    component_name: 'mrkt-web',
    nodejs_instrumentation: false,
    fetch_instrumentation: false,
    xhr_instrumentation: false,
    instrument_page_load: true,
    // false to prevent logging user tokens/sp_dc and accessible from the web UI!
    include_cookies: false,
    // 2: Log all errors to console
    // https://github.com/lightstep/lightstep-tracer-javascript#new-traceroptions
    verbosity: isProduction ? 0 : 2,
    default_span_tags: _defineProperty({
      // Ensure we get the session id with _everything_
      'session.id': sessionId
    }, Tags.NAVIGATOR_WEBDRIVER, navigator.webdriver)
  });
  window.fetch = createTracedFetch({
    fetch: window.fetch
  }, {
    tracer: tracer,
    shouldTrace: shouldTrace,
    beforeRequest: beforeRequest,
    afterResponse: afterResponse,
    extractOperation: extractOperation
  });
}
var enableCanary = !!localStorageFallback.getItem('CANARY_TRACE');
var NO_TRACE = String(Math.random());
export var shouldTrace = function shouldTrace(req) {
  var tracedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
  var tracedURLHosts = ['generic.wg.spotify.com', 'artist-identity-image.spotify.com', enableCanary ? 'artist-storylines-upload.spotify.com' : NO_TRACE, 'api.spotify.com', "".concat(window.location.host, "/api/graphql")];
  return tracedMethods.some(function (m) {
    return m === req.method;
  }) && tracedURLHosts.some(function (p) {
    return req.url.indexOf(p) > -1;
  });
};

var beforeRequest = function beforeRequest(span, req) {
  FetchHelpers.addDefaultRequestTags(span, req);
  SpotifyHelpers.addWebgateServiceNameTag(span, req);
  SpotifyHelpers.addServiceInfoTags(span, // We don't increment the version in package.json, so it's better to use the
  // hash as the version.
  getHash(), getHash());
  BrowserHelpers.addDefaultNavigatorTags(span, navigator);
  addOwnershipInfo(span, req);
};

var afterResponse = function afterResponse(span, res) {
  FetchHelpers.addDefaultResponseTags(span, res);
}; // Exported for test-only


export var extractOperation = function extractOperation(req) {
  var info = SpotifyHelpers.extractWebgateInfo(req);
  var hostname = FetchHelpers.extractHostname(req);
  if (info) return "fetch.".concat(info.service);
  if (hostname) return "fetch.".concat(hostname);
  return 'fetch';
};
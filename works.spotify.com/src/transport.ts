import { Backoff } from '@js-sdk/backoff';
import { Counter as BackoffCounter } from '@js-sdk/backoff/lib/counter';
import { logging } from '@js-sdk/debug-tools';
import { EventEmitter, } from '@spotify-internal/emitter';
import { TransportErrors } from './enums/errors';
import { Event } from './enums/event';
import { PluginEvent } from './enums/plugin_event';
import { InternalSocketCode } from './enums/internal_socket_code';
import { StatusCode } from './enums/status_code';
import { StatusFamily } from './enums/status_family';
import { TransportError } from './error/transport';
import { ConnectionObserver } from './_internal/connection_observer';
import { HTTPResponse } from './http/response';
import { HTTPRequest } from './http/request';
import { PublicTransport, } from './_internal/public_transport';
const debugLogger = logging.forTag('transport.transport');
/**
 * An expression for matching special URLs.
 *
 * @const
 * @private
 */
const HTTP_SPECIAL_URL_EXP = /^(?:https?:\/\/)?@([^\/]+)\//;
/**
 * An expression to check whether a WebSocket or HTTP URI requires an ending
 * slash.
 */
const ENDPOINT_REQUIRES_SLASH_EXP = /^(ws|http)s?:\/\/.*[^\/]$/;
/**
 * An expression to check whether if a string is a valid HTTP-date.
 *   accepted format:
 *       Fri, 31 Dec 1999 23:59:59 GMT
 */
const HTTP_DATE_EXP = /^([a-zA-Z]{3},\ \d{1,2}\ [a-zA-Z]{3}\ (\d{1,2}.){3})/;
/**
 * Threshold that needs to be reached before a dealer reconnection attempt will
 * be made.
 */
const RECONNECT_THRESHOLD = 5000;
/**
 * The default maximum retry value for a request
 */
const DEFAULT_RETRY_COUNT = 2;
/**
 * The matcher expression for the client logout message.
 */
const LOGOUT_MESSAGE_URI = 'client:logout';
/**
 * The default lifetime of an access token, in seconds.
 *
 * Note that the actual default lifetime of the token from Accounts is actually
 * 1 hour (3600 seconds), but we set the default token timeout to 59 minutes to
 * compensate for any transport costs from when the token was retrieved.
 */
const DEFAULT_TOKEN_TIMEOUT = 3540;
/**
 * A map of the request modes that are supported for Transport.
 */
const SupportedRequestModes = {
    xhr: true,
    fetch: true,
};
/**
 * A constant map of the flags that are used with the `_stateMask` bitmask in
 * order to determine the current state of the Transport instance.
 */
const StateFlag = {
    CONNECTED: 1 << 0,
    AUTHENTICATED: 1 << 2,
};
/**
 * A typeguard for PluginSocketAPI instances
 *
 * @param plugin - The plugin to check.
 * @return True if the plugin is has a PluginSocketAPI instance.
 */
function hasPluginSocketAPI(plugin) {
    return 'getConnectionInfo' in plugin.api;
}
function appendAccessTokenQuery(url, token) {
    const tokenPart = `access_token=${encodeURIComponent(token)}`;
    const [base, query] = url.split('?');
    if (!query) {
        // If there's no query part, we can just append the token into the query
        // string.
        return `${base}?${tokenPart}`;
    }
    // An existing query string might already have the access_token parameter,
    // so we need to update that existing parameter. We're using a basic find and
    // replace here, so we don't have to decode and encode the query string in
    // two loops.
    const updatedQuery = query.replace(/access_token=[^&]*(&|$)/, `${tokenPart}$1`);
    if (updatedQuery !== query) {
        return `${base}?${updatedQuery}`;
    }
    // If nothing was updated, we should just append the token to the existing
    // query string.
    return `${base}?${tokenPart}&${query}`;
}
/**
 * Transport implements functionality for messaging and connectivity for Spotify
 * applications and libraries.
 */
export class Transport extends EventEmitter {
    constructor(options) {
        super();
        /**
         * A list of plugins
         */
        this._plugins = {};
        /**
         * The mediator for plugins.
         */
        this._pluginMediator = new EventEmitter();
        // Internal Flags and Objects
        /**
         * A flag that indicates whether connect() was called on this instance. Used
         * for determining whether we should reconnect.
         */
        this._connectCalled = false;
        /**
         * A flag that indicates whether authenticate() was called on this instance.
         * Used for determining whether we should reauthenticate on reconnects.
         */
        this._authenticateCalled = false;
        /**
         * The cached `Endpoints` from the `EndpointsProvider`.
         */
        this._endpoints = null;
        /**
         * The cached OAuth token from the `TokenProvider`.
         */
        this._lastToken = null;
        /**
         * The timestamp of the expiry of the cached OAuth token.
         */
        this._lastTokenExpiry = 0;
        /**
         * A promise generated from the last call to `_refreshToken`.
         */
        this._refreshTokenPromise = null;
        /**
         * A promise generated from the last call to `authenticate`.
         */
        this._authenticationPromise = null;
        /**
         * A timeout token for the last reconnection.
         */
        this._reconnectTimeout = 0;
        /**
         * A flag that indicates whether this instance is in the process of
         * reconnecting.
         */
        this._isReconnecting = false;
        /**
         * A timestamp of the last successful authentication for this instance.
         */
        this._initTime = 0;
        /**
         * A timestamp of the last disconnection for this instance.
         */
        this._lastDisconnect = 0;
        /**
         * A bitmask of the current states of this instance.
         */
        this._stateMask = 0;
        /**
         * A counter for the number of "quick disconnections" for this instance.
         */
        this._quickDisconnectCount = 0;
        /**
         * A BackoffCounter that is used to calculate the exponential backoff delay
         * for reconnections.
         */
        this._counter = new BackoffCounter({
            curve: 'exponential',
            baseTime: 5000,
            ceiling: 15000,
        });
        /**
         * A map of listeners for StateAware events.
         */
        this._stateAwareListeners = {
            connected: [],
            authenticated: [],
            connection_id: [],
            transport_connect: [],
            transport_authenticate: [],
        };
        /**
         * A map of runners for StateAware events.
         */
        this._stateAwareRunners = {
            connected: null,
            authenticated: null,
            connection_id: null,
            transport_connect: null,
            transport_authenticate: null,
        };
        if (!options) {
            throw new TypeError('Argument `options` for Transport cannot be null.');
        }
        if (!options.providers) {
            throw new TypeError('Argument `options.providers` for Transport cannot be null.');
        }
        this._ownerRef = 'ownerRef' in options ? Object(options.ownerRef) : {};
        this._tokenProvider = options.providers.token;
        this._endpointsProvider = options.providers.endpoints;
        this._XHR = options.XHR;
        this._Fetch = options.Fetch;
        this._reconnectionRetries =
            options.reconnectionRetries >= 0
                ? options.reconnectionRetries
                : 3;
        this._requestMode =
            options.requestMode in SupportedRequestModes
                ? options.requestMode
                : 'xhr';
        this._forcePolyfillTypes = options.forcePolyfillTypes || {};
        this._disableAutoLogout =
            'disableAutoLogout' in options ? !!options.disableAutoLogout : false;
        this._disconnectBeforeUnload = options.disconnectBeforeUnload || false;
        // Preinit Items
        this._connectionObserver = new ConnectionObserver({
            notifyBeforeUnload: this._disconnectBeforeUnload,
        });
        // Bound methods
        this.authenticate = this.authenticate.bind(this);
        this._authenticateWithToken = this._authenticateWithToken.bind(this);
        this._connectToEndpoints = this._connectToEndpoints.bind(this);
        this._parseProvidedToken = this._parseProvidedToken.bind(this);
        // Bound Event Listeners
        this._onConnected = this._onConnected.bind(this);
        this._onAuthenticated = this._onAuthenticated.bind(this);
        this._onAuthenticationFailed = this._onAuthenticationFailed.bind(this);
        this._init();
    }
    /**
     * Creates a new Transport instance.
     *
     * @param options - The options for this Transport instance.
     * @return A new Transport instance.
     */
    static create(options) {
        return new Transport(options);
    }
    /**
     * Initializes listeners for this transport instance.
     */
    _init() {
        // State Aware Events
        this.onAddListener(Event.CONNECTED, this._onAddListener.bind(this, 'connected'));
        this.onAddListener(Event.AUTHENTICATED, this._onAddListener.bind(this, 'authenticated'));
        this.onAddListener(Event.CONNECTION_ID, this._onAddListener.bind(this, 'connection_id'));
        this.onRemoveListener(Event.CONNECTED, this._onRemoveListener.bind(this, 'connected'));
        this.onRemoveListener(Event.AUTHENTICATED, this._onRemoveListener.bind(this, 'authenticated'));
        this.onRemoveListener(Event.CONNECTION_ID, this._onRemoveListener.bind(this, 'connection_id'));
        // State Aware Plugin Events
        this._pluginMediator.onAddListener(PluginEvent.TRANSPORT_CONNECT, this._onAddListener.bind(this, 'transport_connect'));
        this._pluginMediator.onAddListener(PluginEvent.TRANSPORT_AUTHENTICATE, this._onAddListener.bind(this, 'transport_authenticate'));
        this._pluginMediator.onRemoveListener(PluginEvent.TRANSPORT_CONNECT, this._onRemoveListener.bind(this, 'transport_connect'));
        this._pluginMediator.onRemoveListener(PluginEvent.TRANSPORT_AUTHENTICATE, this._onRemoveListener.bind(this, 'transport_authenticate'));
        if (this._requestMode === 'fetch' &&
            (!this._Fetch || !this._Fetch.isSupported())) {
            debugLogger.warn('Default "fetch" request mode unavailable; Fallback to "xhr"');
            this._requestMode = 'xhr';
        }
        const pluginMediator = this._pluginMediator;
        pluginMediator.addListeners({
            [PluginEvent.PLUGIN_DISCONNECTED]: this._onPluginDisconnected.bind(this),
        });
        this.proxyEmit(pluginMediator, PluginEvent.PLUGIN_CONNECTION_INFO, Event.CONNECTION_ID);
        if (!this._disableAutoLogout) {
            this.matchMessages(LOGOUT_MESSAGE_URI, () => this._onLogout());
        }
        this._connectionObserver.on(Event.CONNECTION_ONLINE, () => this._onOnline());
        this._connectionObserver.on(Event.CONNECTION_OFFLINE, () => this._onOffline());
        this._connectionObserver.on(Event.WINDOW_BEFORE_UNLOAD, () => this.disconnect());
    }
    /**
     * Runs queued state aware listeners.
     *
     * @param type - The type of queued listeners to run.
     * @param event - The event to pass to the queued listeners.
     */
    _runStateAwareQueues(type, event) {
        const listeners = this._stateAwareListeners[type].splice(0);
        for (const listener of listeners) {
            listener.call(this, event);
        }
        this._stateAwareRunners[type] = null;
    }
    /**
     * Connects the Transport instance to the various messaging endpoints.
     *
     * @return A promise that will be resolved to true if the connection was
     *   performed, or false otherwise (such as when it's already connected).
     */
    _connect() {
        if (!!(this._stateMask & StateFlag.CONNECTED)) {
            // Already connected.
            return Promise.resolve(false);
        }
        if (this._connectionObserver.isOnline()) {
            return this._performConnect();
        }
        return new Promise((resolve, reject) => {
            this._connectionObserver.once(Event.CONNECTION_ONLINE, () => {
                this._performConnect().then(resolve, reject);
            });
        });
    }
    /**
     * Starts the connection process for the transport instance.
     *
     * @return A promise that will be resolved to true if the connection was
     *   performed, or false otherwise (such as when it's already connected).
     */
    _performConnect() {
        return new Promise((resolve) => {
            resolve(this._endpointsProvider(this.toPublic()));
        })
            .catch((maybeError) => {
            if (!maybeError || maybeError.code) {
                return Promise.reject(maybeError);
            }
            return Promise.reject(new TransportError(TransportErrors.TRANSPORT_ENDPOINTS_PROVIDER_ERROR, maybeError.message || 'Endpoints provider error', maybeError));
        })
            .then(this._connectToEndpoints)
            .then(this._onConnected)
            .catch((e) => {
            const realError = e && e.error ? e.error : e;
            this.emit(Event.CONNECTION_FAILED, { error: realError });
            return Promise.reject(realError);
        });
    }
    /**
     * Connects to a given set of `Endpoints`.
     *
     * @param endpoints - The endpoints to connect to.
     * @return A promise that will be resolved to true if the connection was
     *   performed, or false otherwise (such as when it's already connected).
     */
    _connectToEndpoints(endpoints) {
        const processedEndpoints = { webgate: '', webapi: '' };
        // Ensure that the endpoints end in a slash, in case they do not.
        for (const name in endpoints) {
            if (!endpoints.hasOwnProperty(name) || !endpoints[name]) {
                continue;
            }
            let endpoint = endpoints[name];
            if (ENDPOINT_REQUIRES_SLASH_EXP.test(endpoint)) {
                endpoint += '/';
            }
            processedEndpoints[name] = endpoint;
        }
        this._endpoints = processedEndpoints;
        this.emit(Event.ENDPOINTS_RESOLVED, {
            // Clone the endpoint so that listeners don't accidentally change it.
            endpoints: Object.assign({}, processedEndpoints),
        });
        const awaiting = [];
        const awaitPromise = (connectionPromise) => {
            awaiting.push(connectionPromise);
        };
        return new Promise((resolve, reject) => {
            this._pluginMediator.emitAndWait(PluginEvent.TRANSPORT_CONNECT, { endpoints: Object.assign({}, processedEndpoints), awaitPromise }, () => {
                Promise.all(awaiting).then(() => resolve(true), reject);
            });
        });
    }
    /**
     * Retrieves an access token.
     *
     * This method calls the provided token provider to retrieve an access token.
     * This token will then be cached and returned for subsequent calls until it
     * expires.
     *
     * Note that you can use the optional `ignoreCached` argument to force the
     * function to retrieve a new token.
     *
     * @param ignoreCached - Forces the method to retrieve a new token from
     *   the token provider if set to true.
     * @return The new token.
     */
    _refreshToken(ignoreCached = false) {
        if (this._refreshTokenPromise) {
            // There's already a pending token refreshing operation, so we just
            // return the promise from the previous one.
            return this._refreshTokenPromise;
        }
        if (!ignoreCached &&
            this._lastToken &&
            this._lastTokenExpiry > Date.now()) {
            // The last access token is still valid, so just return that.
            return Promise.resolve(this._lastToken);
        }
        this._refreshTokenPromise = new Promise((resolve) => {
            resolve(this._tokenProvider());
        }).then(this._parseProvidedToken);
        // We need to clear the `_refreshTokenPromise` variable after fetching a
        // token, regardless of whether the token provider succeeded or not.
        const clearPromise = () => {
            this._refreshTokenPromise = null;
        };
        this._refreshTokenPromise.then(clearPromise, clearPromise);
        return this._refreshTokenPromise.catch((maybeError) => {
            const error = (maybeError === null || maybeError === void 0 ? void 0 : maybeError.code) ? maybeError
                : new TransportError(TransportErrors.TRANSPORT_TOKEN_PROVIDER_ERROR, (maybeError === null || maybeError === void 0 ? void 0 : maybeError.message) || 'Token provider error', maybeError);
            this.emit(Event.TOKEN_PROVIDER_ERROR, { error });
            return Promise.reject(error);
        });
    }
    /**
     * Parses the token returned by the `provider.token` function that was passed
     * to the Transport instance when it was initialized.
     *
     * @param maybeToken - Either a string OAuth token, or an array containing a
     *   string OAuth token and a number signifying the token's lifetime in
     *   seconds.
     * @return The OAuth token from the provider.
     * @throws {TypeError} Will throw if it received an empty token (i.e, a falsy
     *   value).
     */
    _parseProvidedToken(maybeToken) {
        let token;
        let tokenTTL;
        if (Array.isArray(maybeToken)) {
            token = maybeToken[0];
            tokenTTL = parseInt(maybeToken[1], 10);
            if (isNaN(tokenTTL)) {
                tokenTTL = DEFAULT_TOKEN_TIMEOUT;
            }
        }
        else {
            token = maybeToken;
            tokenTTL = DEFAULT_TOKEN_TIMEOUT;
        }
        if (!token) {
            this._lastToken = null;
            this._lastTokenExpiry = 0;
            debugLogger.error('No token was provided');
            throw new TransportError(TransportErrors.TRANSPORT_INVALID_TOKEN, `Token provider returned an invalid token, "${token}"`);
        }
        if (this._lastToken === token) {
            debugLogger.error('TokenProvider returned same token twice.');
            const error = new TransportError(TransportErrors.TRANSPORT_STALE_TOKEN, 'Token provider returned the same token twice.');
            this._lastToken = null;
            this._lastTokenExpiry = 0;
            throw error;
        }
        this._lastToken = token;
        this._lastTokenExpiry = Date.now() + tokenTTL * 1000;
        this.emit(Event.ACCESS_TOKEN, { token: token });
        return token;
    }
    /**
     * Authenticates the current Transport instance with the provided token.
     *
     * @param token - The OAuth token that will be used for authentication.
     * @return A promise that will be resolved once the authentication flow has
     *   been completed.
     */
    _authenticateWithToken(token) {
        if (!this._endpoints) {
            // FIXME: This should be an error.
            return Promise.resolve(true);
        }
        const awaiting = [];
        const awaitPromise = (connectionPromise) => {
            awaiting.push(connectionPromise);
        };
        return new Promise((resolve, reject) => {
            this._pluginMediator.emitAndWait(PluginEvent.TRANSPORT_AUTHENTICATE, { token, awaitPromise }, () => {
                Promise.all(awaiting).then(() => resolve(true), reject);
            });
        });
    }
    /**
     * Authenticates a Transport instance to the messaging endpoints.
     *
     * Internally, this will trigger Transport to call the `TokenProvider` to
     * to get an OAuth token that will be used for authentication.
     *
     * @param ignoreCachedToken - When set to true, force a refresh of the OAuth
     *   token by calling the `TokenProvider`.
     * @return A promise that will be resolved once the instance has benn
     *   authenticated, or rejected with any errors related to authentication.
     */
    _authenticate(ignoreCachedToken) {
        if (!(this._stateMask & StateFlag.CONNECTED)) {
            return Promise.reject(new TransportError(TransportErrors.TRANSPORT_INVALID_STATE, 'Cannot authenticate disconnected transport.'));
        }
        if (this._authenticationPromise) {
            return this._authenticationPromise;
        }
        this._authenticationPromise = Backoff.init(() => {
            return this._refreshToken(ignoreCachedToken).then(this._authenticateWithToken);
        }, { curve: 'exponential', maxRetries: 2, baseTime: 500 })
            .then(this._onAuthenticated)
            .catch(this._onAuthenticationFailed);
        return this._authenticationPromise;
    }
    /**
     * Disconnects the Transport instance.
     *
     * @param suppressEvent - When set to true, the `Event.TRANSPORT_DISCONNECTED`
     *   event will not be emitted as part of this function. This is necessary
     *   for operations where we internally disconnect the Transport instance
     *   without having to inform the user of the disconnection (such as when
     *   reconnecting).
     * @return True if the disconnection was successful.
     */
    _disconnect(suppressEvent = false) {
        this._stateMask = 0;
        if (!suppressEvent) {
            this.emit(Event.DISCONNECTED, null);
        }
        this._pluginMediator.emitSync(PluginEvent.TRANSPORT_DISCONNECT, {
            supressed: suppressEvent,
        });
        return true;
    }
    /**
     * Creates a function that will be used to reconnect the current instance
     * after an apparent disconnection.
     *
     * @return A function that can be used to trigger reconnection.
     */
    _createReconnector() {
        // We start with trying to reconnect with the cached token if it's still
        // valid. If the authentication results in an error, we will force refresh
        // the token in subsequent retries.
        let ignoreCachedToken = false;
        return () => {
            this._isReconnecting = true;
            this.emit(Event.RECONNECTING, null);
            this._disconnect(true);
            return this._connect()
                .then(() => {
                if (!this._authenticateCalled) {
                    // The instance was never authenticated, so we skip authentication
                    // during reconnect.
                    return false;
                }
                return this._authenticate(ignoreCachedToken).then((result) => {
                    // Authorization was successful, make sure to use the cached
                    // token in the next reconnection.
                    ignoreCachedToken = false;
                    return result;
                }, (error) => {
                    // Authorization was not successful, force token refresh on next
                    // reconnect
                    ignoreCachedToken = true;
                    return Promise.reject(error);
                });
            })
                .then(() => {
                this._isReconnecting = false;
                this.emit(Event.RECONNECTED, null);
                return true;
            });
        };
    }
    /**
     * Called when Transport detects that it has been disconnected due to a bad
     * network connection.
     */
    _tryToReconnect() {
        if (this._isReconnecting) {
            // Already reconnecting, ignore call.
            return;
        }
        this._stateMask = 0;
        Backoff.init(this._createReconnector(), {
            baseTime: 1000,
            maxTime: 15000,
            maxRetries: this._reconnectionRetries,
        }).catch(() => {
            this._stateMask = 0;
            this._isReconnecting = false;
            this.emit(Event.DISCONNECTED, null);
        });
    }
    /**
     * Sends a request.
     *
     * @param uri - The URI to request.
     * @param args - The arguments for the request.
     * @param context - The request context.
     * @return The response for the request.
     */
    _sendRequest(uri, args = {}, context = {}) {
        return this._processRequestArgs(uri, args).then((parsed) => {
            if (parsed.options.forget) {
                return this._sendFireAndForgetRequest(parsed);
            }
            return this._sendRetriedRequest(parsed, context);
        });
    }
    /**
     * Takes the arguments to `Transport#request` and processes them, modifying
     * certain options to ensure that they are correct.
     *
     * @param uri - The URI of the request.
     * @param args - The arguments to the request.
     * @return The parsed request arguments.
     */
    _processRequestArgs(uri, args = {}) {
        var _a;
        let url = uri;
        let urlExpanded = false;
        const requestArgs = Object.assign(Object.assign({}, args), { forcePolyfill: !!(args.responseType && args.responseType in this._forcePolyfillTypes), requestMode: (_a = args === null || args === void 0 ? void 0 : args.requestMode) !== null && _a !== void 0 ? _a : this._requestMode, connectionObserver: this._connectionObserver, metadata: (args === null || args === void 0 ? void 0 : args.metadata) || null });
        if (HTTP_SPECIAL_URL_EXP.test(url)) {
            urlExpanded = true;
            try {
                // This will throw if the special URL key is invalid.
                url = this._tryExpandSpecialURL(url);
            }
            catch (e) {
                return Promise.reject(e);
            }
            // By default we want to authorize any special URLs, but if the caller has
            // explicitly set the `authorize` option, we should respect that.
            if (!('authorize' in requestArgs)) {
                requestArgs.authorize = true;
                requestArgs.autoAuthorized = true;
            }
        }
        const retryOptions = Object.assign({ maxRetries: DEFAULT_RETRY_COUNT, curve: 'exponential' }, args.retry);
        return Promise.resolve(HTTPRequest.create(url, {
            method: args.method,
            headers: args.headers,
            payload: args.payload,
            options: requestArgs,
            urlExpanded,
            retryOptions,
        }));
    }
    /**
     * Expands a "special URL" in the form `@<endpoint>` to its full path, based
     * on the values defined in the Endpoints from the EndpointsProvider.
     *
     * @param url - The URL to expand.
     * @return The expanded URL string.
     * @throws {TypeError} If the endpoint name is not provided by the endpoints
     *   provider.
     */
    _tryExpandSpecialURL(url) {
        const endpoints = this._endpoints;
        return url.replace(HTTP_SPECIAL_URL_EXP, (_, key) => {
            if (!endpoints.hasOwnProperty(key)) {
                throw new TypeError(`Cannot replace endpoint @${key}: endpoint not defined.`);
            }
            return endpoints[key];
        });
    }
    /**
     * Sends a GET or POST request to a URL, ignoring the response.
     *
     * @privateRemarks
     * This function will use the following strategies for a GET request, in
     * order:
     *
     * - `fetch` if available.
     * - `Image` element, via `src`.
     * - Normal `transport.request`
     *
     * The `fetch` and `Image` strategies are done directly inside the function.
     *
     * For POST requests, the function will use the following strategies:
     *
     * - `navigator.sendBeacon` if available.
     * - `fetch` if available
     * - Normal `transport.request`
     *
     * @param request - The HTTP Request.
     * @return The `HTTPResponse` object containing the URL and a status of 0.
     */
    _sendFireAndForgetRequest(request) {
        const { url, method, options } = request;
        if (method !== 'GET' && method !== 'POST') {
            return Promise.reject(new TransportError(TransportErrors.TRANSPORT_UNSUPPORTED_OPTION, `Option 'forget' cannot be used for ${method} request.`));
        }
        // autoAuthorized will only be set to `true` if `transport` itself set the
        // authorization field. We therefore only want to throw an error if the
        // user itself asked for authorization for the request.
        if (!options.autoAuthorized && options.authorize) {
            return Promise.reject(new TransportError(TransportErrors.TRANSPORT_UNSUPPORTED_OPTION, `Option 'forget' cannot be used for authorized request.`));
        }
        // We change the parsed options here in case we need to send them via
        // _sendRetried request. These changes shouldn't affect the non-transport
        // related strategies.
        options.requestMode = 'xhr';
        options.authorize = false;
        options.ignoreResponseBody = true;
        if (method === 'GET') {
            if (typeof fetch === 'function') {
                fetch(url, { mode: 'no-cors' }).catch(() => {
                    // Ignore any errors related to the request.
                });
            }
            else if (typeof Image === 'function') {
                new Image().src = url;
            }
            else {
                this._sendRetriedRequest(request, {}).catch(() => { });
            }
        }
        else if (method === 'POST') {
            if (typeof navigator !== 'undefined' && (navigator === null || navigator === void 0 ? void 0 : navigator.sendBeacon)) {
                navigator.sendBeacon(request.url, request.payload);
            }
            else if (typeof fetch === 'function') {
                fetch(url, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: request.payload,
                }).catch(() => { });
            }
            else {
                this._sendRetriedRequest(request, {}).catch(() => { });
            }
        }
        return Promise.resolve(new HTTPResponse(url, 0));
    }
    /**
     * Sends the request and retries it until it succeeds or until it runs out of
     * retries.
     *
     * Internally, this method also sets the authorization header when necessary.
     *
     * @param httpRequest - The parsed arguments for this request.
     * @param context - The request context.
     * @return A promise that will be resolved with the HTTPResponse object.
     */
    _sendRetriedRequest(httpRequest, context) {
        const backoffStrategy = httpRequest.retryOptions;
        // This is a static flag that we will use to check whether we need to update
        // the token. We keep it here so that the `requestFn` closure will have
        // access to it in between invocations.
        let ignoreCachedToken = false;
        // This function will be called in the lifetime of the request to set the
        // request's Authorization header every time that we detect that the token
        // has expired.
        const updateToken = () => {
            return this._setAuthHeader(httpRequest, ignoreCachedToken);
        };
        const connectionObserver = this._connectionObserver;
        // This is the function that we will use together with the Backoff module to
        // retry the request if it fails.
        const requestFn = () => {
            let updateTokenPromise;
            if (connectionObserver.isOnline()) {
                updateTokenPromise = updateToken();
            }
            else {
                // The browser is not online, so we might have to wait until until the
                // browser is online to send this.
                updateTokenPromise = new Promise((resolve, reject) => {
                    if (httpRequest.options.allowOffline) {
                        // The caller has explicitly set that this request should go through
                        // even if the browser is offline, so we just set it with the old
                        // token.
                        updateToken().then(resolve, reject);
                        return;
                    }
                    connectionObserver.once(Event.CONNECTION_ONLINE, () => {
                        updateToken().then(resolve, reject);
                    });
                });
            }
            return updateTokenPromise
                .then(() => {
                // Choose a request strategy based on the `requestMode` and based on
                // the availability of `Fetch`.
                let requestPromise;
                this._pluginMediator.emitSync(PluginEvent.TRANSPORT_BEFORE_SEND_REQUEST, {
                    request: httpRequest,
                    context: context,
                });
                if (httpRequest.options.requestMode === 'fetch' &&
                    this._Fetch &&
                    this._Fetch.isSupported()) {
                    requestPromise = this._Fetch.request(httpRequest);
                }
                else if (this._XHR) {
                    requestPromise = this._XHR.request(httpRequest);
                }
                else {
                    throw new Error('No available request mechanisms.');
                }
                return requestPromise;
            })
                .then((resp) => {
                let retryAfterHeader = null;
                if (resp.headers) {
                    retryAfterHeader = resp.headers.get('Retry-After');
                }
                // Check the retry conditions and see whether we need to retry.
                // Rejecting the promise there will trigger `Backoff` to rerun the
                // `requestFn`.
                if (resp.status === StatusCode.UNAUTHORIZED &&
                    !httpRequest.options.ignoreUnauthorized) {
                    // We need to retry because we got a 401, which means that the token
                    // is probably expired. We need to set `ignoreCachedToken` to true
                    // so that the next invocation of `requestFn` (and `updateToken`)
                    // will trigger a refresh of the token.
                    ignoreCachedToken = true;
                    return Promise.reject(resp);
                }
                else if (typeof (backoffStrategy === null || backoffStrategy === void 0 ? void 0 : backoffStrategy.condition) === 'function' &&
                    (backoffStrategy.condition(resp, StatusFamily) || retryAfterHeader)) {
                    // This delay can either be an integer representing the number of
                    // seconds, or as a datestring.
                    // Two examples of its use are:
                    //
                    //      Retry-After: Fri, 31 Dec 1999 23:59:59 GMT
                    //      Retry-After: 120
                    //
                    //          In the latter example, the delay is 2 minutes.
                    if (retryAfterHeader !== null) {
                        const delay = parseInt(retryAfterHeader, 10);
                        if (HTTP_DATE_EXP.test(retryAfterHeader)) {
                            // treat this as a date string.
                            resp.retryAfter =
                                new Date(retryAfterHeader).getTime() - Date.now();
                        }
                        else if (delay > 0) {
                            // treat this as a delay (in seconds).
                            resp.retryAfter = delay * 1000;
                        }
                    }
                    // The caller provided retry condition returned true, so we fail and
                    // retry the request.
                    return Promise.reject(resp);
                }
                // Everything seems to be order, so just return the response.
                return Promise.resolve(resp);
            });
        };
        const backoff = new Backoff(requestFn, backoffStrategy);
        return backoff
            .start()
            .catch(this._handleRetriedRequestError)
            .then((response) => {
            response.metadata = httpRequest.options.metadata;
            response.retries = response.retries || {};
            response.retries.count = backoff.getRetryCount();
            this._pluginMediator.emitSync(PluginEvent.TRANSPORT_BEFORE_RETURN_RESPONSE, {
                context,
                response,
            });
            if (httpRequest.options.rejectNotOk && !response.ok) {
                return Promise.reject(response);
            }
            return response;
        });
    }
    /**
     * Sets the `Authorization` header for a request via its RequestOptions.
     *
     * @param request - The internal request args.
     * @param ignoreCachedToken - If set to true, a new token will be requested
     *   before setting the header.
     * @return The `RequestOptions` with the `header.Authorization` value set to
     *   a `Bearer` token.
     */
    _setAuthHeader(request, ignoreCachedToken) {
        if (!request.options.authorize) {
            return Promise.resolve(request);
        }
        const setterFn = () => {
            return this._refreshToken(ignoreCachedToken).then((token) => {
                request.headers.set('Authorization', `Bearer ${token}`);
                return request;
            });
        };
        if (this._stateMask & StateFlag.AUTHENTICATED) {
            return setterFn();
        }
        // We are not yet authenticated, so wait until we are authenticated before
        // we set the header.
        //
        // Note! This may actually hang forever, if authentication never succeeds.
        return new Promise((resolve, reject) => {
            debugLogger.info('Auth header setting awaiting authentication.');
            this.once(Event.AUTHENTICATED, () => {
                debugLogger.info('Auth header set after authentication.');
                setterFn().then(resolve, reject);
            });
        });
    }
    /**
     * Handles a "failing" request from `Transport#_sendRetriedRequest`.
     *
     * @privateRemarks
     * By default, the `Transport.request` method should never reject because of
     * the request not being "successful" (i.e, not being in the 2xx range). This
     * mirrors the behaviour of XMLHttpRequest.
     *
     * Therefore, we need to make sure that we do not throw any `HTTPResponse`s
     * event though the `Backoff` function might have failed.
     *
     * @param maybeError - An object that would either be an `HTTPResponse` or
     *   something else that was thrown.
     * @return A promise that will be resolved to an `HTTPResponse` or rejected
     *   with anything else.
     */
    _handleRetriedRequestError(maybeError) {
        if (maybeError instanceof HTTPResponse) {
            // The request was successful, but the retry parameters probably didn't
            // clear the response as successful. In which case we should just return
            // the response directly and let the requester handle it.
            return Promise.resolve(maybeError);
        }
        return Promise.reject(maybeError);
    }
    // Event Handlers
    /**
     * Called every time a listener is added for one of the state-aware events
     * (i.e., `Events.TRANSPORT_CONNECTED`, `Events.TRANSPORT_AUTHENTICATED` and
     * `Events.TRANSPORT_CONNECTION_ID`).
     *
     * @param type - The type of event, either 'connected', 'authorized' or
     *   'connection_id'
     * @param ev - The `MetaListenerEvent` containing details about the listener
     *   added.
     */
    _onAddListener(type, ev) {
        const options = ev.data.options;
        if (options.ignoreCurrentState) {
            // Do not process state-aware event--it has been explicitly disabled.
            return;
        }
        let eventPromise;
        switch (type) {
            // Internal Events
            case 'connected':
                if (!this.isConnected()) {
                    return;
                }
                eventPromise = Promise.resolve(this.createEvent(Event.CONNECTED, null));
                break;
            case 'authenticated':
                if (!this.isAuthenticated()) {
                    return;
                }
                eventPromise = Promise.resolve(this.createEvent(Event.AUTHENTICATED, null));
                break;
            case 'connection_id': {
                // The state-aware event for connection id is special-cased for dealer.
                const dealerAPI = this.getPluginAPI('dealer');
                if (!dealerAPI || !dealerAPI.hasConnectionInfo()) {
                    return;
                }
                eventPromise = dealerAPI.getConnectionInfo().then((connectionInfo) => {
                    return this.createEvent(Event.CONNECTION_ID, connectionInfo);
                });
                break;
            }
            // Plugin Events
            case 'transport_connect':
                if (!this.isConnected() || !this._endpoints) {
                    return;
                }
                eventPromise = Promise.resolve(this._pluginMediator.createEvent(PluginEvent.TRANSPORT_CONNECT, {
                    endpoints: Object.assign({}, this._endpoints),
                    awaitPromise: (_awaiter) => { },
                }));
                break;
            case 'transport_authenticate':
                if (!this.isAuthenticated()) {
                    return;
                }
                eventPromise = this._refreshToken().then((token) => this._pluginMediator.createEvent(PluginEvent.TRANSPORT_AUTHENTICATE, {
                    token,
                    awaitPromise: (_awaiter) => { },
                }));
                break;
            default:
                return;
        }
        const listener = ev.data.listener;
        this._stateAwareListeners[type].push(listener);
        const runners = this._stateAwareRunners;
        if (runners[type]) {
            // There is already a runner scheduled, so we return immediately as this
            // listener will be called in the scheduled runner.
            return;
        }
        runners[type] = eventPromise.then(this._runStateAwareQueues.bind(this, type));
        if (options.once) {
            // This is a once event listener, so we don't want it to get added as an
            // actual listener since it's already going to be run once by our
            // scheduled runner.
            ev.preventDefault();
        }
    }
    /**
     * Called every time a listener is removed  for one of the state-aware events
     * (i.e., `Events.TRANSPORT_CONNECTED`, `Events.TRANSPORT_AUTHENTICATED` and
     * `Events.TRANSPORT_CONNECTION_ID`).
     *
     * @param type - The type of event, either 'connected', 'authorized' or
     *   'connection_id'
     * @param event - The `MetaListenerEvent` containing details about the listener
     *   added.
     */
    _onRemoveListener(type, event) {
        const options = event.data.options;
        if (options.ignoreCurrentState || options.once) {
            // The user has indicated that this listener is not state aware, or this
            // was a once event, so we ignore it.
            return;
        }
        const listener = event.data.listener;
        const index = this._stateAwareListeners[type].indexOf(listener);
        if (index === -1) {
            return;
        }
        this._stateAwareListeners[type].splice(index, 1);
    }
    _getQuickDisconnectTimeout() {
        return this._counter.getTime(this._quickDisconnectCount);
    }
    _onPluginDisconnected(ev) {
        const now = Date.now();
        const sessionLength = now - this._lastDisconnect;
        this._disconnect(true);
        if (ev.data.code === InternalSocketCode.CLOSE) {
            // Explicit disconnect, do not try to reconnect.
            this._quickDisconnectCount = 0;
            return;
        }
        if (!this._connectionObserver.isOnline()) {
            // Browser is offline, do not reconnect right now. Will be handled by
            // `_onOnline`.
            return;
        }
        if (sessionLength < RECONNECT_THRESHOLD) {
            if (this._reconnectTimeout) {
                clearTimeout(this._reconnectTimeout);
            }
            this._quickDisconnectCount++;
            this.emit(Event.SHORT_SESSION_DISCONNECTED, {
                disconnectCount: this._quickDisconnectCount,
                sessionLength: sessionLength,
            });
            this._reconnectTimeout = setTimeout(this._tryToReconnect.bind(this), this._getQuickDisconnectTimeout());
        }
        else {
            this._quickDisconnectCount = 0;
            this._lastDisconnect = now;
            this._tryToReconnect();
        }
    }
    /**
     * Called when the ConnectionObserver detects that the browser has gone
     * online.
     */
    _onOnline() {
        this.emit(Event.CONNECTION_ONLINE, null);
        if (this._connectCalled) {
            this._tryToReconnect();
        }
    }
    /**
     * Called when the ConnectionObserver detects that the browser has gone
     * offline.
     */
    _onOffline() {
        this.emit(Event.CONNECTION_OFFLINE, null);
        this._disconnect(true);
    }
    /**
     * Called after the connection process is completed.
     *
     * @return A promise that will be resolved with a boolean if the
     *   authentication was successful.
     */
    _onConnected() {
        this._stateMask |= StateFlag.CONNECTED;
        this.emit(Event.CONNECTED, null);
        return Promise.resolve(true);
    }
    /**
     * Called after the authentication process is completed.
     *
     * @return A promise that will be resolved with a boolean if the
     *   authentication was successful.
     */
    _onAuthenticated() {
        clearTimeout(this._reconnectTimeout);
        this._authenticationPromise = null;
        this._stateMask |= StateFlag.AUTHENTICATED;
        this._initTime = Date.now();
        this.emit(Event.AUTHENTICATED, null);
        return Promise.resolve(true);
    }
    /**
     * Called when the authentication process fails due to errors.
     *
     * @param e - Commonly an error, but might also be an event.
     * @return A promise that will be rejected with the error.
     */
    _onAuthenticationFailed(e) {
        const error = e && e.error ? e.error : e;
        this._authenticationPromise = null;
        this._stateMask &= ~StateFlag.AUTHENTICATED;
        this.emit(Event.AUTHENTICATION_FAILED, {
            error: error,
        });
        return Promise.reject(error);
    }
    /**
     * Called when the backend triggers a logout of clients.
     */
    _onLogout() {
        const handler = () => {
            this._lastToken = null;
            this._lastTokenExpiry = 0;
            this.emit(Event.LOGGED_OUT, null);
        };
        this.disconnect().then(handler, handler);
    }
    // Public API
    /**
     * Returns whether the Transport instance is connected to the messaging
     * endpoints.
     *
     * @return True if the Transport instance is connected, false otherwise.
     */
    isConnected() {
        return !!(this._stateMask & StateFlag.CONNECTED);
    }
    /**
     * Returns whether the Transport instance is authenticated to the messaging
     * endpoints.
     *
     * @return True if the Transport instance is authenticated, false
     *   otherwise.
     */
    isAuthenticated() {
        return !!(this._stateMask & StateFlag.AUTHENTICATED);
    }
    /**
     * Returns whether the Transport instance is currently reconnecting.
     *
     * @return True if the Transport instance is reconnecting, false otherwise.
     */
    isReconnecting() {
        return this._isReconnecting;
    }
    /**
     * Returns whether the browser is online.
     *
     * Note that for browsers that do not support the online/offline events, this
     * method will always return `true`.
     *
     * @return True if the browser is online, false otherwise.
     */
    isOnline() {
        return this._connectionObserver.isOnline();
    }
    /**
     * Connects a Transport instance to the messaging endpoints.
     *
     * Internally, this will trigger Transport to call the `EndpointsProvider`
     * to fetch the map of messaging endpoints to connect to.
     *
     * @return A promise that will be resolved once the instance has connected,
     *   or rejected with errors related to connection.
     */
    connect() {
        this._connectCalled = true;
        return this._connect();
    }
    /**
     * Authenticates a Transport instance to the messaging endpoints.
     *
     * Internally, this will trigger Transport to call the `TokenProvider` to
     * to get an OAuth token that will be used for authentication.
     *
     * @return A promise that will be resolved once the instance has benn
     *   authenticated, or rejected with any errors related to authentication.
     */
    authenticate() {
        this._authenticateCalled = true;
        return this._authenticate(true);
    }
    /**
     * Disconnects the Transport from the messaging endpoints.
     *
     * Before fully disconnecting, the Transport instance will emit an event that
     * other modules can use to register "awaited promises". The disconnection
     * will only happen after all those registered promises have been either
     * resolved or rejected.
     *
     * @return A promise that will be resolved once the instance has been
     *   disconnected.
     */
    disconnect() {
        if (!this._connectCalled) {
            return Promise.resolve(false);
        }
        this._connectCalled = false;
        this._authenticateCalled = false;
        const eventName = this.isConnected()
            ? Event.BEFORE_ONLINE_DISCONNECT
            : Event.BEFORE_OFFLINE_DISCONNECT;
        const awaiting = [];
        const awaitPromise = (promise) => {
            awaiting.push(promise.catch(() => {
                // Ignore any errors that might arise from the promise.
            }));
        };
        this.emitSync(eventName, { awaitPromise });
        return Promise.all(awaiting).then(() => this._disconnect(false));
    }
    /**
     * Disconnects a Transport instance from the messaging endpoints, bypassing
     * any "awaited" promises.
     *
     * Unlike the `disconnect()` method, this method does not emit any event that
     * will other modules can use to register awaited promises.
     *
     * @return A promise that will be resolved once the instance has been
     *   disconnected.
     */
    forceDisconnect() {
        if (!this._connectCalled) {
            return Promise.resolve(false);
        }
        this._connectCalled = false;
        this._authenticateCalled = false;
        this._disconnect();
        return Promise.resolve(true);
    }
    /**
     * Forces the instance to refresh its OAuth token.
     *
     * @return A promise that will be resolved once the token has been refreshed.
     */
    forceTokenRefresh() {
        return this._refreshToken(true).then(() => true);
    }
    /**
     * Returns the time when the Transport instance was authenticated.
     *
     * @return A timestamp of when the instance was authenticated.
     */
    getInitTime() {
        return this._initTime;
    }
    /**
     * Returns the endpoints defined by the `EndpointsProvider`.
     *
     * This will return `null` if the Transport instance is not yet connected.
     *
     * @return The endpoints defined by the `EndpointsProvider`, or null if the
     *   Transport instance is not yet connected.
     */
    getEndpoints() {
        return this._endpoints ? Object.assign({}, this._endpoints) : null;
    }
    /**
     * Returns the last access token from the `TokenProvider`.
     *
     * This will return `null` if the Transport instance is not yet
     * authenticated.
     *
     * @return The last access token returned by the `TokenProvider`, or null if
     *   the Transport instance has not been authenticated.
     */
    getLastToken() {
        return this._lastToken;
    }
    /**
     * Returns a `PublicTransport` instance associated with this Transport
     * instance.
     *
     * @param options - The options for this PublicTransport instance.
     * @return A `PublicTransport` instance.
     */
    toPublic(options) {
        return new PublicTransport(this, options);
    }
    /**
     * Checks whether this Transport instance has the same `refOwner` as the
     * provided value.
     *
     * @param ownerRef - An object reference.
     * @return True if the `refOwner` value is the same as the instance's
     *   refOwner value, or false otherwise.
     */
    hasOwnerRef(ownerRef) {
        return this._ownerRef === ownerRef;
    }
    /**
     * Takes a string URL and appends an `access_token` query parameter and
     * returns the new string URL as a promise.
     *
     * This method will refresh the access token.
     *
     * @param url - The URL to append the query parameter to.
     * @return A promise with the access token appended as a query parameter.
     */
    appendTokenQuery(url) {
        return this._refreshToken().then((token) => appendAccessTokenQuery(url, token));
    }
    /**
     * Takes a string URL and appends an `access_token` query parameter containing
     * the last known access token if available.
     *
     * Note that this method does not refresh the token; if there is no token
     * available, the string will be returned as is. The function can also return
     * a stale access token.
     *
     * @param url - The URL to append the query parameter to.
     * @return The URL string with the access token appended as a query parameter,
     *   if the token is available.
     */
    appendLastTokenQuery(url) {
        if (!this._lastToken) {
            return url;
        }
        return appendAccessTokenQuery(url, this._lastToken);
    }
    /**
     * Adds a handler function that will be called every time a message comes
     * from `Dealer` with a `uri` value matching the provided `matcher` argument.
     *
     * @param matcher - A string or regular expression that will be used to test
     *   each incoming `Dealer` message. If the message's `uri` value matches,
     *   the provided `handler` function will be called.
     * @param handler - A function that will be called every time a matching
     *   message is received from `Dealer`. The message will be passed as an
     *   argument to this function.
     * @param plugin - An optional plugin name. If not provided, it will match
     *   messages from all plugins.
     */
    matchMessages(matcher, handler, plugin) {
        if (!matcher) {
            throw new TypeError('Message "matcher" cannot be null.');
        }
        if (typeof handler !== 'function') {
            throw new TypeError('Message callback cannot be null.');
        }
        const wrapper = (ev) => {
            const msg = ev.data.message;
            if (!msg.uri ||
                !msg.uri.match(matcher) ||
                (plugin && plugin !== ev.data.plugin)) {
                return;
            }
            handler(msg);
        };
        wrapper.__matchMessagesExp = matcher;
        wrapper.__matchMessagesPlugin = plugin;
        // Store the wrapper in the function so we can remove it.
        handler.__matchMessagesWrapper = wrapper;
        this._pluginMediator.on(PluginEvent.PLUGIN_MESSAGE, wrapper);
    }
    /**
     * Removes a handler for a particular `Dealer` message.
     *
     * Note that you must pass the exact `matcher` and `handler` values as you
     * did when calling `matchMessages`.
     *
     * @param matcher - The string or RegExp matcher.
     * @param handler - The handler function.
     * @param plugin - An optional plugin name. If not provided, it will match
     *   messages from all plugins.
     * @return True if the handler was removed successfully, false otherwise.
     */
    unmatchMessages(matcher, handler, plugin) {
        if (typeof handler !== 'function') {
            throw new TypeError('Message callback cannot be null.');
        }
        const wrapper = handler.__matchMessagesWrapper;
        if (!wrapper ||
            wrapper.__matchMessagesExp !== matcher ||
            wrapper.__matchMessagesPlugin !== plugin) {
            return false;
        }
        this._pluginMediator.removeListener(PluginEvent.PLUGIN_MESSAGE, wrapper);
        return true;
    }
    /**
     * Adds a handler function that will be called every time a request comes
     * from `Dealer` with a `message_ident` value matching the provided
     * `matcher` argument.
     *
     * @param matcher - A string or regular expression that will be used to test
     *   each incoming `Dealer` request. If the request's `message_ident` value
     *   matches, the provided `handler` function will be called.
     * @param handler - A function that will be called every time a matching
     *   request is received from `Dealer`. The request will be passed as an
     *   argument to this function.
     * @param plugin - An optional plugin name. If not provided, it will match
     *   messages from all plugins.
     */
    handlePushRequests(matcher, handler, plugin) {
        if (!matcher) {
            throw new TypeError('Push request "matcher" cannot be null.');
        }
        if (typeof handler !== 'function') {
            throw new TypeError('Push request callback cannot be null.');
        }
        const wrapper = (ev) => {
            const msg = ev.data.request;
            if (!msg.message_ident ||
                !msg.message_ident.match(matcher) ||
                (plugin && plugin !== ev.data.plugin)) {
                return;
            }
            Promise.resolve(handler(msg)).then(ev.data.reply);
        };
        wrapper.__matchRequestExp = matcher;
        wrapper.__matchRequestPlugin = plugin;
        // Store the wrapper in the function so we can remove it.
        handler.__matchRequestWrapper = wrapper;
        this._pluginMediator.on(PluginEvent.PLUGIN_REQUEST, wrapper);
    }
    /**
     * Removes a handler for a particular `Dealer` request.
     *
     * Note that you must pass the exact `matcher` and `handler` values as you
     * did when calling `handlePushRequest`.
     *
     * @param matcher - The string or RegExp matcher.
     * @param handler - The handler function.
     * @param plugin - An optional plugin name. If not provided, it will match
     *   messages from all plugins.
     * @return True if the handler was removed successfully, false otherwise.
     */
    unhandlePushRequests(matcher, handler, plugin) {
        if (typeof handler !== 'function') {
            throw new TypeError('Push request callback cannot be null.');
        }
        const wrapper = handler.__matchRequestWrapper;
        if (!wrapper ||
            wrapper.__matchRequestExp !== matcher ||
            wrapper.__matchRequestPlugin !== plugin) {
            return false;
        }
        this._pluginMediator.removeListener(PluginEvent.PLUGIN_REQUEST, wrapper);
        return true;
    }
    /**
     * Sends a request to a given URL and returns a `Promise` that will be
     * resolved to a response.
     *
     * Note that the `HTTPResponse` object from this request is implemented as
     * a generic, and the type of the `HTTPResponse.body` field will depend on
     * the value of `options.responseType` field:
     *
     * - `'arraybuffer'` - `ArrayBuffer | null`
     * - `'text'` or `''` - `string | null``
     * - `'json'` - `any | null`
     *
     * @param uri - The URI to request. This can be a normal HTTP/HTTPs URL, a
     *   partial relative path (e.g., '/home') or a "special" URL that will be
     *   expanded using the `Endpoints` from the `EndpointsProvider` (e.g.,
     *   '@webgate/melody/v1/time').
     * @param options - The request options.
     * @return A promise that will resolved to an `HTTPResponse` object.
     */
    request(uri, options) {
        var _a;
        // We create a different sent of request params, which we will pass as an
        // argument to the plugin mediator. This is needed to enable changing of
        // the request URL, which is a primitive type.
        const requestParams = { uri, options, context: {} };
        this._pluginMediator.emitSync(PluginEvent.TRANSPORT_BEFORE_PROCESS_REQUEST, requestParams);
        const sendRequest = this._sendRequest.bind(this, requestParams.uri, requestParams.options, requestParams.context);
        const shouldWaitForConnection = (!((_a = requestParams.options) === null || _a === void 0 ? void 0 : _a.allowOffline) &&
            !this._connectionObserver.isOnline()) ||
            (HTTP_SPECIAL_URL_EXP.test(requestParams.uri) &&
                !(this._stateMask & StateFlag.CONNECTED));
        if (shouldWaitForConnection) {
            return new Promise((resolve, reject) => {
                this.once(Event.CONNECTED, () => {
                    sendRequest().then(resolve, reject);
                });
            });
        }
        return sendRequest();
    }
    /**
     * Adds a plugin into the current instance.
     *
     * @param creator - The plugin creator function.
     * @param options - A set of options for the plugin, if any. Note that the
     *   options are different for each plugin. Check the plugin documentation for
     *   more details.
     * @return The name of the plugin that was added. Can be used as an argument
     *   to other methods like `removePlugin` and `hasPlugin`.
     */
    addPlugin(creator, options) {
        const plugin = creator(this, options);
        const name = plugin.name;
        if (this._plugins[name]) {
            throw new TypeError('Plugin is already added.');
        }
        plugin.attach(this, this._pluginMediator);
        this._plugins[name] = plugin;
        return name;
    }
    /**
     * Removes a plugin from the current instance.
     *
     * @param name - The name of the plugin to remove.
     * @return The value `true` if the plugin was successfully removed, or `false`
     *   if the plugin does not exist in the current instance.
     */
    removePlugin(name) {
        const plugin = this._plugins[name];
        if (!plugin) {
            return false;
        }
        plugin.detach(this, this._pluginMediator);
        this._plugins[name] = undefined;
        return true;
    }
    /**
     * Checks whether a plugin was added to the instance.
     *
     * @param name - The name of the plugin to check.
     * @return The value `true` if the plugin was added to this instance, `false`
     *   otherwise.
     */
    hasPlugin(name) {
        return !!this._plugins[name];
    }
    /**
     * Returns the API object of a plugin.
     *
     * Each plugin has a different set of APIs, so this method is generic and
     * can take an optional hint type parameter for the specific plugin's API
     * type.
     *
     * @example
     * import {
     *   DealerAPI
     *   DealerPlugin,
     * } from '@spotify-internal/transport/lib/plugins/dealer';
     *
       const pluginName = transport.addPlugin(DealerPlugin);
     * const dealerAPI = transport.getPluginAPI<DealerAPI>(pluginName);
     *
     * @typeParam T A hinting type param for type of the API. Defaults to
     *   `unknown`
     * @param name - The name of the plugin to retrieve the API for.
     * @return The API Object of the plugin, or null if the plugin does not
     *   specify an API or if the plugin was not added to the instance. If the
     *   type param `T` was specified, the API object will be cast to the value
     *   specified.
     */
    getPluginAPI(name) {
        const plugin = this._plugins[name];
        return plugin && plugin.api ? plugin.api : null;
    }
    /**
     * Returns the connection ID of the instance.
     *
     * @param pluginName - The name of the plugin whose connection id will be
     *   retrieve. Defaults to 'dealer'.
     * @return A promise that will be resolved with the connection id of the
     *   Dealer instance, or rejected with an error if the Transport instance
     *   does not have a `Dealer` instance.
     */
    getConnectionId(pluginName = 'dealer') {
        const plugin = this._plugins[pluginName];
        if (!plugin) {
            return Promise.reject(new TypeError(`Cannot retrieve connection id for plugin ${plugin}.`));
        }
        if (!plugin.api || !hasPluginSocketAPI(plugin)) {
            return Promise.reject(new TypeError(`Plugin ${plugin} is not a socket plugin.`));
        }
        return plugin.api.getConnectionInfo().then((info) => info.id);
    }
    /**
     * Remove all event listeners from the instance.
     *
     * NOTE: This is a NO-OP function. As a Transport instance can be used and
     * pass across multiple libraries and packages, exposing this method can lead
     * to hard to detect bugs. We therefore override this method explicitly and
     * disable the behaviour.
     *
     * @return The Transport instance.
     */
    removeAllListeners() {
        return this;
    }
}
//# sourceMappingURL=transport.js.map
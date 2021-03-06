var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { RCProperties, hashJsonValue, } from '@spotify-internal/remote-config-properties';
import { DEFAULT_BACKGROUND_FETCH_INTERVAL, MIN_BACKGROUND_FETCH_INTERVAL, } from './constants';
import RcsClient, { FetchType, ResolvedConfiguration, } from './rcsclient';
import { SingleItemCache } from './utils/cache';
import { logDeveloperWarning, swallowException } from './utils/logging';
import { defaultInstallationId, isValidInstallationId, } from './utils/installationid';
import { ScheduledTask } from './utils/schedule';
import { getLocalStorage, resolveOnLoad, resolveTimeout } from './utils/system';
import { TimeUnit } from './utils/timeunit';
import Configuration from './configuration';
import { Event } from './constants';
import { properties as implicitProperties } from './define';
export { defineEnum, defineBool, defineInt } from './define';
var singleItemCacheFactory = function (storage, name) {
    return new SingleItemCache(storage, name);
};
/**
 * # Resolver
 * Handles resolution of remote configuration, and acts as a map for accessing
 * configured properties in a type-safe way. Before an instance can start to serve serve
 * properties it needs to fetch a configuration and activate it.
 *
 * ## Resolver.Context
 * The resolve context contains all the information that RCS will
 * use to decide what configuration is applicable to your client. The Resolver
 * instance always has a context, and whenever the context changes it will need
 * to re-fetch configuration
 *
 * ## Fetching configuration
 *
 * ## Activate configuration
 *
 * ## Refresh
 *
 *
 */
var Resolver = /** @class */ (function (_super) {
    __extends(Resolver, _super);
    function Resolver(_a) {
        var clientId = _a.clientId, getToken = _a.getToken, transport = _a.transport, eventSender = _a.eventSender, webgateEndpoint = _a.webgateEndpoint, _b = _a.properties, properties = _b === void 0 ? { version: '0.0.0', properties: implicitProperties } : _b, _c = _a.storage, storage = _c === void 0 ? getLocalStorage() : _c, _d = _a.timeout, timeout = _d === void 0 ? 300 : _d, _e = _a.installationId, installationId = _e === void 0 ? defaultInstallationId(storage || undefined) : _e, _f = _a.backgroundFetchInterval, backgroundFetchInterval = _f === void 0 ? (storage && DEFAULT_BACKGROUND_FETCH_INTERVAL) ||
            undefined : _f, _g = _a.propertyOverrides, propertyOverrides = _g === void 0 ? {} : _g, _h = _a.cacheFactory, cacheFactory = _h === void 0 ? singleItemCacheFactory : _h;
        var _this = _super.call(this) || this;
        _this.context = null;
        _this.configuration = null;
        _this.brokenState = null;
        _this.pendingResolves = {};
        RCProperties.validate(properties);
        _this.clientId = clientId;
        _this.propertySet = RCProperties.toPropertySet(properties);
        _this.propertySetKey = _this.propertySet.getPropertySetKey({
            clientId: clientId,
            version: properties.version,
        });
        _this.propertyOverrides = propertyOverrides;
        _this.installationId = installationId;
        _this.timeout = timeout;
        _this.rcsClient = new RcsClient({
            clientId: clientId,
            installationId: installationId,
            getToken: getToken,
            transport: transport,
            eventSender: eventSender,
            webgateEndpoint: webgateEndpoint,
        });
        Object.entries(_this.propertyOverrides).forEach(function (_a) {
            var prop = _a[0], value = _a[1];
            var propertyDefinition = _this.propertySet.properties[prop];
            if (!propertyDefinition) {
                throw new Error("Local property override for `" + prop + "` is invalid: Property name has not been registered.");
            }
            if (!propertyDefinition.isValidValue(value)) {
                throw new Error("Local property override for `" + prop + "` is invalid: Property value is not valid (" + JSON.stringify(value) + ").");
            }
        });
        if (Object.keys(_this.propertyOverrides).length > 0) {
            Resolver.logDeveloperWarning('Local property overrides for Remote Config are being used:', _this.propertyOverrides);
        }
        if (!isValidInstallationId(installationId)) {
            _this.brokenState = 'Missing valid installationId';
        }
        if (storage) {
            var cache = cacheFactory(storage, "rcs:" + _this.clientId);
            _this.setupCacheStrategy(cache);
        }
        if (backgroundFetchInterval) {
            if (backgroundFetchInterval < MIN_BACKGROUND_FETCH_INTERVAL) {
                throw new Error("backgroundFetchInterval must be at least " + TimeUnit.stringify(MIN_BACKGROUND_FETCH_INTERVAL));
            }
            if (!storage) {
                Resolver.logDeveloperWarning("You have disabled storage but configured backgroundFetch. And explain how this doesn't make sense...");
            }
            _this.setupBackgroundFetchStrategy(backgroundFetchInterval);
        }
        // Refresh client whenever userKey has changed
        _this.on('refresh', function (prevContext) {
            var prevUserKey = prevContext && prevContext.userKey;
            var newUserKey = _this.context && _this.context.userKey;
            if (prevUserKey !== newUserKey)
                _this.rcsClient.refresh();
        });
        return _this;
    }
    /**
     * Low level method to refresh the context of this resolver.
     *
     * If the supplied context is different from the current context it will
     * deactivate and clear the current configuration so that a new fetch and
     * activate cycle needs to be performed before properties can be accessed
     * again.
     *
     * Calling with a null or no context will always clear the state.
     *
     * @param context -
     */
    Resolver.prototype.refresh = function (context) {
        if (context === void 0) { context = null; }
        if (typeof context !== 'object') {
            throw new TypeError('context must be of type object or null');
        }
        if (context === null ||
            hashJsonValue(this.context) !== hashJsonValue(context)) {
            this.updateContext(context);
        }
    };
    /**
     * Low level method to fetch a new configuration.
     *
     * The configuration will be updated if the call succeeds and the context
     * hasn't changed during the server request.
     */
    Resolver.prototype.fetch = function (_a) {
        var _b;
        var _c = _a === void 0 ? {} : _a, _d = _c.timeout, timeout = _d === void 0 ? this.timeout : _d, fetchType = _c.fetchType;
        return __awaiter(this, void 0, void 0, function () {
            var propertySetKey, contextHashAtStart, configuration, e_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (this.brokenState) {
                            Resolver.logDeveloperWarning("Will not fetch due to " + this.brokenState);
                            return [2 /*return*/, Promise.resolve(false)];
                        }
                        if (timeout === 0) {
                            // Short-circuiting
                            // When timeout is explictly set to 0, the first call is never going to succeed.
                            // Only delayed fetch shall be responsible for fetching configurations.
                            return [2 /*return*/, Promise.resolve(false)];
                        }
                        if (this.propertySet.size === 0) {
                            // Don't fetch if we don't have any properties.
                            return [2 /*return*/, Promise.resolve(false)];
                        }
                        propertySetKey = this.propertySetKey;
                        contextHashAtStart = hashJsonValue(this.context);
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.rcsClient.resolveConfig({
                                timeout: timeout,
                                propertySetKey: propertySetKey,
                                fetchType: fetchType,
                                authorize: Boolean((_b = this.context) === null || _b === void 0 ? void 0 : _b.userKey),
                            })];
                    case 2:
                        configuration = _e.sent();
                        // only update config if we're still in the same context
                        if (hashJsonValue(this.context) !== contextHashAtStart)
                            return [2 /*return*/, false];
                        this.fetchError = undefined;
                        this.updateConfiguration(configuration);
                        return [2 /*return*/, true];
                    case 3:
                        e_1 = _e.sent();
                        Resolver.logDeveloperWarning('Remote Config Resolver: Fetch failed.', e_1);
                        if (typeof e_1 === 'object') {
                            this.fetchError = e_1.message;
                        }
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Low level method to activate the current configuration.
     *
     * If no current configuration exists, the default configuration will be applied.
     */
    Resolver.prototype.activate = function () {
        this.updateActive(this.configuration);
    };
    /**
     * Automatically complete the whole refresh-fetch-activate cycle as necessary.
     *
     *"Automatically" method in Resolver can safely be called at any time, with or without a context. It
     * will try to use sensible defaults for required context values that are missing.
     */
    Resolver.prototype.resolve = function (context) {
        if (context === void 0) { context = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var key_1, e_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (typeof context !== 'object') {
                            throw new TypeError('context must be of type object or null');
                        }
                        key_1 = hashJsonValue(context);
                        if (!(key_1 in this.pendingResolves)) {
                            this.pendingResolves[key_1] = this.guardedLoad(context)
                                .catch(function (e) {
                                Resolver.swallowException(e);
                                _this.setActive(_this.propertySet.getDefaultValues());
                            })
                                .then(function () {
                                // finally
                                delete _this.pendingResolves[key_1];
                            });
                        }
                        return [4 /*yield*/, this.pendingResolves[key_1]];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        Resolver.swallowException(e_2);
                        this.setActive(this.propertySet.getDefaultValues());
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Resolver.prototype.setupCacheStrategy = function (cache) {
        var _this = this;
        this.on(Event.FETCH, function () {
            if (!_this.context || !_this.configuration)
                return;
            try {
                cache.set(hashJsonValue(_this.context), _this.configuration);
            }
            catch (e) {
                Resolver.swallowException(e);
            }
        });
        this.on(Event.REFRESH, function () {
            try {
                var configuration = cache.get(hashJsonValue(_this.context));
                if (configuration) {
                    _this.configuration = _this.filterInvalidGroups(configuration);
                }
            }
            catch (e) {
                Resolver.swallowException(e);
            }
        });
    };
    Resolver.prototype.filterInvalidGroups = function (_a) {
        var properties = _a.properties, config = __rest(_a, ["properties"]);
        var invalidGroups = new Set();
        for (var _i = 0, _b = Object.entries(properties); _i < _b.length; _i++) {
            var _c = _b[_i], name_1 = _c[0], value = _c[1];
            var def = this.propertySet.properties[name_1];
            if (!def || !def.isValid(value))
                invalidGroups.add(value.groupId);
        }
        var validProperties = {};
        for (var _d = 0, _e = Object.entries(properties); _d < _e.length; _d++) {
            var _f = _e[_d], key = _f[0], value = _f[1];
            if (!invalidGroups.has(value.groupId)) {
                validProperties[key] = value;
            }
        }
        return __assign(__assign({}, config), { properties: validProperties });
    };
    /**
     * Start fetching new configuration at a regular interval in the background
     *
     * Background fetching only occurs when the Resolver is activated.
     *
     * When the resolver first becomes active, if it hasn't yet fetched, i.e. the
     * configuration was loaded from storage. This strategy will schedule a fetch
     * for as soon as the system network is idle (onload in browsers).
     * @param millisecondInterval -
     */
    Resolver.prototype.setupBackgroundFetchStrategy = function (millisecondInterval) {
        var _this = this;
        var fetchTask = new ScheduledTask(function (fetchType) {
            _this.fetch({ timeout: false, fetchType: fetchType });
        });
        var hasFetched = false;
        var isActive = false;
        this.on(Event.REFRESH, function () {
            fetchTask.cancel();
            isActive = false;
            hasFetched = false;
        });
        this.on(Event.ACTIVATE, function () {
            if (isActive)
                return;
            isActive = true;
            fetchTask.reschedule(hasFetched
                ? resolveTimeout(millisecondInterval).then(function () { return FetchType.BACKGROUND_SYNC; })
                : resolveOnLoad().then(function () { return FetchType.DELAYED; }));
        });
        this.on(Event.FETCH, function () {
            hasFetched = true;
            if (!isActive)
                return;
            fetchTask.reschedule(resolveTimeout(millisecondInterval).then(function () { return FetchType.BACKGROUND_SYNC; }));
        });
    };
    Resolver.prototype.guardedLoad = function (context) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.refresh(context);
                        if (!!this.configuration) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fetch({ fetchType: FetchType.BLOCKING })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!this.activeProperties) {
                            this.activate();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Resolver.prototype.updateContext = function (context) {
        this.configuration = null;
        this.activeProperties = null;
        var prevContext = this.context;
        this.context = context ? Object.freeze(__assign({}, context)) : null;
        this.emit(Event.REFRESH, prevContext);
    };
    Resolver.prototype.updateConfiguration = function (configuration) {
        this.configuration = configuration;
        this.emit(Event.FETCH);
    };
    Resolver.prototype.updateActive = function (configuration) {
        this.setActive(this.propertySet.coerceValues(configuration ? configuration.properties : {}));
        this.emit(Event.ACTIVATE);
        this.logApplied(this.configuration).catch(function (e) {
            Resolver.swallowException(e);
        });
    };
    Resolver.prototype.setActive = function (values) {
        var _this = this;
        if (values) {
            var newValues_1 = __assign({}, values);
            Object.keys(this.propertyOverrides).forEach(function (prop) {
                var propValue = newValues_1[prop];
                if (propValue) {
                    newValues_1[prop] = {
                        type: propValue.type,
                        value: _this.propertyOverrides[prop],
                    };
                }
            });
            _super.prototype.setActive.call(this, newValues_1);
        }
        else {
            _super.prototype.setActive.call(this, null);
        }
    };
    Resolver.prototype.logApplied = function (configuration) {
        if (this.propertySet.size === 0) {
            // don't emit any event if we don't have any properties
            return Promise.resolve();
        }
        if (configuration === null) {
            return this.rcsClient.defaultConfigApplied(undefined, this.fetchError);
        }
        var rcsFetchTime = configuration.rcsFetchTime;
        var policyGroupIds = ResolvedConfiguration.getUniqueGroupIds(configuration);
        if (policyGroupIds.length === 0) {
            return this.rcsClient.defaultConfigApplied(configuration.configurationAssignmentId);
        }
        return this.rcsClient.configApplied(configuration.configurationAssignmentId, policyGroupIds, rcsFetchTime);
    };
    /* Kept as part of public API for backward compatibility */
    Resolver.logDeveloperWarning = logDeveloperWarning;
    Resolver.swallowException = swallowException;
    return Resolver;
}(Configuration));
// Feel free to change if you find a better way to get Event exported on Resolver.
var _Event = Event;
/* eslint-disable no-redeclare */
(function (Resolver) {
    /* eslint-enable no-redeclare */
    Resolver.Event = _Event;
})(Resolver || (Resolver = {}));
export { Resolver as default, Configuration, Event, Resolver };
//# sourceMappingURL=resolver.js.map
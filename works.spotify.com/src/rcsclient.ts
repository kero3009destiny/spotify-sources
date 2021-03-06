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
import { createBaseTransport, } from '@spotify-internal/transport';
import { TokenProvider } from './utils/token';
import { createEventSender, } from '@spotify-internal/event-sender';
import { createConfigurationApplied, createConfigurationAppliedNonAuth, createDefaultConfigurationApplied, createDefaultConfigurationAppliedNonAuth, } from './events';
import { logDeveloperWarning } from './utils/logging';
var WEBGATE_ENDPOINT = 'https://spclient.wg.spotify.com';
var RCS_BASE_URL = '@webgate/remote-config-resolver';
var DEFAULT_WEBGATE_HEADERS = {
    'App-Platform': 'browser',
    'Spotify-App-Version': '1.0.0',
};
export var ResolvedConfiguration;
(function (ResolvedConfiguration) {
    function getUniqueGroupIds(_a) {
        var properties = _a.properties;
        var groupIds = new Set();
        for (var _i = 0, _b = Object.values(properties); _i < _b.length; _i++) {
            var groupId = _b[_i].groupId;
            if (groupId)
                groupIds.add(groupId);
        }
        return Array.from(groupIds);
    }
    ResolvedConfiguration.getUniqueGroupIds = getUniqueGroupIds;
})(ResolvedConfiguration || (ResolvedConfiguration = {}));
function createDefaultTransport(getToken, webgateEndpoint) {
    if (webgateEndpoint === void 0) { webgateEndpoint = WEBGATE_ENDPOINT; }
    var transport = createBaseTransport({
        providers: {
            token: TokenProvider.toPromiseProvider(getToken),
            endpoints: function () {
                return Promise.resolve({
                    webgate: webgateEndpoint,
                    dealer: '',
                    webapi: '',
                });
            },
        },
    });
    transport.connect();
    return transport;
}
function timeoutWrapper(promise, timeout, timeoutError) {
    if (timeoutError === void 0) { timeoutError = new Error('Timeout'); }
    if (timeout === false || timeout < 0)
        return promise;
    return Promise.race([
        promise,
        new Promise(function (_, reject) {
            setTimeout(function () {
                reject(timeoutError);
            }, timeout);
        }),
    ]);
}
export var RefreshFlag;
(function (RefreshFlag) {
    RefreshFlag[RefreshFlag["NONE"] = 0] = "NONE";
    RefreshFlag[RefreshFlag["TRANSPORT"] = 1] = "TRANSPORT";
    RefreshFlag[RefreshFlag["EVENT_SENDER"] = 2] = "EVENT_SENDER";
})(RefreshFlag || (RefreshFlag = {}));
export var FetchType;
(function (FetchType) {
    FetchType["BACKGROUND_SYNC"] = "background_sync";
    FetchType["BLOCKING"] = "blocking";
    FetchType["DELAYED"] = "delayed";
})(FetchType || (FetchType = {}));
var RcsClient = /** @class */ (function () {
    function RcsClient(_a) {
        var getToken = _a.getToken, transport = _a.transport, eventSender = _a.eventSender, webgateEndpoint = _a.webgateEndpoint, clientConfig = __rest(_a, ["getToken", "transport", "eventSender", "webgateEndpoint"]);
        this.refreshFlag = RefreshFlag.NONE;
        if (!transport && !getToken) {
            throw new Error('Either transport or getToken must be provided');
        }
        if (transport && webgateEndpoint) {
            logDeveloperWarning('Found both "transport" and "webgateEndpoint" options. Ignoring webgateEndpoint.');
        }
        this.transport = transport !== null && transport !== void 0 ? transport : createDefaultTransport(getToken, webgateEndpoint);
        this.eventSender = eventSender !== null && eventSender !== void 0 ? eventSender : createEventSender({
            transport: this.transport,
        });
        this.clientConfig = clientConfig;
        if (!transport) {
            this.refreshFlag |= RefreshFlag.TRANSPORT;
        }
        if (!eventSender) {
            this.refreshFlag |= RefreshFlag.EVENT_SENDER;
        }
    }
    RcsClient.prototype.resolveConfig = function (_a) {
        var _b = _a.timeout, timeout = _b === void 0 ? false : _b, propertySetKey = _a.propertySetKey, fetchType = _a.fetchType, _c = _a.authorize, authorize = _c === void 0 ? false : _c;
        var _d = this.clientConfig, clientId = _d.clientId, installationId = _d.installationId;
        var path = "/v2/configs/platforms/web/clients/" + clientId + "/property-sets/" + propertySetKey + "?installation-id=" + installationId;
        if (fetchType) {
            path += "&fetch-type=" + fetchType;
        }
        return this.request(path, {
            method: 'GET',
            timeout: timeout,
            authorize: authorize,
        })
            .then(function (_a) {
            var _b = _a.properties, properties = _b === void 0 ? [] : _b, _c = _a.rcsFetchTime, rcsFetchTime = _c === void 0 ? '' : _c, configurationAssignmentId = _a.configurationAssignmentId;
            return ({
                configurationAssignmentId: configurationAssignmentId,
                properties: propertyMapFromResolved(properties),
                rcsFetchTime: rcsFetchTime,
                clientFetchTime: Date.now(),
            });
        })
            .catch(function (error) {
            if (error.status === 404) {
                logDeveloperWarning("Resolving configuration failed with 404. Maybe you forgot to publish after changing your properties?" +
                    "\n\n" +
                    "For more info see https://backstage.spotify.net/docs/remote-configuration-js-sdk/publish/");
            }
            throw error;
        });
    };
    RcsClient.prototype.configApplied = function (configurationAssignmentId, policyGroupIds, lastRcsFetchTime) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, clientId, installationId, createEvent;
            return __generator(this, function (_b) {
                _a = this.clientConfig, clientId = _a.clientId, installationId = _a.installationId;
                createEvent = this.transport.isAuthenticated()
                    ? createConfigurationApplied
                    : createConfigurationAppliedNonAuth;
                return [2 /*return*/, this.sendEvent(createEvent({
                        rc_client_id: clientId,
                        installation_id: installationId,
                        configuration_assignment_id: configurationAssignmentId,
                        policy_group_ids: policyGroupIds.map(Number),
                        last_rcs_fetch_time: lastRcsFetchTime,
                        platform: 'WEB',
                    }))];
            });
        });
    };
    RcsClient.prototype.defaultConfigApplied = function (configurationAssignmentId, reason) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, clientId, installationId, createEvent;
            return __generator(this, function (_b) {
                _a = this.clientConfig, clientId = _a.clientId, installationId = _a.installationId;
                createEvent = this.transport.isAuthenticated()
                    ? createDefaultConfigurationApplied
                    : createDefaultConfigurationAppliedNonAuth;
                return [2 /*return*/, this.sendEvent(createEvent({
                        rc_client_id: clientId,
                        installation_id: installationId,
                        configuration_assignment_id: configurationAssignmentId,
                        reason: reason,
                    }))];
            });
        });
    };
    RcsClient.prototype.refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            var refreshed, e_1, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        refreshed = RefreshFlag.NONE;
                        if (!(this.refreshFlag & RefreshFlag.EVENT_SENDER)) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.eventSender.flush()];
                    case 2:
                        _a.sent();
                        refreshed |= RefreshFlag.EVENT_SENDER;
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        if (!(this.refreshFlag & RefreshFlag.TRANSPORT)) return [3 /*break*/, 8];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.transport.forceTokenRefresh()];
                    case 6:
                        _a.sent();
                        refreshed |= RefreshFlag.TRANSPORT;
                        return [3 /*break*/, 8];
                    case 7:
                        e_2 = _a.sent();
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/, refreshed];
                }
            });
        });
    };
    RcsClient.prototype.request = function (path, _a) {
        var method = _a.method, payload = _a.payload, _b = _a.timeout, timeout = _b === void 0 ? false : _b, _c = _a.retries, retries = _c === void 0 ? 5 : _c, authorize = _a.authorize;
        var args = {
            method: method,
            headers: __assign({}, DEFAULT_WEBGATE_HEADERS),
            responseType: 'json',
            rejectNotOk: true,
            retry: { maxRetries: retries },
            authorize: authorize,
        };
        if (payload) {
            args.payload = JSON.stringify(payload);
            args.headers['Content-Type'] = 'application/json';
        }
        if (authorize && !this.transport.isAuthenticated()) {
            this.transport.authenticate();
        }
        return timeoutWrapper(this.transport
            .request(RCS_BASE_URL + path, args)
            .then(function (_a) {
            var body = _a.body;
            return body;
        }), timeout, new Error('RcsClient request timeout'));
    };
    RcsClient.prototype.sendEvent = function (event) {
        if (!('send' in this.eventSender)) {
            // event-sender 1.x.x
            // @ts-ignore
            this.eventSender.log(event);
            return Promise.resolve();
        }
        return this.eventSender.send(event, {
            authorize: this.transport.isAuthenticated(),
            flush: true,
        });
    };
    return RcsClient;
}());
export default RcsClient;
function propertyMapFromResolved(values) {
    if (values === void 0) { values = []; }
    var map = Object.create(null);
    for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
        var spec = values_1[_i];
        var groupId = spec.groupId;
        if (!!spec.boolValue) {
            map[spec.name] = { type: 'bool', value: spec.boolValue.value, groupId: groupId };
        }
        else if (!!spec.intValue) {
            map[spec.name] = { type: 'int', value: spec.intValue.value, groupId: groupId };
        }
        else if (!!spec.enumValue) {
            map[spec.name] = { type: 'enum', value: spec.enumValue.value, groupId: groupId };
        }
    }
    return map;
}
//# sourceMappingURL=rcsclient.js.map
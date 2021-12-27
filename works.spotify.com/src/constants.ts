import { TimeUnit } from './utils/timeunit';
export var CONFIG_STORAGE_KEY = 'com.spotify.rcs.configuration';
export var INSTALLATION_ID_STORAGE_KEY = 'com.spotify.rcs.installationId';
export var INSTALLATION_ID_COOKIE_KEY = 'sp_t';
export var DEFAULT_BACKGROUND_FETCH_INTERVAL = 1 * TimeUnit.HOUR;
export var MIN_BACKGROUND_FETCH_INTERVAL = 30 * TimeUnit.SECOND;
export var Event;
(function (Event) {
    Event["FETCH"] = "fetch";
    Event["ACTIVATE"] = "activate";
    Event["REFRESH"] = "refresh";
    Event["CHANGE"] = "change";
})(Event || (Event = {}));
//# sourceMappingURL=constants.js.map
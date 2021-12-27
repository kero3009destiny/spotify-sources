import { Event, } from '@spotify-internal/remote-config-resolver';
import { useContext, useEffect, useReducer, useState } from 'react';
import RemoteConfigContext from './remoteConfigContext';
/**
 * A react hook to get the RCS configuration. Please check `isActive` property before calling `getInt`/`getBool`/`getEnum` method on the instance.
 * @param options - Options for getting property
 * @throws SuspenseError
 */
export function useConfiguration(options) {
    if (options === void 0) { options = {}; }
    var _a = options.Context, Context = _a === void 0 ? RemoteConfigContext : _a;
    var config = useContext(Context);
    var _b = useReducer(function (state) { return state + 1; }, 0), forceRender = _b[1];
    if (!config)
        throw new Error('RemoteConfigContext is undefined');
    useEffect(function () {
        config.on(Event.CHANGE, forceRender);
        return function () {
            config.off(Event.CHANGE, forceRender);
        };
    }, [config]);
    return config;
}
function withConfig(options, fn) {
    var conf = useConfiguration(options);
    var _a = useState(function () { return fn(conf); }), value = _a[0], setValue = _a[1];
    useEffect(function () {
        var updateValue = function () { return setValue(fn(conf)); };
        conf.on(Event.CHANGE, updateValue);
        return function () {
            conf.removeListener(Event.CHANGE, updateValue);
        };
    });
    return value;
}
/**
 * A react hook to get property's value
 * @param ref - Reference to property definition (done using `defineXxx`)
 * @param options - Options for getting property
 * @throws SuspenseError
 */
export function useProperty(ref, options) {
    if (options === void 0) { options = {}; }
    return withConfig(options, function (config) { return config.getValue(ref); });
}
/**
 * A react hook to get int property's value
 * @param ref - Reference to property definition (done using `defineInt`)
 * @param options - Options for getting property
 * @throws SuspenseError
 */
export function useInt(key, options) {
    return withConfig(options, function (config) { return config.getInt(key); });
}
/**
 * A react hook to get boolean property's value
 * @param ref - Reference to property definition (done using `defineBool`)
 * @param options - Options for getting property
 * @throws SuspenseError
 */
export function useBool(key, options) {
    return withConfig(options, function (config) { return config.getBool(key); });
}
/**
 * A react hook to get enum property's value
 * @param ref - Reference to property definition (done using `defineEnum`)
 * @param options - Options for getting property
 * @throws SuspenseError
 */
export function useEnum(key, options) {
    return withConfig(options, function (config) { return config.getEnum(key); });
}
//# sourceMappingURL=hooks.js.map
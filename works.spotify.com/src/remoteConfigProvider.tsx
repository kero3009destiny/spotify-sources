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
import React, { useState, useEffect, useRef } from 'react';
import RemoteConfigContext from './remoteConfigContext';
import Resolver from '@spotify-internal/remote-config-resolver';
var RemoteConfigProvider = function (props) { return (React.createElement(RemoteConfigContext.Provider, { value: createResolver(props) }, props.children)); };
export default RemoteConfigProvider;
// export for testing
export function createResolver(props) {
    if ('resolver' in props) {
        return props.resolver;
    }
    var context = props.context, token = props.token, config = __rest(props, ["context", "token"]);
    var tokenPromise = useRef(Promise.resolve(''));
    tokenPromise.current = useLatest(token);
    var configuration = useState(function () {
        if (!('transport' in config || 'getToken' in config)) {
            config.getToken = function () { return tokenPromise.current; };
        }
        return new Resolver(config);
    })[0];
    useEffect(function () {
        if (context !== undefined) {
            configuration.resolve(context);
        }
    }, [context]);
    return configuration;
}
// return a promise that resolves to the latest defined value
function useLatest(value) {
    var resolver = useRef(function () { });
    var promise = new Promise(function (resolve) {
        var prev = resolver.current;
        resolver.current = function (value) {
            prev(value);
            resolve(value);
        };
    });
    if (typeof value !== 'undefined') {
        resolver.current(value);
        resolver.current = function () { };
    }
    return promise;
}
//# sourceMappingURL=remoteConfigProvider.js.map
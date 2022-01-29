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
import { globalTracer, initGlobalTracer } from 'opentracing';
import { LIGHTSTEP_ACCESS_TOKEN, LIGHTSTEP_TEST_ACCESS_TOKEN, LIGHTSTEP_SATELLITE_ENDPOINT, LIGHTSTEP_SATELLITE_TEST_ENDPOINT, } from './config';
import { StackdriverTracer } from './Tracer';
import { omitUndefined } from './util';
let isTracerInitialized = false;
export function setupTracer(_a) {
    var { dev, url_exclusion_patterns, url_inclusion_patterns, xhr_url_exclusion_patterns, xhr_url_inclusion_patterns, fetch_url_exclusion_patterns, fetch_url_inclusion_patterns, nodejs_url_exclusion_patterns, nodejs_url_inclusion_patterns, xhr_instrumentation = false, fetch_instrumentation = false, nodejs_instrumentation = false } = _a, rest = __rest(_a, ["dev", "url_exclusion_patterns", "url_inclusion_patterns", "xhr_url_exclusion_patterns", "xhr_url_inclusion_patterns", "fetch_url_exclusion_patterns", "fetch_url_inclusion_patterns", "nodejs_url_exclusion_patterns", "nodejs_url_inclusion_patterns", "xhr_instrumentation", "fetch_instrumentation", "nodejs_instrumentation"]);
    if (isTracerInitialized) {
        return globalTracer();
    }
    isTracerInitialized = true;
    const joinPatterns = (a, b) => {
        const result = [...(a || []), ...(b || [])];
        if (!result.length)
            return undefined;
        return result;
    };
    const _url_patterns_no_undefined = omitUndefined({
        xhr_url_inclusion_patterns: joinPatterns(url_inclusion_patterns, xhr_url_inclusion_patterns),
        xhr_url_exclusion_patterns: joinPatterns(url_exclusion_patterns, xhr_url_exclusion_patterns),
        fetch_url_exclusion_patterns: joinPatterns(url_exclusion_patterns, fetch_url_exclusion_patterns),
        fetch_url_inclusion_patterns: joinPatterns(url_inclusion_patterns, fetch_url_inclusion_patterns),
        nodejs_url_exclusion_patterns: joinPatterns(url_exclusion_patterns, nodejs_url_exclusion_patterns),
        nodejs_url_inclusion_patterns: joinPatterns(url_inclusion_patterns, nodejs_url_inclusion_patterns),
    });
    const tracer = new StackdriverTracer(Object.assign(Object.assign({ access_token: dev ? LIGHTSTEP_TEST_ACCESS_TOKEN : LIGHTSTEP_ACCESS_TOKEN, collector_host: dev
            ? LIGHTSTEP_SATELLITE_TEST_ENDPOINT
            : LIGHTSTEP_SATELLITE_ENDPOINT, collector_encryption: 'tls', transport: 'thrift', xhr_instrumentation,
        fetch_instrumentation,
        nodejs_instrumentation, include_cookies: false, verbosity: dev ? 4 : 1 }, _url_patterns_no_undefined), rest));
    initGlobalTracer(tracer);
    return tracer;
}
//# sourceMappingURL=setup.js.map
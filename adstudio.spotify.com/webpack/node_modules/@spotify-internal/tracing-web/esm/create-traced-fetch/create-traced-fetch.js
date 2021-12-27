var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import createDebug from 'debug';
import { FORMAT_HTTP_HEADERS } from 'opentracing';
import { addDefaultRequestTags, addDefaultResponseTags, } from '../spans/fetch-helpers';
import { withError } from '../spans/error-helpers';
import { addWebgateServiceNameTag } from '../spans/spotify-helpers';
const dbg = createDebug('tracing:fetch');
export function createTracedFetch(platform, options) {
    const { fetch: originalFetch, RequestCtor = Request } = platform;
    const { tracer, shouldTrace = () => true, beforeRequest = (span, req) => {
        addWebgateServiceNameTag(span, req);
        addDefaultRequestTags(span, req);
    }, afterResponse = (span, res) => {
        addDefaultResponseTags(span, res);
    }, extractOperation = () => 'fetch', } = options;
    return function tracedFetch(input, init) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = new RequestCtor(input, init);
            dbg('fetch %s', request.url);
            if (!shouldTrace(request)) {
                dbg('skipping %s', request.url);
                return originalFetch(request);
            }
            const operation = extractOperation(request);
            const span = tracer.startSpan(operation, {
                childOf: init && init.parentSpan ? init.parentSpan : undefined,
            });
            const carrier = {};
            tracer.inject(span.context(), FORMAT_HTTP_HEADERS, carrier);
            Object.keys(carrier).forEach(key => {
                if (!request.headers.get(key))
                    request.headers.set(key, carrier[key]);
            });
            beforeRequest(span, request);
            let response;
            try {
                span.log({ event: 'request send' });
                response = yield originalFetch(request);
            }
            catch (err) {
                withError(span, err);
                span.finish();
                throw err;
            }
            span.log({ event: 'response received' });
            afterResponse(span, response);
            span.finish();
            return response;
        });
    };
}
export function createTracedUnknownFetch(platform, options) {
    return createTracedFetch({
        fetch: platform.fetch,
        RequestCtor: platform.RequestCtor || Request,
    }, options);
}
//# sourceMappingURL=create-traced-fetch.js.map
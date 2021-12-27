import { Tags as OTTags } from 'opentracing';
import * as Tags from './tags';
export function extractHostname(req) {
    try {
        const parsed = new URL(req.url);
        return parsed.hostname;
    }
    catch (_a) {
        return null;
    }
}
export function addDefaultRequestTags(span, req) {
    const parsed = new URL(req.url);
    span.addTags({
        [OTTags.HTTP_METHOD]: req.method,
        [OTTags.HTTP_URL]: req.url,
        [Tags.HTTP_MODE]: req.mode,
        [Tags.HTTP_HASH]: parsed.hash,
        [Tags.HTTP_HREF]: parsed.href,
        [Tags.HTTP_PROTOCOL]: parsed.protocol,
        [Tags.HTTP_ORIGIN]: parsed.origin,
        [Tags.HTTP_HOST]: parsed.host,
        [Tags.HTTP_HOSTNAME]: parsed.hostname,
        [Tags.HTTP_PORT]: parsed.port,
        [Tags.HTTP_PATHNAME]: parsed.pathname,
        [Tags.HTTP_SEARCH]: parsed.search,
        [Tags.OPERATION_KIND]: 'fetch',
    });
}
export function addDefaultResponseTags(span, res) {
    span.addTags({
        [Tags.HTTP_RES_REDIRECTED]: res.redirected,
        [Tags.HTTP_RES_TYPE]: res.type,
        [Tags.HTTP_RES_URL]: res.url,
        [Tags.HTTP_RES_OK]: res.ok,
    });
    span.setTag(OTTags.HTTP_STATUS_CODE, res.status);
    const statusCodeGroup = `${Math.floor(res.status / 100)}XX`;
    if (statusCodeGroup) {
        span.setTag(Tags.HTTP_STATUS_CODE_GROUP, statusCodeGroup);
    }
    if (res.status >= 500) {
        span.setTag(OTTags.ERROR, true);
        span.log({ 'error.status_text': res.statusText });
    }
}
//# sourceMappingURL=fetch-helpers.js.map
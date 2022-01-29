import * as Tags from './tags';
export function addServiceInfoTags(span, serviceVersion, serviceHash) {
    span.addTags({
        [Tags.SERVICE_VERSION]: serviceVersion,
        [Tags.SERVICE_HASH]: serviceHash,
    });
}
export function extractWebgateInfo(req) {
    const wgRegex = /wg\.spotify\.com\/([^/?]+)/;
    const match = wgRegex.exec(req.url);
    if (!match || !match[1])
        return null;
    return { service: match[1] };
}
export function addWebgateServiceNameTag(span, req) {
    const info = extractWebgateInfo(req);
    if (!info)
        return;
    span.setTag(Tags.WEBGATE_SERVICE, info.service);
}
//# sourceMappingURL=spotify-helpers.js.map
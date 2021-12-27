import { TransportErrors } from '../../enums/errors';
import { XResolveError } from '../../error/xresolve';
const RESOLVER_URL = 'https://apresolve.spotify.com/';
const WellKnownMapping = {
    DEALER: 'dealer',
    WEBGATE: 'spclient',
};
const DEALER_FALLBACK_URL = 'dealer.spotify.com';
const WEB_API = 'https://api.spotify.com/';
const WEBGATE_FALLBACKS = {
    spclient: 'spclient.wg.spotify.com',
    exp: 'exp.wg.spotify.com',
    partners: 'partners.wg.spotify.com',
};
/**
 * Creates a new XResolve Provider for use as an EndpointsProvider for a
 * Transport instance.
 *
 * Note that this function is a factory for an EndpointsProvider function. You
 * must call it prior to giving it to Transport
 *
 * @example // INCORRECT createTransport({ providers: { endpoints:
 * createProvider // WRONG! } });
 *
 * // Correct createTransport({ providers: { endpoints: createProvider() // Works! } });
 *
 * @param mappings - A map of endpoint types to the desired endpoint names. By
 *   default, the mappings used are {DEALER: 'dealer', WEBGATE: 'webgate'}. An
 *   application can change the type of dealer or webgate to use using this
 *   mapping. For example, setting {WEBGATE: 'exp'} will make the XResolve
 *   provider request experimental webgate endpoints instead.
 * @returns An EndpointsProvider function that can be passed to the
 *   createTransport() function.
 */
export function createProvider(mappings = {}) {
    const types = {
        dealer: mappings.dealer || WellKnownMapping.DEALER,
        webgate: mappings.webgate || WellKnownMapping.WEBGATE,
    };
    const url = `${RESOLVER_URL}?type=${types.dealer}&type=${types.webgate}`;
    return function (transport) {
        return transport
            .request(url, {
            forcePolyfill: true,
            responseType: 'json',
            retry: {
                maxRetries: 3,
                curve: 'exponential',
                condition: function (response, statusFamily) {
                    // We have a fairly strict 2xx requirement here, since we want to
                    // ensure that we can connect.
                    return response.getStatusFamily() !== statusFamily.SUCCESS;
                },
            },
            metadata: {
                // Ensure that this goes through always.
                noRequestTransform: true,
            },
        })
            .then((response) => {
            var _a, _b, _c, _d, _e;
            const body = response.body;
            const result = {
                dealer: (_b = (_a = body === null || body === void 0 ? void 0 : body[types.dealer]) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : DEALER_FALLBACK_URL,
                webgate: (_e = (_d = (_c = body === null || body === void 0 ? void 0 : body[types.webgate]) === null || _c === void 0 ? void 0 : _c[0]) !== null && _d !== void 0 ? _d : WEBGATE_FALLBACKS[types.webgate]) !== null && _e !== void 0 ? _e : WEBGATE_FALLBACKS.spclient,
                webapi: WEB_API,
            };
            if (!result.dealer || !result.webgate) {
                throw new XResolveError(TransportErrors.XRESOLVE_INCOMPLETE_RESPONSE, 'X-Resolve responded with incomplete results.', response.status);
            }
            return result;
        })
            .then((result) => {
            // Ensure that we prefix with protocols.
            result.dealer = `wss://${result.dealer.replace(/:443$/, '')}`;
            result.webgate = `https://${result.webgate.replace(/:443$/, '')}`;
            return result;
        });
    };
}
//# sourceMappingURL=xresolve.js.map
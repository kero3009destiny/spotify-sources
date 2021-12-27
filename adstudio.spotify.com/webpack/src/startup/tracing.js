import {
  createTracedFetch,
  FetchHelpers,
  setupTracer,
  SpotifyHelpers,
} from '@spotify-internal/tracing-web';

export const initTracing = env => {
  const tracer = setupTracer({
    dev: !(env === 'production'),
    component_name: 'voltron-ui',
    /*
      overwrite default verbosity of dev = 4, so we can use our chrome extension to toggle it
      https://ghe.spotify.net/tracing/tracing-web/blob/9c8b7504936ea0e63f9f07dd539f841b9e5fc7dc/src/lightstep/setup.ts#L95
    */
    verbosity: window.__ENABLE_LOGGING__ ? 4 : 0,
  });

  const fetch = createTracedFetch(
    { fetch: window.fetch },
    {
      tracer,
      shouldTrace: req => {
        const domainsSupportingTracing = [
          'https://adstudio-app-api.spotify.com',
          'https://adstudio-app-api-sandbox.spotify.net',
          'https://spclient.wg.spotify.com',
          'https://exp.wg.spotify.com',
          'https://api.spotify.com',
          'https://edge-grpc.spotify.com',
          'https://edge-proxy-internal-guc.spotify.net',
          'https://guc-spclient.spotify.com',
          'https://api-partner.spotify.com',
        ];
        const excludedPaths = ['/v1/artists'];
        return (
          domainsSupportingTracing.some(p => req.url.includes(p)) &&
          !excludedPaths.some(p => req.url.includes(p))
        );
      },
      beforeRequest: async (span, req) => {
        span.setTag('span.kind', 'client');

        SpotifyHelpers.addWebgateServiceNameTag(span, req);
        FetchHelpers.addDefaultRequestTags(span, req);

        if (req.method === 'POST') {
          const reqBody = await req.clone().json();
          if ('adAccountId' in reqBody) {
            span.setTag('adstudio.ad_account_id', reqBody.adAccountId);
          }
        }
      },
      extractOperation: req => {
        try {
          const parsed = new URL(req.url);
          return parsed.pathname;
        } catch {
          return req.url;
        }
      },
    },
  );

  window.fetch = fetch;
};

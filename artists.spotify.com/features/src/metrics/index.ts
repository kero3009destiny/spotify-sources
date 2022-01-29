import type { NextWebVitalsMetric } from 'next/app';
import Router from 'next/router';
import {
  BrowserMetrics,
  createUniversalReporter,
  createSemanticMetrics,
  SemanticAggregatorReporter,
} from '@spotify-internal/semantic-metrics';

const reporter = process.browser
  ? // client-side reporter
    // https://backstage.spotify.net/docs/semantic-metrics-js/reporters/#eventsenderreporter
    createUniversalReporter()
  : // server-side reporter
    // https://backstage.spotify.net/docs/semantic-metrics-js/reporters/#semanticaggregatorreporter
    new SemanticAggregatorReporter();

export const sendMetric = process.env.SPOTIFY_COMPONENT_ID
  ? createSemanticMetrics({
      dev: process.env.NODE_ENV !== 'production',
      key: process.env.SPOTIFY_COMPONENT_ID,
      reporter: [reporter],
    }).sendMetric
  : async () => {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn('process.env.SPOTIFY_COMPONENT_ID not set');
      }
    };

/**
 * Report web vitals and custom next.js metrics to semantic metrics.
 * @see https://backstage.spotify.net/docs/semantic-metrics-js/metrics/#web-vitals
 */
export function reportWebVitals(metric: NextWebVitalsMetric) {
  sendMetric(
    BrowserMetrics.getWebVitalsMetric(metric, {
      route: Router.router?.route ?? 'unknown',
    }),
  );
}

import React from 'react';
import NextApp from 'next/app';
import Router from 'next/router';
import Head from 'next/head';
import '@spotify-internal/encore-web/css/encore-light-theme.css';
import { GlobalStyles } from '@spotify-internal/encore-web';
import { BrowserMetrics, WebVital } from '@spotify-internal/semantic-metrics';

import GlobalFonts from '../helpers/fonts';
import { sendMetric, withRouteMetrics } from '../helpers/semanticMetrics';

import { ErrorBoundaryProvider } from '../components/ErrorBoundary';
import GlobalAppStyles from '../components/GlobalAppStyles';

class CustomApp extends NextApp {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>{pageProps.title || 'Spotify Payments'}</title>{' '}
          <link
            rel="preload"
            href="https://open.scdn.co/fonts/CircularSpUIv3T-Book.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="true"
          />
          <link
            rel="preload"
            href="https://open.scdn.co/fonts/CircularSpUIv3T-Black.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="true"
          />
          <link
            rel="preload"
            href="https://open.scdn.co/fonts/CircularSpUIv3T-Bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="true"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="144x144"
            href="https://www.scdn.co/i/_global/touch-icon-144.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="114x114"
            href="https://www.scdn.co/i/_global/touch-icon-114.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="72x72"
            href="https://www.scdn.co/i/_global/touch-icon-72.png"
          />
          <link rel="apple-touch-icon-precomposed" href="https://www.scdn.co/i/_global/touch-icon-57.png" />
          <link rel="icon" href="https://www.scdn.co/i/_global/favicon.png" key="icon" />
        </Head>
        <GlobalStyles />
        <GlobalAppStyles />
        <GlobalFonts />
        <ErrorBoundaryProvider>
          <Component {...pageProps} />
        </ErrorBoundaryProvider>
      </React.Fragment>
    );
  }
}

export function reportWebVitals(metric: WebVital) {
  sendMetric(
    BrowserMetrics.getWebVitalsMetric(metric, {
      route: Router.router?.route ?? 'unknown',
    }),
  );
}

export default withRouteMetrics(CustomApp);

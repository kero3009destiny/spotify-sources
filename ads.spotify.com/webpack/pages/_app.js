import React from 'react';
import Router from 'next/router';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import flowRight from 'lodash/flowRight';
import get from 'lodash/get';
import includes from 'lodash/includes';

import withApolloClient from 'apollo/client';
import { AppProvider } from 'contexts';
import {
  ModalForm,
  FooterForm,
  Footer,
  Navigation,
} from 'components/organisms';
import { CookieBanner } from 'components/molecules';
import { MetaTags, SkipToMain } from 'components/atoms';
import { COOKIE_BANNER_QUERY } from 'queries/cookie-banner';
import { CODE_404 } from 'constants/errors';
import { AUTH_PAGE } from 'constants/auth';
import {
  FOOTER_QUERY,
  DYNAMIC_COLLECTION as FOOT_COLLECTION,
} from 'queries/footer';
import {
  NAVIGATION_QUERY,
  DYNAMIC_COLLECTION as NAV_COLLECTION,
} from 'queries/navigation';
import {
  Analytics,
  pageTrack,
  eventTrack,
  OPTIMIZE_ACTIVATE,
} from 'utils/google-tag-manager';
import { appWithTranslation, i18n } from 'i18n/nexti18n';
import { getCollectionName } from 'utils/get-collection-name';
import { getCookieObject } from 'utils/get-cookie-object';
import { getURL } from 'utils/get-url';
import { supportedLocaleCodes } from 'i18n/config';
import { cssGlobals } from 'styles/variables';
import { urlSplit } from 'utils/url-split';
import * as cache from 'utils/cache-handler';

import GlobalStyle from 'styles';

const { SENTRY_DNS: sentryDNS } = require('env');
const { version: appVersion } = require('package.json');

const environment = process.env.NODE_ENV || 'development';

const MAX_URL_DEPTH = 3; // eg. 'locale/tag/slug'
const MAIN_NAVIGATION_SLUG = 'global-navigation';
const FOOTER_SLUG = 'global-footer';
const [defaultLocale] = supportedLocaleCodes;

Sentry.init({
  dsn: sentryDNS,
  integrations: [new Integrations.BrowserTracing()],
  release: `stargate@${appVersion}` || 'unknown',
  environment,
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  // See https://docs.sentry.io/clients/javascript/config/#config-whitelist-urls
  whitelistUrls: [
    'https://ads.spotify.com',
    'stargate.services.guc3.spotify.net',
    'stargate-staging.services.guc3.spotify.net',
    'stargate-preview.services.guc3.spotify.net',
    'localhost',
    'ads-local.spotify.com',
  ],
  sampleRate: 0.2,
});

class MyApp extends App {
  static async getInitialProps(appContext) {
    const {
      ctx: {
        apolloClient,
        asPath,
        req,
        res = {},
        query: { locale },
      },
    } = appContext;

    const isAuthScreen = new RegExp(`^/${AUTH_PAGE}/?$`).test(asPath);
    const appProps = await App.getInitialProps(appContext);
    const cookie = get(req, 'headers.cookie');

    try {
      /**
       * Checks locales against supported locale list, if not found, redir to
       * en-US (default)
       */
      if (
        req &&
        res &&
        !isAuthScreen &&
        !supportedLocaleCodes.includes(locale) &&
        !includes(req.url, defaultLocale) &&
        req.url.split('/').slice(1).length <= MAX_URL_DEPTH - 1 && // prevents infinite redirects
        !res.headersSent
      ) {
        res.writeHead(301, {
          Location: `/${defaultLocale}${req.url}`,
        });
        res.end();
      }

      // Updates `Content-Language`, if necessary
      if (
        req &&
        res &&
        !isAuthScreen &&
        supportedLocaleCodes.includes(locale) &&
        res.getHeader('Content-Language') !== locale &&
        !res.headersSent
      ) {
        res.setHeader('Content-Language', locale);
      }
    } catch (err) {
      console.error(`[app] Error: ${err}`);
    }

    const currentLanguage = req ? req.language : i18n.language;
    if (locale && currentLanguage !== locale) i18n.changeLanguage(locale);

    if (isAuthScreen) {
      return {
        ...appProps,
        locale: defaultLocale,
        appUrl: getURL({ req, path: asPath }),
        statusCode: res.statusCode || 200,
        isAuthScreen,
      };
    }

    // Navigation query
    const navCollection = getCollectionName(
      supportedLocaleCodes,
      locale,
      NAV_COLLECTION,
    );
    const cacheNavKey = `${MAIN_NAVIGATION_SLUG}/${locale || defaultLocale}`;
    const { data: navigationData } =
      cache.get(cacheNavKey) ||
      (await apolloClient
        .query({
          query: NAVIGATION_QUERY(navCollection),
          variables: {
            slug: MAIN_NAVIGATION_SLUG,
            locale,
          },
        })
        .then(response => {
          if (get(response, `data.${navCollection}.items`)) {
            cache.set(cacheNavKey, response);
          }

          return response;
        }));

    // Footer query
    const footCollection = getCollectionName(
      supportedLocaleCodes,
      locale,
      FOOT_COLLECTION,
    );
    const cacheFooterKey = `${FOOTER_SLUG}/${locale || defaultLocale}`;
    const { data: footerData } =
      cache.get(cacheFooterKey) ||
      (await apolloClient
        .query({
          query: FOOTER_QUERY(footCollection),
          variables: {
            slug: FOOTER_SLUG,
          },
        })
        .then(response => {
          if (get(response, `data.${footCollection}.items`)) {
            cache.set(cacheFooterKey, response);
          }

          return response;
        }));

    const cacheCookieKey = `cookie-banner/${locale || defaultLocale}`;
    // Cookie Banner query and cookie value
    const { data: cookieBannerData } =
      cache.get(cacheCookieKey) ||
      (await apolloClient
        .query({
          query: COOKIE_BANNER_QUERY,
          variables: {
            locale: supportedLocaleCodes.includes(locale)
              ? locale
              : defaultLocale,
          },
        })
        .then(response => {
          if (get(response, `data.cookieBannerCollection.items`)) {
            cache.set(cacheCookieKey, response);
          }

          return response;
        }));

    return {
      ...appProps,
      locale,
      appUrl: getURL({ req, path: asPath }),
      statusCode: res.statusCode || 200,
      footerData,
      footCollection,
      navigationData,
      navCollection,
      cookieBannerData,
      localeNudge: req && req.localeNudge,
      cookieFromHeaders: cookie && getCookieObject(cookie),
    };
  }

  state = {
    isAntiFlickerActive: true,
  };

  componentDidMount() {
    const { locale } = this.props;

    Analytics.init()
      .then(() => {
        // Initialize optimize with activation event on mount
        setTimeout(
          () =>
            eventTrack(OPTIMIZE_ACTIVATE, {
              eventCallback: () =>
                this.setState({ isAntiFlickerActive: false }),
            }),
          1,
        );
      })
      .catch(() => {
        document.body.classList.remove(cssGlobals.antiFlicker);
        this.setState({ isAntiFlickerActive: false });
      });
    Router.events.on('routeChangeComplete', this.handleRouteChangeComplete);
    if (i18n.language !== locale) i18n.changeLanguage(locale);
  }

  componentWillUnmount() {
    Router.events.off('routeChangeComplete', this.handleRouteChangeComplete);
  }

  /**
   * Fires a page tracking event on route change
   * NOTE: Using requestAnimationFrame here because of an issue with the document.title
   * on routeChangeComplete https://github.com/zeit/next.js/issues/6025
   *
   * @param {string} url - https://nextjs.org/docs/api-reference/next/router#routerevents
   */
  handleRouteChangeComplete = url => {
    Analytics.reset();
    requestAnimationFrame(() => {
      pageTrack({
        path: url,
        title: document.title,
      });
    });

    // Initialize optimize with activation event on route change
    eventTrack(OPTIMIZE_ACTIVATE);

    const { hash } = urlSplit(url);

    if (hash) {
      const element = document.getElementById(
        decodeURIComponent(hash.slice(1)),
      );

      if (element) {
        window.scrollTo({
          top: window.pageYOffset + element.getBoundingClientRect().top,
          behavior: 'smooth',
        });
      }
    }
  };

  render() {
    const {
      Component,
      pageProps,
      apollo,
      locale,
      appUrl,
      footerData,
      footCollection,
      statusCode,
      navigationData,
      navCollection,
      cookieBannerData,
      isAuthScreen,
      cookieFromHeaders,
      localeNudge,
    } = this.props;

    const meta = get(pageProps, 'pageData.meta', {}) || {};
    const noIndex = get(pageProps, 'pageData.pageIndexation') || '';
    const isCurrentPageNotFound = statusCode === CODE_404;

    return (
      <>
        <MetaTags
          meta={meta}
          appUrl={appUrl}
          locale={locale}
          showHreflang={!isCurrentPageNotFound}
          noIndex={noIndex}
        />
        <GlobalStyle />
        <SkipToMain />
        <ApolloProvider client={apollo}>
          <AppProvider
            locale={locale}
            cookieFromHeaders={cookieFromHeaders}
            localeNudge={localeNudge}
            isAntiFlickerActive={this.state.isAntiFlickerActive}
          >
            {navigationData && (
              <Navigation
                data={navigationData}
                collectionName={navCollection}
              />
            )}
            <main id="main-content" role="main">
              <Component {...pageProps} />
              {!isAuthScreen && <FooterForm />}
            </main>
            {!isAuthScreen && <ModalForm />}
            {footerData && (
              <Footer data={footerData} collectionName={footCollection} />
            )}
            {cookieBannerData && <CookieBanner data={cookieBannerData} />}
          </AppProvider>
        </ApolloProvider>
      </>
    );
  }
}

export default flowRight(withApolloClient, appWithTranslation)(MyApp);

import _defineProperty from "/var/jenkins_home/workspace/tingle.3b6a912d-4d0a-4635-8445-e49fdb128ace/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import '@apps/artists-spotify-com-c/src/shared/styles/global.scss';
import '@spotify-internal/react-dates/lib/css/_datepicker.css';
import '@apps/artists-spotify-com-c/src/shared/styles/react-dates.scss';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { appWithI18n } from '@mrkt/features/i18n/appWithI18n';
import { LanguageHead } from '@mrkt/features/i18n/components/LanguageHead';
import { MrktAppLanguageLogger } from '@mrkt/features/i18n/components/MrktAppLanguageLogger';
import { appWithCssTransform } from '@mrkt/features/css/appWithCssTransform';
import { App } from '@mrkt/features/next';
import { AppTheme } from '@mrkt/features/encore-theme/creator';
import { withReactRouter } from '../lib/withReactRouter';
import { GTM } from '@mrkt/features/gtm';
import { SmartlingContextCapture } from '@mrkt/features/SmartlingContextCapture';
import { startAxeOverlay } from '@mrkt/features/start-axe-overlay';
import { track } from '@spotify-internal/track-js'; // client-side only

import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

if (true) {
  require('@apps/artists-spotify-com-c/src/setup/polyfill');

  require('@apps/artists-spotify-com-c/src/init');
}

var S4AApp = dynamic(function () {
  return import(
  /* webpackChunkName: "app" */
  '@apps/artists-spotify-com-c/src/app').then(function (mod) {
    return mod.App;
  });
}, {
  ssr: false,
  loadableGenerated: {
    webpack: function webpack() {
      return [require.resolveWeak('@apps/artists-spotify-com-c/src/app')];
    },
    modules: ["_app.tsx -> " + '@apps/artists-spotify-com-c/src/app']
  }
});

function CustomApp(props) {
  useEffect(function () {
    startAxeOverlay();
  }, []);
  useEffect(function () {
    track({
      market: 'not_set',
      oneTrust: // ignore cookie banner in synthetic tests for now
      !navigator.webdriver && // cookie is only set on *.spotify.com
      window.location.host.endsWith('.spotify.com')
    });
  }, []);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(LanguageHead, {
      base: "https://artists.spotify.com"
    }), /*#__PURE__*/_jsxs(Head, {
      children: [/*#__PURE__*/_jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1, shrink-to-fit=no"
      }), /*#__PURE__*/_jsx("title", {
        children: process.env.REACT_APP_TITLE
      }), false && /*#__PURE__*/_jsx(SmartlingContextCapture, {})]
    }), /*#__PURE__*/_jsx(S4AApp, {
      children: /*#__PURE__*/_jsx(AppTheme, _objectSpread(_objectSpread({}, props), {}, {
        children: /*#__PURE__*/_jsx(App, _objectSpread({}, props))
      }))
    }), true && /*#__PURE__*/_jsx(GTM, {
      trackingId: "GTM-NP2G964"
    }), /*#__PURE__*/_jsx(MrktAppLanguageLogger, {})]
  });
}

export default appWithCssTransform(appWithI18n(withReactRouter(CustomApp)));
export { reportWebVitals } from '@mrkt/features/metrics';
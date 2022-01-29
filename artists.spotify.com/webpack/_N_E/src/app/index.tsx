import _slicedToArray from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
// ignore-string-externalization
import React from 'react';
import { GlobalStyles } from '@spotify-internal/encore-web';
import { Provider } from 'react-redux';
import { createErrorBoundary } from '@mrkt/features/Platform';
import { QueryClient, QueryClientProvider } from 'react-query';
import { appExperience } from '@mrkt/features/experience-definitions';
import { SnackbarState } from '@mrkt/features/snackbar';
import { configureStore } from '../shared/store';
import { SidePanelState } from '../features/SidePanel';
import { BannerState } from '../features/Banner';
import { HelpButtonState } from '../features/HelpWidget';
import { AppError } from './AppError';
import { RemoteConfig } from './RemoteConfig';
import { LoadingIndicator } from '../shared/components/LoadingIndicator';
import { useLocalOverrides } from './hooks/useLocalOverrides';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var defaultStore = configureStore(); // prevents rerenders of globalStyles which sometimes flashes things

var globalStyles = /*#__PURE__*/_jsx(GlobalStyles, {
  scaffoldingLegacy: true
});

var queryClient = new QueryClient();

var _createErrorBoundary = createErrorBoundary({
  view: 'app',
  experience: appExperience
}),
    _createErrorBoundary2 = _slicedToArray(_createErrorBoundary, 1),
    ErrorBoundary = _createErrorBoundary2[0];
/** For testing purposes. Forces an error state in the presence of a particular query param. */


var SimulatedError = function SimulatedError() {
  var overrides = useLocalOverrides();
  var showAppError = overrides.showAppError;

  if (!showAppError) {
    return null;
  }

  throw new Error('Simulated app error');
};

export function App(_ref) {
  var _ref$store = _ref.store,
      store = _ref$store === void 0 ? defaultStore : _ref$store,
      children = _ref.children;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [globalStyles, /*#__PURE__*/_jsxs(ErrorBoundary, {
      fallback: /*#__PURE__*/_jsx(AppError, {}),
      children: [/*#__PURE__*/_jsx(SimulatedError, {}), /*#__PURE__*/_jsx(React.Suspense, {
        fallback: /*#__PURE__*/_jsx(LoadingIndicator, {}),
        children: /*#__PURE__*/_jsx(RemoteConfig, {
          children: /*#__PURE__*/_jsx(Provider, {
            store: store,
            children: /*#__PURE__*/_jsx(QueryClientProvider, {
              client: queryClient,
              children: /*#__PURE__*/_jsx(SidePanelState, {
                children: /*#__PURE__*/_jsx(BannerState, {
                  children: /*#__PURE__*/_jsx(SnackbarState, {
                    children: /*#__PURE__*/_jsx(HelpButtonState, {
                      children: children
                    })
                  })
                })
              })
            })
          })
        })
      })]
    })]
  });
}
import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import React from 'react';
import { Route } from 'react-router-dom';
import { KeyboardDetectionProvider } from '@spotify-internal/encore-web';
import { SnackbarQueue } from '@mrkt/features/snackbar';
import { Page } from '../../../features/page';
import { PageEvents } from '../../../features/PlatformEvents';
import { SidePanel } from '../../../features/SidePanel';
import { LazyBanner } from '../../../features/Banner';
import { Terms } from '../../../features/Terms';
import { PageRouteHeader } from './Header';
import { PageRouteBody } from './Body';
import { SkipLink } from './SkipLink';
import { HelpButton } from '../../../features/HelpWidget';
import { LoginCheck } from './LoginCheck';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export function PageRoute(_ref) {
  var _ref$exact = _ref.exact,
      exact = _ref$exact === void 0 ? false : _ref$exact,
      _ref$path = _ref.path,
      path = _ref$path === void 0 ? '/' : _ref$path,
      pageId = _ref.pageId,
      Header = _ref.header,
      Footer = _ref.footer,
      Body = _ref.body,
      _ref$showHelp = _ref.showHelp,
      showHelp = _ref$showHelp === void 0 ? true : _ref$showHelp,
      _ref$allowUnauthentic = _ref.allowUnauthenticated,
      allowUnauthenticated = _ref$allowUnauthentic === void 0 ? false : _ref$allowUnauthentic;
  return /*#__PURE__*/_jsx(LoginCheck, {
    allowUnauthenticated: allowUnauthenticated,
    children: /*#__PURE__*/_jsx(Route, {
      exact: exact,
      path: path,
      render: function render(routerProps) {
        return /*#__PURE__*/_jsxs("div", {
          "data-pageid": pageId,
          children: [/*#__PURE__*/_jsx(SkipLink, {}), /*#__PURE__*/_jsx(KeyboardDetectionProvider, {
            children: /*#__PURE__*/_jsx(Page, {
              header: Header && /*#__PURE__*/_jsxs(PageRouteHeader, {
                children: [/*#__PURE__*/_jsx(SidePanel, {}), /*#__PURE__*/_jsx(Header, _objectSpread({}, routerProps))]
              }),
              footer: Footer && /*#__PURE__*/_jsx(Footer, _objectSpread({}, routerProps)),
              help: showHelp && /*#__PURE__*/_jsx(HelpButton, {}),
              children: /*#__PURE__*/_jsx(Terms, {
                children: /*#__PURE__*/_jsxs(_Fragment, {
                  children: [/*#__PURE__*/_jsx(LazyBanner, {}), /*#__PURE__*/_jsx(PageRouteBody, {
                    children: /*#__PURE__*/_jsx(Body, _objectSpread({}, routerProps))
                  }), /*#__PURE__*/_jsx(SnackbarQueue, {})]
                })
              })
            })
          }), /*#__PURE__*/_jsx(PageEvents, {
            pageId: pageId
          })]
        });
      }
    })
  });
}
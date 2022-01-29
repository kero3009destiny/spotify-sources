// ignore-string-externalization
import React from 'react';
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
export function PageRouteNext(_ref) {
  var pageId = _ref.pageId,
      Header = _ref.header,
      Footer = _ref.footer,
      Body = _ref.body,
      _ref$showHelp = _ref.showHelp,
      showHelp = _ref$showHelp === void 0 ? true : _ref$showHelp,
      _ref$allowUnauthentic = _ref.allowUnauthenticated,
      allowUnauthenticated = _ref$allowUnauthentic === void 0 ? false : _ref$allowUnauthentic;
  return /*#__PURE__*/_jsx(LoginCheck, {
    allowUnauthenticated: allowUnauthenticated,
    children: /*#__PURE__*/_jsxs("div", {
      "data-pageid": pageId,
      children: [/*#__PURE__*/_jsx(SkipLink, {}), /*#__PURE__*/_jsx(KeyboardDetectionProvider, {
        children: /*#__PURE__*/_jsx(Page, {
          header: Header && /*#__PURE__*/_jsxs(PageRouteHeader, {
            children: [/*#__PURE__*/_jsx(SidePanel, {}), /*#__PURE__*/_jsx(Header, {})]
          }),
          footer: Footer && /*#__PURE__*/_jsx(Footer, {}),
          help: showHelp && /*#__PURE__*/_jsx(HelpButton, {}),
          children: /*#__PURE__*/_jsx(Terms, {
            children: /*#__PURE__*/_jsxs(_Fragment, {
              children: [/*#__PURE__*/_jsx(LazyBanner, {}), /*#__PURE__*/_jsx(PageRouteBody, {
                children: /*#__PURE__*/_jsx(Body, {})
              }), /*#__PURE__*/_jsx(SnackbarQueue, {})]
            })
          })
        })
      }), /*#__PURE__*/_jsx(PageEvents, {
        pageId: pageId
      })]
    })
  });
}
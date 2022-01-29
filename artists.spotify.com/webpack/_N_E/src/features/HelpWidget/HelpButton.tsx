import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import qs from 'query-string';
import { matchPath, useLocation } from 'react-router-dom';
import { IconHelpAltActive, ButtonIcon, gray7, white, black, gray20, cssColorValue } from '@spotify-internal/encore-web';
import styled from 'styled-components';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { createUbiEventLogger } from '@mrkt/features/ubi';
import { createWebCommonEventFactory } from '@spotify-internal/ubi-sdk-s4a-web-common';
import { useCurrentArtistIdOrNull } from '../artists';
import { useLocale } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function buttonBackground(color, padding) {
  /** css hack for button background color (to remove inner circle) */
  return "\n    box-shadow:\n      0 0 0 ".concat(padding, " ").concat(color, ",\n      inset 0 0 0 8px ").concat(color, ",\n      4px 7px 4px rgba(0, 0, 0, .3);\n    position: relative;\n\n    // removes the inner halo\n    &::after {\n      content: '';\n      display: block;\n      position: absolute;\n      top: -1px;\n      bottom: -1px;\n      left: -1px;\n      right: -1px;\n      border-radius: 50%;\n      border: 3px solid ").concat(color, ";\n      padding: 0;\n    }\n  ");
}

var StyledHelpButton = styled(ButtonIcon).withConfig({
  displayName: "HelpButton__StyledHelpButton",
  componentId: "sc-4ltvpu-0"
})(["color:", ";background:", ";border-radius:50%;display:inline-flex;", " &:hover{color:", ";transform:scale(1.04);transition-duration:33ms;transition-property:scale;", "}&:focus{outline:thin dotted ", ";outline-offset:5px;}"], function (_ref) {
  var theme = _ref.theme;
  return theme.app === 'dark' ? cssColorValue('decorativeSubdued') : gray7;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.app === 'dark' ? gray7 : cssColorValue('decorativeSubdued');
}, function (_ref3) {
  var theme = _ref3.theme;
  return buttonBackground(theme.app === 'dark' ? cssColorValue('decorativeSubdued') : gray7, '4px');
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.app === 'dark' ? white : gray20;
}, function (_ref5) {
  var theme = _ref5.theme;
  return buttonBackground(theme.app === 'dark' ? white : gray20, '4px');
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.app === 'dark' ? white : black;
});
var defaultHelpConfig = {
  faqLinkUrl: '/help',
  visible: false
};
var routeHelpConfig = {
  '/artist/:artistId/home': {
    visible: true
  },
  // This must come before /artist/:artistId/profile to match correctly (first match)
  '/artist/:artistId/profile/merch': {
    visible: true,
    faqLinkUrl: '/help/article/listing-shopify-merch'
  },
  '/artist/:artistId/profile': {
    visible: true,
    faqLinkUrl: '/help/artist-profile'
  },
  '/artist/:artistId/audience': {
    visible: true,
    faqLinkUrl: '/help/audience-stats'
  },
  '/artist/:artistId/music': {
    visible: true,
    faqLinkUrl: '/help/managing-your-music'
  },
  '/team': {
    visible: true,
    faqLinkUrl: '/help/team-management'
  },
  '/settings': {
    visible: true
  },
  '/activity': {
    visible: true
  }
};
var HelpButtonContext = /*#__PURE__*/React.createContext(_objectSpread(_objectSpread({}, defaultHelpConfig), {}, {
  setVisible: function setVisible() {},
  setFAQLinkUrl: function setFAQLinkUrl() {}
}));
export var useHelpButton = function useHelpButton() {
  return React.useContext(HelpButtonContext);
};
export var HelpButtonState = function HelpButtonState(_ref7) {
  var children = _ref7.children;

  var _React$useState = React.useState(defaultHelpConfig.visible),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      visible = _React$useState2[0],
      setVisible = _React$useState2[1];

  var _React$useState3 = React.useState("/".concat(defaultHelpConfig.faqLinkUrl)),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      faqLinkUrl = _React$useState4[0],
      setFAQLinkUrl = _React$useState4[1];

  var locale = useLocale();
  var location = useLocation(); // update help config when route changes

  React.useEffect(function () {
    var match = matchPath(location.pathname, {
      path: Object.keys(routeHelpConfig)
    });
    var config = match ? _objectSpread(_objectSpread({}, defaultHelpConfig), routeHelpConfig[match.path] || {}) : defaultHelpConfig;
    var localizedLink = locale === 'en-US' ? config.faqLinkUrl : "/".concat(locale).concat(config.faqLinkUrl);
    setVisible(config.visible);
    setFAQLinkUrl(localizedLink);
  }, [location]);
  return /*#__PURE__*/_jsx(HelpButtonContext.Provider, {
    value: {
      setVisible: setVisible,
      visible: visible,
      faqLinkUrl: faqLinkUrl,
      setFAQLinkUrl: setFAQLinkUrl
    },
    children: children
  });
};
export var HelpButton = function HelpButton() {
  var _useHelpButton = useHelpButton(),
      visible = _useHelpButton.visible,
      faqLinkUrl = _useHelpButton.faqLinkUrl;

  var parsed = qs.parseUrl(faqLinkUrl);

  var _faqLinkUrl$split = faqLinkUrl.split('#'),
      _faqLinkUrl$split2 = _slicedToArray(_faqLinkUrl$split, 2),
      _faqLinkUrl$split2$ = _faqLinkUrl$split2[1],
      hash = _faqLinkUrl$split2$ === void 0 ? '' : _faqLinkUrl$split2$;

  var query = parsed.query;
  query.ref = 'help';
  var url = "".concat(parsed.url, "?").concat(qs.stringify(query)).concat(hash ? '#' : '').concat(hash);
  var uri = window.location.href;
  var helpButtonSpec = createWebCommonEventFactory({
    data: {
      identifier: 's4a-help-button',
      uri: uri
    }
  }).helpButtonFactory();
  var artistId = useCurrentArtistIdOrNull();
  var UBIEventLogger = createUbiEventLogger(artistId);
  var openFAQLink = React.useCallback(function (e) {
    e.preventDefault();
    UBIEventLogger.logInteraction(helpButtonSpec.hitUiNavigate({
      destination: e.target.href
    }));
    var titleBits = (document.title || '').split('–');
    var pageTitle = titleBits.length && titleBits[0].trim() || '?';
    sendEvent({
      eventCategory: 'Help v1',
      eventAction: "FAQ Link - ".concat(pageTitle),
      eventLabel: faqLinkUrl
    });
    window.open(url, '_blank');
  }, [faqLinkUrl, url]);
  return /*#__PURE__*/_jsx(_Fragment, {
    children: visible && /*#__PURE__*/_jsx(StyledHelpButton, {
      onClick: openFAQLink,
      "data-testid": "help-button",
      as: "a",
      href: url,
      children: /*#__PURE__*/_jsx(IconHelpAltActive, {
        iconSize: 32,
        "aria-label": "Help"
      })
    })
  });
};
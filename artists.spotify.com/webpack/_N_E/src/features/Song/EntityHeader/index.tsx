import _objectWithoutProperties from "/var/jenkins_home/workspace/tingle.acf7316e-c5eb-4849-947a-e5dd91fd7b9e/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "/var/jenkins_home/workspace/tingle.acf7316e-c5eb-4849-947a-e5dd91fd7b9e/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
var _excluded = ["title", "images", "location", "match", "attributes", "actions"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components'; // @ts-ignore

import { ArtistHeader } from '@mrkt/features/stats-components';
import throttle from 'lodash/throttle';
import { NavBarListItem, NavBarList, spacer8, spacer16, spacer24, spacer32, screenLgMin, screenSmMin, screenXsMax } from '@spotify-internal/encore-web-v3';
import { Link } from 'react-router-dom';
import { useViewport, Viewport } from '../../../shared/lib/useViewport';
import { useHasAnyAccessToRecording } from '../hooks/useHasAnyAccessToRecording';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
var Wrapper = styled.div.withConfig({
  displayName: "EntityHeader__Wrapper",
  componentId: "sc-1h69avd-0"
})(["@media (max-width:", "){margin-top:", ";margin-bottom:", ";}@media (min-width:", "){margin-bottom:", ";}@media (min-width:", "){margin-top:", ";margin-bottom:", ";}"], screenXsMax, spacer16, spacer16, screenSmMin, spacer24, screenLgMin, spacer8, spacer32);
var StyledNavBarListItem = styled(function (props) {
  return /*#__PURE__*/_jsx(NavBarListItem, _objectSpread({
    sentenceCase: true
  }, props));
}).withConfig({
  displayName: "EntityHeader__StyledNavBarListItem",
  componentId: "sc-1h69avd-1"
})(["padding-top:0;"]);
var MAIN_NAV_HEIGHT_OFFSET = 80;
var MAIN_NAV_HEIGHT_OFFSET_MOBILE = 64;
var DEFAULT_IMAGE_SIZE = 300;
export function EntityHeader(props) {
  var title = props.title,
      _props$images = props.images,
      images = _props$images === void 0 ? [] : _props$images,
      location = props.location,
      match = props.match,
      attributes = props.attributes,
      actions = props.actions,
      restProps = _objectWithoutProperties(props, _excluded);

  var userHasAnyAccessToRecording = useHasAnyAccessToRecording();
  var image = images.find(function (i) {
    return i && i.height === DEFAULT_IMAGE_SIZE;
  }) || images[0] || '';
  var url = image.url;

  var _useState = useState(false),
      stickyHeader = _useState[0],
      setStickyHeader = _useState[1];

  var t = useT(); // @ts-ignore

  var handleScroll = useCallback(throttle(function () {
    if (window.scrollY > 100) {
      setStickyHeader(true);
    } else {
      setStickyHeader(false);
    }
  }, 100));
  useEffect(function () {
    window.scrollTo(0, 0);
    handleScroll();
    window.addEventListener('scroll', handleScroll, false);
    return function () {
      window.removeEventListener('scroll', handleScroll, false);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  var fullUrl = location.pathname;
  var rootUrl = fullUrl.substr(0, fullUrl.lastIndexOf('/'));

  var tabs = userHasAnyAccessToRecording && /*#__PURE__*/_jsx(NavBarList, {
    "data-testid": "tabbed-navbar",
    children: [{
      id: 'stats',
      label: t('SONG_ENTITY_HDR_755cdd', 'Stats', '')
    }, {
      id: 'playlists',
      label: t('SONG_ENTITY_HDR_6ed5a4', 'Playlists', '')
    }].map(function (tab) {
      return /*#__PURE__*/_jsx(StyledNavBarListItem, {
        "data-testid": "tab-".concat(tab.id),
        label: tab.label,
        active: new RegExp("\\/".concat(tab.id, "/?$")).test(location.pathname),
        to: "".concat(rootUrl, "/").concat(tab.id),
        component: Link
      }, tab.id);
    })
  });

  var viewport = useViewport();
  var extraSmall = viewport === Viewport.XS;
  return /*#__PURE__*/_jsx(Wrapper, _objectSpread(_objectSpread({}, restProps), {}, {
    children: /*#__PURE__*/_jsx(ArtistHeader, {
      stickyHeader: stickyHeader,
      stickyOffsetTop: extraSmall ? "".concat(MAIN_NAV_HEIGHT_OFFSET_MOBILE, "px") : "".concat(MAIN_NAV_HEIGHT_OFFSET, "px"),
      stickyOffsetLeft: extraSmall ? spacer24 : undefined,
      type: t('SONG_ENTITY_HDR_aa776a', 'Song', ''),
      metadata: {
        imgSrc: url,
        title: title
      },
      tabs: tabs,
      attributes: attributes,
      actions: actions
    })
  }));
}
import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import React from 'react';
import styled from 'styled-components';
import { IconArrowTopRight, spacer4 } from '@spotify-internal/encore-web-v3';
import { useViewport, Viewport } from '../../../../shared/lib/useViewport';
import { goToPlaylist, isPlaylistLinkable } from '../../../../features/CatalogUtils/playlists';
import { buttonReset } from '../../../../shared/styles/mixins/buttons';
import { textOverflow } from '../../../../shared/styles/mixins/textOverflow';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledContainerLinkable = styled.button.withConfig({
  displayName: "PlaylistTitle__StyledContainerLinkable",
  componentId: "xd7gpf-0"
})(["", ";line-height:inherit;text-align:left;width:100%;display:inline-flex;&:hover{.icon_arrow{display:inline-block;}}"], buttonReset());
var StyledContainer = styled.span.withConfig({
  displayName: "PlaylistTitle__StyledContainer",
  componentId: "xd7gpf-1"
})(["", ";display:inline-block;width:100%;vertical-align:top;"], textOverflow());
var StyledIconArrow = styled(IconArrowTopRight).withConfig({
  displayName: "PlaylistTitle__StyledIconArrow",
  componentId: "xd7gpf-2"
})(["color:", ";display:none;margin:", " 0 0 10px;vertical-align:top;"], function (_ref) {
  var theme = _ref.theme;
  return theme.colors.primaryColor;
}, spacer4);
export function PlaylistTitle(_ref2) {
  var children = _ref2.children,
      data = _ref2.data,
      isMobileOverlay = _ref2.isMobileOverlay;
  var viewport = useViewport();
  var isMobile = viewport === Viewport.XS;
  var linkable = isPlaylistLinkable({
    uri: data.uri,
    isPersonalized: data.isPersonalized,
    isMobile: isMobile,
    hasTitle: Boolean(data === null || data === void 0 ? void 0 : data.title)
  });

  var onClick = function onClick() {
    return goToPlaylist(data);
  };

  var El = linkable ? StyledContainerLinkable : StyledContainer;
  var elProps = {
    onClick: linkable ? onClick : undefined,
    'aria-roledescription': linkable ? 'playlist link' : undefined
  };
  return /*#__PURE__*/_jsxs(El, _objectSpread(_objectSpread({}, elProps), {}, {
    "data-testid": "playlist-title",
    children: [children, linkable && !isMobileOverlay && /*#__PURE__*/_jsx(StyledIconArrow, {
      className: "icon_arrow",
      iconSize: 16
    })]
  }));
}
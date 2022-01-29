import React from 'react';
import { Popover, IconMoreAlt, spacer4 } from '@spotify-internal/encore-web';
import styled from 'styled-components';
import { Link } from '../../components/sharedStyles';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledIconMoreAlt = styled(IconMoreAlt).withConfig({
  displayName: "utils__StyledIconMoreAlt",
  componentId: "sc-1qd8cn2-0"
})(["position:relative;top:", ";"], spacer4);
export var ContentPopover = function ContentPopover(_ref) {
  var _ref$popoverArrow = _ref.popoverArrow,
      popoverArrow = _ref$popoverArrow === void 0 ? 'top' : _ref$popoverArrow;
  var t = useT();
  return /*#__PURE__*/_jsxs(Popover, {
    large: true,
    arrow: popoverArrow,
    children: [/*#__PURE__*/_jsx("p", {
      children: /*#__PURE__*/_jsx("b", {
        children: t('CONTENT_POPOVER_TITLE', 'To find your Spotify URI or link:', 'Content popover title. To find your URI or link, follow these steps:')
      })
    }), /*#__PURE__*/_jsx("p", {
      children: t('CONTENT_POPOVER_STEP_1', '1. Go to one of your albums or tracks on Spotify', 'Step 1 is to find your album or track on Spotify')
    }), /*#__PURE__*/_jsxs("p", {
      children: [t('CONTENT_POPOVER_STEP_2', '2. Hit the icon', 'Step 2 is to click on the icon'), ' ', /*#__PURE__*/_jsx(StyledIconMoreAlt, {})]
    }), /*#__PURE__*/_jsx("p", {
      dangerouslySetInnerHTML: {
        __html: t('CONTENT_POPOVER_STEP_3', '3. Click or tap <b>Share</b>, then <b>Copy Spotify URI or link</b>', 'Step 3 is to click Share and copy the URI or link')
      }
    }), /*#__PURE__*/_jsx("p", {
      children: t('CONTENT_POPOVER_STEP_4', '4. Paste the links in the fields provided', 'Step 4 is to paste the URI or link into the input fields on this page')
    }), /*#__PURE__*/_jsx("br", {}), /*#__PURE__*/_jsx(Link, {
      href: "https://artists.spotify.com/help/article/getting-music-on-spotify",
      children: t('CONTENT_POPOVER_FAQ_LINK', 'Don’t have music on Spotify yet?', "If you don't have music on Spotify yet, click this link to find a help article")
    })]
  });
};
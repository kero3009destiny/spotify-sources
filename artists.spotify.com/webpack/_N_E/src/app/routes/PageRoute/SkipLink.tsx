import React from 'react';
import styled from 'styled-components';
import { TextLink, white, gray7 } from '@spotify-internal/encore-web';
import { MAIN_CONTENT_ID } from './Body';
import { useT } from '@mrkt/features/i18n'; // The purpose of a skip link is to allow keyboard-only users a way to quickly move from the start of the page to the main content,
// thus bypassing the top nav, or any other content before the main content.
// The skip link can be visually hidden until it receives focus, so it will not become visible unless it is focused via the keyboard.

import { jsx as _jsx } from "react/jsx-runtime";
var StyledLink = styled(TextLink).withConfig({
  displayName: "SkipLink__StyledLink",
  componentId: "d5i8bb-0"
})(["color:", ";background-color:", ";border:1px solid ", ";border-radius:10px;padding:25px;position:fixed;right:0;top:0;z-index:99999;&[href]:focus:not([disabled]){box-shadow:none;}&:not(:focus){clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px;}"], white, gray7, white);
export var SkipLink = function SkipLink() {
  var t = useT();
  return /*#__PURE__*/_jsx(StyledLink, {
    href: "#".concat(MAIN_CONTENT_ID),
    children: t('SKIP_LINK_TEXT', 'Skip to main page content', 'Accessible link in header which skips the top nav and focuses main page content when clicked')
  });
};
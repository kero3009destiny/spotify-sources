import _taggedTemplateLiteral from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral";

var _templateObject;

// ignore-string-externalization
import React from 'react';
import { Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Backdrop as BackdropBase, IconMenu as IconMenuBase, IconX, LogoSpotifyForArtists, screenXxsMax, screenXsMin, spacer16, white, gray10, gray20, ButtonIcon } from '@spotify-internal/encore-web';
import { SideMenuLanguageOnboarding, SideMenuLanguageSection } from './Language';
import { zIndexNav, zIndexNavBackdrop } from '../../../shared/styles/variables';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var ButtonMenuContainer = styled.div.withConfig({
  displayName: "MobileContainer__ButtonMenuContainer",
  componentId: "sc-1umkhrv-0"
})(["display:flex;margin:0 ", ";"], spacer16);
var IconMenu = styled(IconMenuBase).withConfig({
  displayName: "MobileContainer__IconMenu",
  componentId: "sc-1umkhrv-1"
})(["vertical-align:middle;"]);
var Container = styled.div.withConfig({
  displayName: "MobileContainer__Container",
  componentId: "sc-1umkhrv-2"
})(["position:fixed;top:0;right:0;background:", ";z-index:", ";display:flex;flex-direction:column;box-shadow:0 0 14px 0 rgba(0,0,0,1);height:100%;@media (max-width:", "){width:100%;}@media (min-width:", "){width:336px;}"], gray10, zIndexNav, screenXxsMax, screenXsMin);
var MobileHeader = styled.div.withConfig({
  displayName: "MobileContainer__MobileHeader",
  componentId: "sc-1umkhrv-3"
})(["height:64px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid ", ";padding:", ";@media (min-width:", "){display:none;}"], gray20, spacer16, screenXsMin);
var MobileNavigation = styled.div.withConfig({
  displayName: "MobileContainer__MobileNavigation",
  componentId: "sc-1umkhrv-4"
})(["display:flex;flex-direction:column;align-items:flex-end;text-align:right;flex:1;"]);
var MobileFooter = styled.div.withConfig({
  displayName: "MobileContainer__MobileFooter",
  componentId: "sc-1umkhrv-5"
})(["text-align:right;padding:", ";"], spacer16);
/* When flyout is open, don't allow body to scroll */

var GlobalStyle = createGlobalStyle(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  body {\n    height: 100%;\n    overflow: hidden;\n\n    @media (max-width: ", ") {\n      position: fixed;\n      width: 100%;\n    }\n  }\n"])), screenXxsMax);
/*
We need a lower z-index value than usual so that the navigational elements can appear on top it, while altogether remaining at a lower zindex value than popups, dialogs, etc elsewhere in the application.
*/

var Backdrop = styled(BackdropBase).withConfig({
  displayName: "MobileContainer__Backdrop",
  componentId: "sc-1umkhrv-6"
})(["z-index:", ";"], zIndexNavBackdrop);
export var MobileContainer = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      onHideMenu = _ref.onHideMenu,
      onShowMenu = _ref.onShowMenu,
      showMenu = _ref.showMenu;
  return /*#__PURE__*/_jsxs("div", {
    className: "encore-creator-dark-theme",
    children: [/*#__PURE__*/_jsx(ButtonMenuContainer, {
      children: /*#__PURE__*/_jsx(SideMenuLanguageOnboarding, {
        children: /*#__PURE__*/_jsx(ButtonIcon, {
          semanticColor: "textBase",
          onClick: onShowMenu,
          children: /*#__PURE__*/_jsx(IconMenu, {})
        })
      })
    }), showMenu && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(GlobalStyle, {}), /*#__PURE__*/_jsx(Backdrop, {}), /*#__PURE__*/_jsx(Route, {
        path: "/artist/:artistId",
        render: function render() {
          return /*#__PURE__*/_jsxs(Container, {
            ref: ref,
            children: [/*#__PURE__*/_jsxs(MobileHeader, {
              children: [/*#__PURE__*/_jsx(LogoSpotifyForArtists, {
                height: "25",
                color: white
              }), /*#__PURE__*/_jsx(ButtonIcon, {
                semanticColor: "textBase",
                onClick: onHideMenu,
                children: /*#__PURE__*/_jsx(IconX, {
                  color: white
                })
              })]
            }), /*#__PURE__*/_jsx(MobileNavigation, {
              children: children
            }), /*#__PURE__*/_jsx(MobileFooter, {
              children: /*#__PURE__*/_jsx(SideMenuLanguageSection, {})
            })]
          });
        }
      })]
    })]
  });
});
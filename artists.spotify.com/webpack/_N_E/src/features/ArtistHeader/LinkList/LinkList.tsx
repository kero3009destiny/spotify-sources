import React, { useRef, useState } from 'react';
import { Route } from 'react-router-dom';
import { spacer16, gray25 } from '@spotify-internal/encore-web';
import styled from 'styled-components';
import { Link } from './Link';
import { List } from './List';
import { ListItem } from './ListItem';
import { MobileContainer } from './MobileContainer';
import { MarqueeCallout } from '../../MarqueeCallout';
import { DesktopContainer } from './DesktopContainer';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var DisabledLink = styled.span.withConfig({
  displayName: "LinkList__DisabledLink",
  componentId: "pxic7-0"
})(["cursor:not-allowed;color:", ";display:block;padding:", ";"], gray25, spacer16);
var CAMPAIGNS = 'campaigns';
var ExternalLink = styled.a.withConfig({
  displayName: "LinkList__ExternalLink",
  componentId: "pxic7-1"
})(["padding:", ";position:relative;display:block;color:rgba(255,255,255,0.54);&:hover{color:rgba(255,255,255,1);}"], spacer16);
export var LinkList = function LinkList(_ref) {
  var collapsedLayout = _ref.collapsedLayout,
      items = _ref.items;

  var _useState = useState(false),
      menuVisible = _useState[0],
      setMenuVisible = _useState[1];

  var element = useRef(null);

  var handleEvent = function handleEvent(e) {
    if (!element.current || e.target instanceof Node && element.current.contains(e.target)) {
      return;
    }

    onHideMenu();
  };

  var onShowMenu = function onShowMenu() {
    setMenuVisible(true);
    window.addEventListener('mouseup', handleEvent, true);
    window.addEventListener('focus', handleEvent, true);
  };

  var onHideMenu = function onHideMenu() {
    setMenuVisible(false);
    window.removeEventListener('mouseup', handleEvent, true);
    window.removeEventListener('focus', handleEvent, true);
  };

  var onClickLink = function onClickLink() {
    if (collapsedLayout) onHideMenu();
  };

  var nav = /*#__PURE__*/_jsx(Route, {
    path: "/artist/:artistId",
    render: function render(_ref2) {
      var match = _ref2.match;
      return /*#__PURE__*/_jsx(List, {
        children: items.map(function (item) {
          var _item$additionalMatch;

          return /*#__PURE__*/_jsxs(ListItem, {
            isDisabled: item.isDisabled,
            children: [item.isDisabled && /*#__PURE__*/_jsx(DisabledLink, {
              children: item.title
            }), item.isExternal && !item.isDisabled && /*#__PURE__*/_jsx(ExternalLink, {
              href: item.url,
              children: item.title
            }), !item.isExternal && !item.isDisabled && /*#__PURE__*/_jsx(Link, {
              to: "".concat(match.url).concat(item.url),
              additionalMatches: (_item$additionalMatch = item.additionalMatches) === null || _item$additionalMatch === void 0 ? void 0 : _item$additionalMatch.map(function (path) {
                return "".concat(match.url).concat(path);
              }),
              title: typeof item.title === 'string' ? item.title : '',
              onClick: function onClick(_, linkInfo) {
                var _item$onClick;

                onClickLink();
                (_item$onClick = item.onClick) === null || _item$onClick === void 0 ? void 0 : _item$onClick.call(item, linkInfo);
              },
              children: item.title
            }), !item.isDisabled && item.key === CAMPAIGNS && /*#__PURE__*/_jsx(MarqueeCallout, {})]
          }, item.key);
        })
      });
    }
  });

  if (collapsedLayout) {
    return /*#__PURE__*/_jsx(MobileContainer, {
      ref: element,
      onShowMenu: onShowMenu,
      onHideMenu: onHideMenu,
      showMenu: menuVisible,
      children: nav
    });
  }

  return /*#__PURE__*/_jsx(DesktopContainer, {
    children: nav
  });
};
import _toConsumableArray from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
// ignore-string-externalization
import React, { useContext } from 'react';
import { Link as RouterDomLink, // prevent lint error
Route } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { spacer16, spacer8, spacer32, screenXsMax, white, KeyboardDetectionContext } from '@spotify-internal/encore-web';
import { jsx as _jsx } from "react/jsx-runtime";

var getColor = function getColor(props) {
  if (props.active) {
    return 'rgba(255, 255, 255, 1)';
  }

  return 'rgba(255, 255, 255, 0.54)';
};

var LinkStyled = styled(RouterDomLink).withConfig({
  displayName: "Link__LinkStyled",
  componentId: "r5u5bj-0"
})(["color:", ";padding:", ";position:relative;display:block;@media (max-width:", "){margin-right:", ";}&:hover{color:rgba(255,255,255,1);}&:focus{outline:0;}", " ", ""], function (props) {
  return getColor(props);
}, spacer16, screenXsMax, spacer8, function (props) {
  return !props.active && css(["&:focus{color:rgba(255,255,255,0.74);}&:active{color:rgba(255,255,255,0.62);}"]);
}, function (_ref) {
  var $isUsingKeyboard = _ref.$isUsingKeyboard;
  return $isUsingKeyboard && css(["&::after{content:'';display:block;position:absolute;pointer-events:none;border-bottom:3px solid transparent;transition:border-color 200ms ease-in;width:calc(100% - ", ");}&:focus::after{border-color:", ";}"], spacer32, white);
});
export var Link = function Link(_ref2) {
  var _children = _ref2.children,
      to = _ref2.to,
      _ref2$additionalMatch = _ref2.additionalMatches,
      additionalMatches = _ref2$additionalMatch === void 0 ? [] : _ref2$additionalMatch,
      title = _ref2.title,
      _onClick = _ref2.onClick;

  var _useContext = useContext(KeyboardDetectionContext),
      isUsingKeyboard = _useContext.isUsingKeyboard;

  return /*#__PURE__*/_jsx(Route, {
    path: [to].concat(_toConsumableArray(additionalMatches)),
    children: function children(_ref3) {
      var match = _ref3.match;
      return /*#__PURE__*/_jsx(LinkStyled, {
        active: match ? 'true' : undefined,
        children: _children,
        onClick: function onClick(e) {
          return _onClick === null || _onClick === void 0 ? void 0 : _onClick(e, {
            match: match,
            to: to
          });
        },
        title: title,
        to: to,
        $isUsingKeyboard: isUsingKeyboard
      });
    }
  });
};
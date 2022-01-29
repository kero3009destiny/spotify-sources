import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import React from 'react';
import styled, { css } from 'styled-components';
import { gray25, screenXsMax } from '@spotify-internal/encore-web';
import { navPadding } from '../../../../shared/components/Header';
import { useIsEmployee } from '../../../../features/currentUser';
import { jsx as _jsx } from "react/jsx-runtime";
var StyledList = styled.ul.withConfig({
  displayName: "List__StyledList",
  componentId: "sy9knf-0"
})(["padding-bottom:0;margin-right:", ";margin-left:", ";&:not(:first-child){border-top:1px solid ", ";}", ""], navPadding, navPadding, gray25, function (props) {
  return !props.withSearch && css(["@media (max-width:", "){&:first-child{padding-left:", ";padding-right:", ";margin:0;}}"], screenXsMax, navPadding, navPadding);
});
/* eslint-disable-next-line import/no-default-export */

export default function List(props) {
  var isEmployee = useIsEmployee();
  return /*#__PURE__*/_jsx(StyledList, _objectSpread({
    withSearch: isEmployee
  }, props));
}
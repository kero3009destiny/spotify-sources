import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["component"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import React from 'react';
import styled from 'styled-components';
import { gray20, gray70, spacer20, spacer24, white } from '@spotify-internal/encore-web';
import { jsx as _jsx } from "react/jsx-runtime";
export var UserLink = styled(function (_ref) {
  var _ref$component = _ref.component,
      Component = _ref$component === void 0 ? 'a' : _ref$component,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/_jsx(Component, _objectSpread({}, props));
}).withConfig({
  displayName: "UserLink",
  componentId: "sc-1njlgnd-0"
})(["color:", ";display:flex;width:100%;align-items:center;padding:", " ", ";position:relative;svg{margin-left:6px;margin-right:6px;}&:hover,&:focus{color:", ";background-color:", ";box-shadow:0 1px 0 0 ", ",0 -1px 0 0 ", ";outline:none;z-index:1;}"], gray70, spacer20, spacer24, white, gray20, gray20, gray20);
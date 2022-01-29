import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import styled from 'styled-components';
import { gray50, IconX } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
var Button = styled.button.withConfig({
  displayName: "CloseButton__Button",
  componentId: "sc-1pn7a4n-0"
})(["color:", ";position:absolute;top:0;right:0;width:36px;height:36px;opacity:1;padding:10px;background:none;border:0;transition:opacity 0.1s ease-in;outline:none;&:focus{color:white;}&[disabled]{opacity:0;pointer-events:none;}"], gray50);
var Icon = styled(IconX).withConfig({
  displayName: "CloseButton__Icon",
  componentId: "sc-1pn7a4n-1"
})(["position:absolute;top:18px;right:22px;transform:translate(50%,-50%);"]);
export var CloseButton = function CloseButton(props) {
  var t = useT();
  return /*#__PURE__*/_jsx(Button, _objectSpread(_objectSpread({
    title: t('SIDEPANEL_CLOSE_SEARCH_BUTTON', 'Close artist search view', 'Label for the button that closes the artist search view in the sidepanel')
  }, props), {}, {
    children: /*#__PURE__*/_jsx(Icon, {})
  }));
};
// ignore-string-externalization
//
// Buttons
// --------------------------------------------------
// These are ported over from creator tape so that we can use them with styled components
// https://ghe.spotify.net/tape/creator-tape/blob/master/src/styles/mixins/buttons.js

/* eslint-disable import/prefer-default-export */
import { css } from 'styled-components';
export var buttonLineHeight = '1'; // Reset a button to a link looking thing

export var buttonReset = function buttonReset() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$lineHeight = _ref.lineHeight,
      lineHeight = _ref$lineHeight === void 0 ? buttonLineHeight : _ref$lineHeight;

  return css(["background-color:transparent;border:0;color:inherit;line-height:", ";letter-spacing:inherit;padding:0;&:focus{outline:0;}"], lineHeight);
};
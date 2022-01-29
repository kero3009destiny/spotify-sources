// ignore-string-externalization
//
// Text overflow
// --------------------------------------------------
// These are ported over from creator tape so that we can use them with styled components
// https://ghe.spotify.net/tape/creator-tape/blob/master/src/styles/mixins/textOverflow.js

/* eslint-disable import/prefer-default-export */
import { css } from 'styled-components'; // Requires inline-block or block for proper styling

export var textOverflow = function textOverflow() {
  return css(["overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"]);
};
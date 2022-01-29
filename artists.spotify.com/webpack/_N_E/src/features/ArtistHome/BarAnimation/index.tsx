// ignore-string-externalization

/* eslint-disable no-unexpected-multiline */
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { black } from '@spotify-internal/encore-web';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var barHeightAnimation = keyframes(["0%{transform:scale(1,0.1);}100%{transform:scale(1,15);}"]);

function barWidthCalculation(value) {
  return value / 4;
}

function barLeftPosition(barWidth, barSpacing, childIndex) {
  var firstValue = barWidthCalculation(barWidth) + barSpacing;
  return firstValue * childIndex;
}

function barContainerWidth(width, spacing) {
  var totalSpacing = spacing * 3;
  return width + totalSpacing;
}

var BarAnimationContainer = styled.div.withConfig({
  displayName: "BarAnimation__BarAnimationContainer",
  componentId: "sc-1goq88q-0"
})(["", ";overflow:hidden;position:relative;", ";"], function (props) {
  return "height: ".concat(props.barHeight, "px");
}, function (props) {
  return "width: ".concat(barContainerWidth(props.width, props.barSpacing), "px");
});
var BarAnimationBar = styled.span.withConfig({
  displayName: "BarAnimation__BarAnimationBar",
  componentId: "sc-1goq88q-1"
})(["animation-direction:alternate;", ";animation-iteration-count:infinite;", ";animation-timing-function:linear;", ";bottom:0;display:inline-block;height:1px;position:absolute;transform-origin:center bottom;", ";&:nth-child(1){animation-delay:0ms;animation-name:", ";left:0;}&:nth-child(2){", ";animation-name:", ";", ";}&:nth-child(3){", ";animation-name:", ";", ";}&:nth-child(4){", ";animation-name:", ";", ";}"], function (props) {
  return "animation-duration: ".concat(props.timing, "ms");
}, function (props) {
  return "animation-play-state: ".concat(props.isPlaying ? 'running' : 'paused');
}, function (props) {
  return "background-color: ".concat(props.color);
}, function (props) {
  return "width: ".concat(barWidthCalculation(props.width), "px");
}, barHeightAnimation, function (props) {
  return "animation-delay: ".concat(props.timing / 1.66, "ms");
}, barHeightAnimation, function (props) {
  return "left: ".concat(barLeftPosition(props.width, props.barSpacing, 1), "px");
}, function (props) {
  return "animation-delay: ".concat(props.timing / 0.83, "ms");
}, barHeightAnimation, function (props) {
  return "left: ".concat(barLeftPosition(props.width, props.barSpacing, 2), "px");
}, function (props) {
  return "animation-delay: ".concat(props.timing / 0.55, "ms");
}, barHeightAnimation, function (props) {
  return "left: ".concat(barLeftPosition(props.width, props.barSpacing, 3), "px");
});
BarAnimation.defaultProps = {
  width: 12,
  barSpacing: 3,
  barHeight: 20,
  color: "".concat(black),
  timing: 450
};
export function BarAnimation(props) {
  var barHeight = props.barHeight,
      width = props.width,
      barSpacing = props.barSpacing,
      timing = props.timing,
      color = props.color,
      isPlaying = props.isPlaying;
  return /*#__PURE__*/_jsxs(BarAnimationContainer, {
    barHeight: barHeight,
    barSpacing: barSpacing,
    width: width,
    "data-testid": "bar-animation",
    children: [/*#__PURE__*/_jsx(BarAnimationBar, {
      barHeight: barHeight,
      timing: timing,
      color: color,
      barSpacing: barSpacing,
      width: width,
      "data-testid": "bar-animation-bar",
      isPlaying: isPlaying
    }), /*#__PURE__*/_jsx(BarAnimationBar, {
      barHeight: barHeight,
      timing: timing,
      color: color,
      barSpacing: barSpacing,
      width: width,
      isPlaying: isPlaying
    }), /*#__PURE__*/_jsx(BarAnimationBar, {
      barHeight: barHeight,
      timing: timing,
      color: color,
      barSpacing: barSpacing,
      width: width,
      isPlaying: isPlaying
    }), /*#__PURE__*/_jsx(BarAnimationBar, {
      barHeight: barHeight,
      timing: timing,
      color: color,
      barSpacing: barSpacing,
      width: width,
      isPlaying: isPlaying
    })]
  });
}
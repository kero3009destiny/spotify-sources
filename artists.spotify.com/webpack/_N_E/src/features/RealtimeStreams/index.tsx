import React, { useState, useCallback, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components'; // @ts-ignore

import { Type, color } from '@spotify-internal/encore-web-v3';
import { useT } from '@mrkt/features/i18n';
import { WebSocket } from './WebSocket';
import { useNumberFormatter } from '@mrkt/features/i18n/hooks/useNumberFormatter';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var duration = '750ms';
var streamCountKeyframes = keyframes(["from{color:", ";}to{color:", ";}"], color.salmon, color.black);
var streamCountAnimation = css(["animation:", " ", " 1;"], streamCountKeyframes, duration);
var StreamCountValue = styled.span.withConfig({
  displayName: "RealtimeStreams__StreamCountValue",
  componentId: "sc-15igq27-0"
})(["font-feature-settings:'tnum';display:inline-block;color:", ";", ""], color.black, function (props) {
  return props.startAnimation ? streamCountAnimation : undefined;
});
var RealtimeStreamLabel = styled.span.withConfig({
  displayName: "RealtimeStreams__RealtimeStreamLabel",
  componentId: "sc-15igq27-1"
})(["display:inline-block;color:", ";text-transform:lowercase;"], color.black);
var RealtimeStreamContainer = styled.div.withConfig({
  displayName: "RealtimeStreams__RealtimeStreamContainer",
  componentId: "sc-15igq27-2"
})(["display:inline-block;position:relative;"]);
var side = '80px';
var blipKeyframes = keyframes(["from{opacity:0.5;width:0;height:0;top:50%;left:50%;}to{opacity:0;width:", ";height:", ";top:0;left:0;}"], side, side);
var blipAnimation = css(["animation-name:", ";animation-duration:", ";animation-iteration-count:1;border:3px ", " solid;"], blipKeyframes, duration, color.salmon);
var BlipContainer = styled.div.withConfig({
  displayName: "RealtimeStreams__BlipContainer",
  componentId: "sc-15igq27-3"
})(["position:absolute;width:", ";height:", ";top:calc(50% - ", " / 2);left:calc(50% - ", " / 2);"], side, side, side, side);
var Blip = styled.div.withConfig({
  displayName: "RealtimeStreams__Blip",
  componentId: "sc-15igq27-4"
})(["position:relative;border-radius:50%;", ""], function (props) {
  return props.startAnimation ? blipAnimation : undefined;
});
export function RealtimeStreams(_ref) {
  var songId = _ref.songId,
      _ref$initialTotalStre = _ref.initialTotalStreams,
      initialTotalStreams = _ref$initialTotalStre === void 0 ? '0' : _ref$initialTotalStre,
      WebSocketImplementation = _ref.WebSocketImplementation;

  var _useState = useState(initialTotalStreams),
      streamCount = _useState[0],
      setStreamCount = _useState[1];

  var _useState2 = useState(false),
      startAnimation = _useState2[0],
      setAnimationState = _useState2[1];

  var t = useT();
  var formatter = useNumberFormatter();

  var onSocketMessage = function onSocketMessage(_ref2) {
    var data = _ref2.data;
    var streams = JSON.parse(data);
    setStreamCount(formatter.format(streams));
    setAnimationState(true);
  };

  var memoizedOnSocketMessage = useCallback(onSocketMessage, []);
  useEffect(function () {
    function onAnimationEnd() {
      setAnimationState(false);
    }

    document.addEventListener('animationend', onAnimationEnd);
    return function cleanup() {
      document.removeEventListener('animationend', onAnimationEnd);
    };
  });
  return (
    /*#__PURE__*/
    // @ts-ignore
    _jsx(WebSocket, {
      webSocketUrl: "wss://artistinsights-realtime3.spotify.com/ws-web/recordings/total-streams/".concat(songId),
      onSocketMessage: memoizedOnSocketMessage,
      WebSocketImplementation: WebSocketImplementation,
      children: /*#__PURE__*/_jsxs(Type, {
        as: "h2",
        weight: Type.bold,
        condensed: true,
        children: [/*#__PURE__*/_jsxs(RealtimeStreamContainer, {
          "data-slo-id": "realtime-stream-container",
          children: [/*#__PURE__*/_jsx(BlipContainer, {
            children: /*#__PURE__*/_jsx(Blip, {
              startAnimation: startAnimation
            })
          }), /*#__PURE__*/_jsx(StreamCountValue, {
            startAnimation: startAnimation,
            children: streamCount
          })]
        }), /*#__PURE__*/_jsxs(RealtimeStreamLabel, {
          children: ["\xA0", t('REALTIME_STREAMS_590935', 'streams', '')]
        })]
      })
    })
  );
}
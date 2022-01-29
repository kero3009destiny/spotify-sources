import _slicedToArray from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
// ignore-string-externalization
import { useState, useEffect } from 'react';
import { extractColor } from '@spotify-internal/web-color-extractor';
var fgConfig = {
  priority: ['Vibrant', 'LightVibrant', 'DarkVibrant', 'LightMuted', 'Muted', 'DarkMuted']
};
var bgConfig = {
  priority: ['DarkVibrant', 'LightVibrant', 'Vibrant', 'DarkMuted', 'Muted', 'LightMuted']
};
export var useColorExtraction = function useColorExtraction(imageUrl) {
  var _useState = useState(''),
      foreground = _useState[0],
      setForeground = _useState[1];

  var _useState2 = useState(''),
      background = _useState2[0],
      setBackground = _useState2[1];

  useEffect(function () {
    var isMounted = true;
    Promise.all([extractColor(imageUrl, fgConfig), // foreground
    extractColor(imageUrl, bgConfig) // background
    ]).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          foregroundHex = _ref2[0],
          backgroundHex = _ref2[1];

      if (isMounted) {
        setForeground(foregroundHex);
        setBackground(backgroundHex);
      }
    }).catch(function () {});
    return function () {
      isMounted = false;
    };
  }, [background, foreground, imageUrl]);
  return [foreground, background];
};
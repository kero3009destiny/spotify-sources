import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

var _breakpointValues;

// ignore-string-externalization
import * as React from 'react';
import { screenXsMin, screenSmMin, screenMdMin, screenLgMin, screenXlMin } from '@spotify-internal/encore-web';
import { isBrowser } from './isBrowser';
export var Screen;

(function (Screen) {
  Screen[Screen["XS"] = parseInt(screenXsMin, 10)] = "XS";
  Screen[Screen["SM"] = parseInt(screenSmMin, 10)] = "SM";
  Screen[Screen["MD"] = parseInt(screenMdMin, 10)] = "MD";
  Screen[Screen["LG"] = parseInt(screenLgMin, 10)] = "LG";
  Screen[Screen["XL"] = parseInt(screenXlMin, 10)] = "XL";
})(Screen || (Screen = {}));

export var Viewport;

(function (Viewport) {
  Viewport["XS"] = "XS";
  Viewport["SM"] = "SM";
  Viewport["MD"] = "MD";
  Viewport["LG"] = "LG";
  Viewport["XL"] = "XL";
})(Viewport || (Viewport = {}));

export var breakpointValues = (_breakpointValues = {}, _defineProperty(_breakpointValues, Viewport.XS, Screen.XS), _defineProperty(_breakpointValues, Viewport.SM, Screen.SM), _defineProperty(_breakpointValues, Viewport.MD, Screen.MD), _defineProperty(_breakpointValues, Viewport.LG, Screen.LG), _defineProperty(_breakpointValues, Viewport.XL, Screen.XL), _breakpointValues);
// @visibleForTesting
export function getMatch(queries) {
  var v = Viewport.XS;
  if (queries.smQuery.matches) v = Viewport.SM;
  if (queries.mdQuery.matches) v = Viewport.MD;
  if (queries.lgQuery.matches) v = Viewport.LG;
  if (queries.xlQuery.matches) v = Viewport.XL;
  return v;
}
export var useBreakpointValue = function useBreakpointValue() {
  var vp = useViewport();
  return breakpointValues[vp];
};
export var useViewport = function useViewport(queries) {
  var defaultQueries = {};

  if (isBrowser()) {
    var smQuery = window.matchMedia("(min-width: ".concat(screenSmMin, ")"));
    var mdQuery = window.matchMedia("(min-width: ".concat(screenMdMin, ")"));
    var lgQuery = window.matchMedia("(min-width: ".concat(screenLgMin, ")"));
    var xlQuery = window.matchMedia("(min-width: ".concat(screenXlMin, ")"));
    defaultQueries = {
      smQuery: smQuery,
      mdQuery: mdQuery,
      lgQuery: lgQuery,
      xlQuery: xlQuery
    };
  }

  var queriesOrDefault = queries ? queries : defaultQueries;

  var _React$useState = React.useState(function () {
    return getMatch(queriesOrDefault);
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      viewport = _React$useState2[0],
      setViewport = _React$useState2[1];

  var handleResize = function handleResize() {
    return setViewport(getMatch(queriesOrDefault));
  };

  React.useEffect(function () {
    handleResize();
    queriesOrDefault.smQuery.addListener(handleResize);
    queriesOrDefault.mdQuery.addListener(handleResize);
    queriesOrDefault.lgQuery.addListener(handleResize);
    queriesOrDefault.xlQuery.addListener(handleResize);
    return function () {
      queriesOrDefault.smQuery.removeListener(handleResize);
      queriesOrDefault.mdQuery.removeListener(handleResize);
      queriesOrDefault.lgQuery.removeListener(handleResize);
      queriesOrDefault.xlQuery.removeListener(handleResize);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return viewport;
};
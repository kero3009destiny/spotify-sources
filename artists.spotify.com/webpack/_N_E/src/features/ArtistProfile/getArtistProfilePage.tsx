import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createArtistPage } from '@apps/artists-spotify-com-c/src/features/ArtistPage';
import { useShouldFallback } from './utils/useShouldFallback';
import { ArtistFallback } from '../../shared/components/ArtistFallback';
import { jsx as _jsx } from "react/jsx-runtime";

var withDnd = function withDnd(Component) {
  return function (props) {
    // This fallback cannot be removed until overrides in this rollout are unnecessary
    // https://backstage.spotify.net/experimentation/rollout/overview/3884
    var shouldFallback = useShouldFallback();

    if (shouldFallback) {
      return /*#__PURE__*/_jsx(ArtistFallback, {});
    }

    return /*#__PURE__*/_jsx(DndProvider, {
      backend: HTML5Backend,
      children: /*#__PURE__*/_jsx(Component, _objectSpread({}, props))
    });
  };
};

export var getArtistProfilePage = function getArtistProfilePage(_ref) {
  var pageId = _ref.pageId,
      BodyComponent = _ref.body;
  return createArtistPage({
    pageId: pageId,
    body: withDnd(BodyComponent)
  });
};
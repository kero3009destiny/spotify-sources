import _objectWithoutProperties from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
var _excluded = ["body", "permissionCheck"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import * as React from 'react';
import dynamic from 'next/dynamic';
import { createArtistPage } from '../../ArtistPage';
import { withPermissionCheck } from '../../ArtistPage/withPermissionCheck';
import { jsx as _jsx } from "react/jsx-runtime";
var ArtistAudience = dynamic(function () {
  return import(
  /* webpackChunkName: "artist-audience" */
  '@apps/artists-spotify-com-c/src/features/ArtistAudience').then(function (m) {
    return m.ArtistAudience;
  });
}, {
  ssr: false,
  loadableGenerated: {
    webpack: function webpack() {
      return [require.resolveWeak('@apps/artists-spotify-com-c/src/features/ArtistAudience')];
    },
    modules: ["../features/ArtistAudience/CreateAudiencePage/index.tsx -> " + '@apps/artists-spotify-com-c/src/features/ArtistAudience']
  }
});

function withAudienceWrapper(Component) {
  return function WrappedComponent(props) {
    return /*#__PURE__*/_jsx(ArtistAudience, {
      children: /*#__PURE__*/_jsx(Component, _objectSpread({}, props))
    });
  };
}

export function createAudiencePage(_ref) {
  var body = _ref.body,
      permissionCheck = _ref.permissionCheck,
      props = _objectWithoutProperties(_ref, _excluded);

  return createArtistPage(_objectSpread({
    body: withPermissionCheck(withAudienceWrapper(body), permissionCheck)
  }, props));
}
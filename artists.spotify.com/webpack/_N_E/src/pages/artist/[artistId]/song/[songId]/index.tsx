import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react'; // ignore-string-externalization

import { PageId } from '@apps/artists-spotify-com-c/src/features/PlatformEvents/';
import { createArtistPage } from '@apps/artists-spotify-com-c/src/features/ArtistPage';
import dynamic from 'next/dynamic';
import { jsx as _jsx } from "react/jsx-runtime";
// Song page is not SSR friendly
export var LazySongPage = dynamic(function () {
  return import(
  /* webpackChunkName: "artist-song" */
  '@apps/artists-spotify-com-c/src/features/Song/Route');
}, {
  ssr: false,
  loadableGenerated: {
    webpack: function webpack() {
      return [require.resolveWeak('@apps/artists-spotify-com-c/src/features/Song/Route')];
    },
    modules: ["artist/[artistId]/song/[songId]/index.tsx -> " + '@apps/artists-spotify-com-c/src/features/Song/Route']
  }
});
// eslint-disable-next-line @typescript-eslint/no-redeclare
export var createSongPage = function createSongPage(preload, Render) {
  return function (props) {
    return /*#__PURE__*/_jsx(LazySongPage, _objectSpread(_objectSpread({}, props), {}, {
      toRender: {
        Render: Render,
        preload: preload
      }
    }));
  };
};
export default createArtistPage({
  pageId: PageId.ArtistSongStats,
  body: LazySongPage
});
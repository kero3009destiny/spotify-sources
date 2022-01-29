import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
// ignore-string-externalization
import React from 'react';
import { useSidePanel } from '../../../SidePanel';
import { RecentArtistsList } from './RecentArtistsList';
import { jsx as _jsx } from "react/jsx-runtime";
export var ArtistsList = function ArtistsList() {
  var _useSidePanel = useSidePanel(),
      _useSidePanel2 = _slicedToArray(_useSidePanel, 1),
      shouldShowSearch = _useSidePanel2[0].shouldShowSearch;

  if (shouldShowSearch) {
    return null;
  }

  return /*#__PURE__*/_jsx(RecentArtistsList, {});
};
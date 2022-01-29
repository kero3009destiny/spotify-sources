import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
// ignore-string-externalization
import React from 'react';
import EntityList from '../Entity/List';
import ArtistEntity from '../Entity/Artist';
import { useSidePanel } from '../../../SidePanel';
import { useSearchResults } from './useSearchResults';
import { jsx as _jsx } from "react/jsx-runtime";
export var SearchResultsList = function SearchResultsList() {
  var _useSidePanel = useSidePanel(),
      _useSidePanel2 = _slicedToArray(_useSidePanel, 1),
      searchValue = _useSidePanel2[0].searchValue;

  var searchResults = useSearchResults(searchValue);

  if (!searchValue) {
    return null;
  }

  return /*#__PURE__*/_jsx(EntityList, {
    children: searchResults.map(function (artist) {
      return /*#__PURE__*/_jsx(ArtistEntity, {
        artist: artist
      }, artist.id);
    })
  });
};
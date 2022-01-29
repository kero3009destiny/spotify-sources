import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
// ignore-string-externalization
import React from 'react';
import styled from 'styled-components';
import { LogoSpotifyForArtists, screenSmMin, white } from '@spotify-internal/encore-web';
import { useSidePanel } from '../../../SidePanel';
import { jsx as _jsx } from "react/jsx-runtime";
var StyledLogo = styled(LogoSpotifyForArtists).attrs({
  color: white,
  height: '25'
}).withConfig({
  displayName: "Logo__StyledLogo",
  componentId: "pb5ybv-0"
})(["margin-right:36px;@media (min-width:", "){opacity:", ";}"], screenSmMin, function (props) {
  return props.showSearch ? 1 : 0;
});
export var Logo = function Logo() {
  var _useSidePanel = useSidePanel(),
      _useSidePanel2 = _slicedToArray(_useSidePanel, 1),
      shouldShowSearch = _useSidePanel2[0].shouldShowSearch;

  return /*#__PURE__*/_jsx(StyledLogo, {
    showSearch: !shouldShowSearch
  });
};
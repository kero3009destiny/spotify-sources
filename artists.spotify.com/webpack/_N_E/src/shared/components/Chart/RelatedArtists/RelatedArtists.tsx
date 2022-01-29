// ignore-string-externalization
import React from 'react';
import styled from 'styled-components';
import { screenXsMax, screenSmMin, screenSmMax, screenMdMin } from '@spotify-internal/encore-web-v3';
import { SpotifyEntity } from '../../../components/SpotifyEntity';
import { jsx as _jsx } from "react/jsx-runtime";
var StyledList = styled.ul.withConfig({
  displayName: "RelatedArtists__StyledList",
  componentId: "z0vogm-0"
})(["display:flex;flex-wrap:wrap;justify-content:flex-start;list-style:none;padding-left:0;@media (min-width:", "){margin-bottom:-40px;padding:0;}"], screenSmMin);
var StyledListItem = styled.li.withConfig({
  displayName: "RelatedArtists__StyledListItem",
  componentId: "z0vogm-1"
})(["@media (max-width:", "){margin-bottom:20px;width:50%;}@media (min-width:", "){margin-bottom:40px;}@media (min-width:", ") and (max-width:", "){width:25%;}@media (min-width:", "){width:20%;}"], screenXsMax, screenSmMin, screenSmMin, screenSmMax, screenMdMin);
var StyledSpotifyEntity = styled(SpotifyEntity).withConfig({
  displayName: "RelatedArtists__StyledSpotifyEntity",
  componentId: "z0vogm-2"
})(["outline:none;text-decoration:none !important;"]);
export function RelatedArtists(_ref) {
  var _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data,
      _ref$qaId = _ref.qaId,
      qaId = _ref$qaId === void 0 ? 'related-artists' : _ref$qaId;
  return /*#__PURE__*/_jsx(StyledList, {
    "data-testid": qaId,
    children: data.map(function (d) {
      return /*#__PURE__*/_jsx(StyledListItem, {
        children: /*#__PURE__*/_jsx(StyledSpotifyEntity, {
          type: "artist",
          image: d.imageUrl,
          name: d.artistName,
          href: d.spotifyLink,
          rel: "noopener noreferrer",
          target: "_blank",
          stacked: true,
          large: true,
          external: true
        })
      }, d.key);
    })
  });
}